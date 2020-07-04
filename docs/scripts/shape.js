// JavaScript Document

/*---------------------Shape------------------------------------------\
| - Class to implement the Shape
\--------------------------------------------------------------------*/

/*---------------------Enumerators------------------------------------\
| - Define the necessary enumerators
\--------------------------------------------------------------------*/

const statusEnum = Object.freeze({
	"alive":"alive",
	"dead":"dead",
	"spawning":"spawning"
});

// movingEntity(position, radius, velocity, max_speed, heading, mass, scale, turn_rate, max_force);
class Shape extends movingEntity {
    constructor(pos, type, width, height, points) {
		// Position
		var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
		// Type
		var _type = (typeof type !== "undefined") ? type : typeEnum.type_shape;
		// Width
		var _width = (typeof width !== "undefined") ? width : 0;
		// Height
		var _height = (typeof height !== "undefined") ? height : 0;
		// Center
		var _center = new Vector2D(_position.x + _width/2, _position.y + _height/2);
		// Offset
		var _offset = vecSubtract(_position, vecSubtract(_center, _position));
		_position = _offset;
		_center = new Vector2D(_position.x + _width/2, _position.y + _height/2);
		
		// Default values when creating a new shape
		var _velocity = new Vector2D();
		var _heading = new Vector2D(_center.x, _center.y-_height);
        
		// Globally defined and manipulated variables
		var _radius = _width / 2;
		var _maxSpeed = game.shapeMaxSpeed;
		var _mass = game.shapeMass;
		var _scale = game.shapeScale;
		var _turnRate = game.shapeTurnRate;
		var _maxForce = game.shapeMaxForce;
		var _maxDistance = game.shapeMaxDistance;
		
		// Build movingEntity
		super(_position, _radius, _velocity, _maxSpeed, _heading, _mass, _scale, _turnRate, _maxForce, _type);
		
        // Define Shape's Transforms and Attributes
		this.position = _position;
		this.lastPosition = _position;
		this.top = _position.x;
		this.left = _position.y;
		this.width = _width;
		this.height = _height;
		this.right = _position.x + _width;
		this.bottom = _position.y + _height;
		this.center = _center;
		this.offset = _offset;
		this.toCenter = vecSubtract(this.center, this.position);
		this.radius = _radius;
		this.velocity = _velocity;
		this.maxSpeed = _maxSpeed;
		this.heading = this.facing = _heading;
		this.side = this.heading.perp();
		this.mass = _mass;
		this.scale = _scale;
		this.turnRate = _turnRate;
		this.maxForce = _maxForce;
		this.type = _type;
		this.maxDistance = _maxDistance;

		// Points
		this.points = points;
		
		// Attached grid square references
		this.attachedSquare = "undefined";
		this.lastAttachedSquare = "undefined";

		// Determine whether this shape is moving
		this.isMoving = false;

		// Determine whether this shape has been popped
		this.popped = false;
		
		// Destination square
		this.destinationSquare = "undefined";
		
		// Shape to swap with
		this.shapeToSwap = "undefined";
		
		// Define Shape's Controls
		this.steering = new steeringBehavior(this);
		this.status = statusEnum.spawning;
		this.targetShape = null;
		this.target = null;
		this.fieldOfView = game.shapeFOV;
		
		// Update the entity type
		this.setEntityType(_type);
		
		// Setup the vertex buffer and bounding radius
		this.setupVertexBuffer();
    }
	
	// DEBUG
	draw() {}
	
	/*---------------------updateAttributes-------------------------------\
	| - Update necessary attributes
	\--------------------------------------------------------------------*/
	updateAttributes() {
		this.position = new Vector2D(parseInt(this.domElement.style.left), parseInt(this.domElement.style.top));
		this.top = this.position.x;
		this.left = this.position.y;
		this.width = parseInt(this.domElement.style.width);
		this.height = parseInt(this.domElement.style.height);
		this.right = this.position.x + this.width;
		this.bottom = this.position.y + this.height;
		this.center = new Vector2D(this.position.x + this.width/2, this.position.y + this.height/2);
		this.offset = vecSubtract(this.position, vecSubtract(this.center, this.position));
		this.toCenter = vecSubtract(this.center, this.position);
		this.radius = this.width / 2.2;
	}
	
	/*---------------------adjustStyles-----------------------------------\
    | - Adjust the styles to match the target's
    \--------------------------------------------------------------------*/
	adjustStyles() {
		this.updateAttributes();
		
		this.domElement.style.display = "block";
		this.domElement.style.width = this.getOrigin().width + "px";
        this.domElement.style.height = this.getOrigin().height + "px";
		if (this.attachedSquare !== "undefined") {
			/*this.domElement.style.top = (this.attachedSquare.top + Math.abs(this.toCenter.y - this.attachedSquare.toCenter.y)) + "px";
			this.domElement.style.left = (this.attachedSquare.left + Math.abs(this.toCenter.x - this.attachedSquare.toCenter.x)) + "px";*/
			this.updateAttributes();
			this.forceMoveToLocation(this.attachedSquare.center);
		}
		
		// console.log(`Width: ${this.domElement.style.width} | Height: ${this.domElement.style.height} | Src: ${this.image.src}`);
	}

	/*---------------------forceMoveToLocation----------------------------\
	| - Move this shape to the specified destination
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	forceMoveToLocation(pos) {
		// Flag this shape as moving
		this.isMoving = true;
		// Add to the list of animating entities
		game.gameEntities.animatingList.push(this);

		/* try { */
			// console.log(`<Shape>[forceMoveToLocation]\nMoving ${this.domElement.id} to square ${this.attachedSquare.id}\n X: ${this.toCenter.x} | ${this.domElement.style.left}\n Y: ${this.toCenter.y} | ${this.domElement.style.top}`);

			// Move this shape to a higher z-index, then animate to its destination
			$(`#${this.domElement.id}`).css("z-index", "21").animate({
				top: `${pos.y - this.toCenter.y}px`,
				left: `${pos.x - this.toCenter.x}px`
			},750, "swing", ()=>{
				// Clear moving flag
				this.isMoving = false;

				// Remove from animating list
				game.gameEntities.removeAnimating(this);

				// Return to original z-index
				$(`#${this.domElement.id}`).css("z-index", "20");
				
				// Update the shape's attributes after each move
				this.updateAttributes();
			});
		/* } catch (e) {
			// console.log(`<Shape>[forceMoveToLocation]\nNo shape, no move.`);
		} */
	}
	
	/*---------------------moveShapeToLocation----------------------------\
	| - Move the supplied shape to the specified destination, limited by
	|   the distance between adjacent squares' center points
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	moveShapeToLocation(myDestination) {
		/* try {
			if (game.startSquare == null || game.destinationSquare == null) {
				console.log(`<Shape>[MoveShapeToLocation]\nOne of the selected squares is invalid:\nStart is ${game.startSquare == null ? "null" : game.startSquare.id}\nDestination is ${game.destinationSquare == null ? "null" : game.destinationSquare.id}`);
				game.startSquare = null;
				game.destinationSquare = null;
				return;
			}

			let myStartSquare = game.startSquare;
			let myDestinationSquare = game.destinationSquare;

			// console.log(`<Shape>[MoveShapeToLocation]\nMoving ${this.domElement.id} from square ${game.startSquare.id} to square ${game.destinationSquare.id}\n X: ${this.toCenter.x} | ${this.domElement.style.left}\n Y: ${this.toCenter.y} | ${this.domElement.style.top}`);

			// Set this shape as moving
			this.isMoving = true;

			// Move this shape to a higher z-index, then animate to its destination
			//$(`#${this.domElement.id}`).css("z-index", "21").animate({
			//	top: `${myDestination.y - this.toCenter.y}px`,
			//	left: `${myDestination.x - this.toCenter.x}px`
			//},400, "swing", ()=>{
				// console.log(`<Shape>[MoveShapeToLocation]\nFinished moving ${this.domElement.id}`);
				// this.updateAttributes();

				// If an invalid move is made, move the shape back to its starting position
				if (!myStartSquare.compareLinks(myDestinationSquare)) {
					// console.log(`<Shape>[MoveShapeToLocation]\nInvalid destination. Returning ${this.domElement.id} to its origin square ${game.startSquare.id}.`);
					$(`#${this.domElement.id}`).css("z-index", "21").animate({
						top: `${myStartSquare.top + Math.abs(this.toCenter.y - myStartSquare.toCenter.y)}px`,
						left: `${myStartSquare.left + Math.abs(this.toCenter.x - myStartSquare.toCenter.x)}px`
					}, 300, "swing", ()=>{

						// Release the selected shape
						game.selectedShape = null;
						// Release any selected squares
						game.releaseSelectedSquare();
					});
				} else {
					// Otherwise, center the shape on the new, valid square
					// console.log(`<Shape>[MoveShapeToLocation]\nValid destination. Adjusting ${this.domElement.id}'s position to square ${game.destinationSquare.id}.`);
					$(`#${this.domElement.id}`).css("z-index", "21").animate({
						top: `${myDestinationSquare.top + Math.abs(this.toCenter.y - myDestinationSquare.toCenter.y)}px`,
						left: `${myDestinationSquare.left + Math.abs(this.toCenter.x - myDestinationSquare.toCenter.x)}px`
					}, 400, "swing", () => {

						// Set the previously attached square (gives to swapping shape)
						this.lastAttachedSquare = this.attachedSquare;
						
						// Attach the target square to this shape
						this.attachedSquare = myDestinationSquare;

						// Check if the destination square has a valid shape
						if (myDestinationSquare.attachedShape !== "undefined") {
							// Set the destination square's shape as moving
							myDestinationSquare.attachedShape.isMoving = true;
							// Set the destination square's shape's last attached square
							myDestinationSquare.attachedShape.lastAttachedSquare = myDestinationSquare;
							// Attach this shape's previous square to the destination square's shape
							myDestinationSquare.attachedShape.attachedSquare = this.lastAttachedSquare;
							// Attach the last square's shape to the destination square's shape
							this.lastAttachedSquare.attachedShape = myDestinationSquare.attachedShape;
							
							// Move the destination shape to its new home
							$(`#${myDestinationSquare.attachedShape.domElement.id}`).animate({
								top: `${myStartSquare.top + Math.abs(myStartSquare.attachedShape.toCenter.y - myStartSquare.toCenter.y)}px`,
								left: `${myStartSquare.left + Math.abs(myStartSquare.attachedShape.toCenter.x - myStartSquare.toCenter.x)}px`
							}, 400, "swing", ()=>{


								// TODO : Evaluate the grid. False? Return to previous positions.
								// True? Attach the shapes to their new squares and pop the matches.

								// Add both squares to the evaluate list
								game.playGrid.evaluateList.push(this.attachedSquare, this.lastAttachedSquare);

								// Add both shapes to the entities evaluate list
								game.gameEntities.evaluateList.push(this, this.lastAttachedSquare.attachedShape);

								// console.log(`\n\n\n<Shape>[MoveShapeToLocation]\nCHECK HERE\n\n\nEval List Length: ${game.playGrid.evaluateList.length}`);

								// Update swapped shape's attributes
								myStartSquare.attachedShape.updateAttributes();
								// Set the destination square's attached shape to this shape
								myDestinationSquare.attachedShape = this;
								// Release the selected shape
								game.selectedShape = null;
								// Release any selected squares
								game.releaseSelectedSquare();
								// Clear the swapped shape's moving flag
								try{ this.lastAttachedSquare.attachedShape.isMoving = false; } catch(e) {}
							});
						} else {
							// Set the destination square's attached shape to this shape
							myDestinationSquare.attachedShape = this;
							// Release the selected shape
							game.selectedShape = null;
							// Release any selected squares
							game.releaseSelectedSquare();
						}

						// Clear this shape's last attached square
						// this.lastAttachedSquare = "undefined";

						// Return the shape to its original z-index
						$(`#${this.domElement.id}`).css("z-index", "20");
						
						// Update the shape's attributes
						this.updateAttributes();

						// Clear this shape's moving flag
						this.isMoving = false;
					});
				}

				// TODO : find a home for game.releaseSelectedSquare();
				// console.log(`<Shape>[MoveShapeToLocation]\nFinished moving ${this.domElement.id} to ${this.center}`);
			//});
		} catch (e) {
			// console.log(`<Shape>[MoveShapeToLocation]\nNo shape, no move.`);
		} */
	}

	/*---------------------returnToLastLocation---------------------------\
	| - Return the shape to its original location
	\--------------------------------------------------------------------*/
	returnToLastPosition(Callback) {
		/* try {
			// console.log(`<Shape>[ReturnToLastLocation]\nMoving ${this.domElement.id} from square ${this.attachedSquare.id} to square ${this.lastAttachedSquare.id}\n X: ${this.toCenter.x} | ${this.domElement.style.left}\n Y: ${this.toCenter.y} | ${this.domElement.style.top}`);

			// Set this shape as moving
			this.isMoving = true;

			// Move this shape to a higher z-index, then animate to its destination
			$(`#${this.domElement.id}`).css("z-index", "21").animate({
				top: `${this.lastAttachedSquare.top + Math.abs(this.toCenter.y - this.lastAttachedSquare.toCenter.y)}px`,
				left: `${this.lastAttachedSquare.left + Math.abs(this.toCenter.x - this.lastAttachedSquare.toCenter.x)}px`
			},500, "swing", ()=>{

				// Update the attached square
				this.attachedSquare = this.lastAttachedSquare;

				// Since it's moved to its original position, clear the last attached square
				this.lastAttachedSquare = "undefined";

				// Inform the new square of the change
				this.attachedSquare.attachedShape = this;
				
				// Return this shape to its original z-index
				$(`#${this.domElement.id}`).css("z-index", "20");

				// Update this shape's attributes
				this.updateAttributes();

				// Remove this shape's moving flag
				this.isMoving = false;

				// Return the Callback if it's requested
				if (Callback !== "undefined") return Callback;
			});
		} catch (e) {
			// console.log(`<Shape>[ReturnToLastLocation]\nNo shape to move...`)
		} */
	}

	/*---------------------popShape---------------------------------------\
	| - Pops the shape, removes it from its attached square
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	popShape(Callback) {
		
		
		// console.log(`<Shape>[PopShape]\nID: ${this.id}`);
		// Set this shape as moving
		this.isMoving = true;

		// Add to the list of animating entities
		game.gameEntities.animatingList.push(this);

		// Pop animation
		// Update the z-index, placing it on the top-most layer, then animate
		$(`#${this.domElement.id}`).css("z-index", 22).animate({
			top: "0px",
			left: "0px",
			opacity: "0.0"
		}, 750, ()=>{

			// Clear this shape's moving flag, enabling it for deletion
			this.isMoving = false;

			// Remove from animating list
			game.gameEntities.removeAnimating(this);

			// Update player score
			game.player.score += this.points;

			// Clear previous attachments, if any - Prevents swapping back to old position
			// if (this.lastAttachedSquare !== "undefined") {
				// Check neighboring, swapped shape
				// if (this.lastAttachedSquare.attachedShape !== "undefined") {
					// this.lastAttachedSquare.attachedShape.lastAttachedSquare = "undefined";
				// }

				// Clear this shape's last attachment
				// this.lastAttachedSquare = "undefined";
			// }

			// Remove from the square's shape attachment
			this.attachedSquare.removeShape();

			// Enable the popped flag
			this.popped = true;

			// Remove this shape
			game.gameEntities.removeEntity(this);

			// Return the Callback if it's requested
			if (Callback !== "undefined") return Callback;
		});
	}
	
	/*---------------------setNewPosition---------------------------------\
	| - Sets the shape's new position and updates the last position for 
	|   the next move attempt
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	setNewPosition(pos) {
		this.position = pos;
	}
	
	/*---------------------setTargetPosition------------------------------\
	| - Sets the shape's new target position
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	setTargetPosition(pos) {
		this.target = vecSubtract(pos, this.toCenter);
	}
	
	/*---------------------updateMovement---------------------------------\
	| - Called from the update method to calculate and apply the steering
	|   force for this time-step
	\--------------------------------------------------------------------*/
	updateMovement(dt) {
		//console.log(`<Shape>[UpdateMovement] Target: ${this.target}`);
		// Rotate to the target position before moving
		if (!this.rotateFacingTowardPosition(this.target)) {
			this.heading = this.facing;
			return;
		}
		
		// Calculate the combined steering force
		var force = this.steering.calculate();
		
		//console.log(`<Shape>[UpdateMovement] Force: ${force}`);
		
		// If no steering force is produced, decelerate the shape by
		// applying a braking force
		if (this.steering.force().isZero()) {
			const brakingRate = 0.8;
			this.velocity = vecMultiply(this.velocity, brakingRate);
		}
		
		// console.log(`<Shape>[UpdateMovement] Velocity: ${this.velocity}`);
		
		// Calculate the acceleration
		var accel = vecDivide(force, this.mass);
		// console.log(`<Shape>[UpdateMovement] Accel: ${accel}`);
		
		// Update the velocity
		this.velocity = vecAdd(this.velocity, vecMultiply(accel, 1));
		// console.log(`<Shape>[UpdateMovement] Velocity: ${this.velocity}`);
		
		// Ensure the shape does not exceed its max velocity
		this.velocity.truncate(this.maxSpeed);
		// console.log(`<Shape>[UpdateMovement] Trunc Vel: ${this.velocity}`);
		
		// Update the position
		this.position = vecAdd(this.position, vecMultiply(this.velocity, 1));
		// console.log(`<Shape>[UpdateMovement] Position: ${this.position} | Type: ${typeof this.position}`);
		
		// If the shape has a non-zero velocity, the heading and side
		// vectors must be updated
		if (!this.velocity.isZero()) {
			this.heading = vec2DNormalize(this.velocity);
			this.side = this.heading.perp();
		}
		var dist = vecSubtract(this.target, this.pos()).length();
		console.log(`Distance: ${this.target}`);
		if (dist < 0.5) {
			this.getSteering().seekOff();
			this.getSteering().arriveOff();
			this.position = this.target;
		}
		
		// Update center position
		this.center = new Vector2D(this.position.x + this.width/2, this.position.y + this.height/2);
	}
	
	/*---------------------rotateFacingTowardPosition---------------------\
	| - Rotates this shape's heading until it is facing directly at the
	|   target position.
	| - Returns false if not facing at the target
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	rotateFacingTowardPosition(target) {
		// console.log(`<Shape>[RotateFacingTowardPosition] Target: ${target}`);
		
		var toTarget = vec2DNormalize(vecSubtract(target, this.position));
		// console.log(`<Shape>[RotateFacingTowardPosition] toTarget: ${toTarget} | Facing: ${this.facing}`);
		
		var dot = this.facing.dot(toTarget);
		// console.log(`<Shape>[RotateFacingTowardPosition] dot: ${dot}`);
		
		// Clamp to rectify any rounding errors
		dot = clamp(dot, -0.99999, 0.99999);
		// console.log(`<Shape>[RotateFacingTowardPosition] dot clamped: ${dot}`);
		
		// Determine the angle between the heading vector and the target
		var angle = Math.acos(dot);
		
		// console.log(`<Shape>[RotateFacingTowardPosition] angle: ${angle}`);
		
		// Return true if the shape's facing is within tolerance degs of
		// the facing target
		// const lookTolerance = 0.01; // ~2 degrees
		const lookTolerance = 0.005; // ~1 degree
		
		if (angle < lookTolerance) {
			this.facing = toTarget;
			return true;
		}
		
		// console.log(`<Shape>[RotateFacingTowardPosition] turnRate: ${this.turnRate}`);
		
		// Clamp the amount to turn to the max turn rate
		if (angle > this.turnRate) angle = this.turnRate;
		// console.log(`<Shape>[RotateFacingTowardPosition] angle: ${angle}`);
		
		// Use the rotation matrix to rotate the shape's facing vector
		var rotationMatrix = new c2DMatrix();
		
		// Determine the rotation's direction when creating the matrix
		rotationMatrix.rotate(angle * this.facing.sign(toTarget));
		rotationMatrix.transformVector2D(this.facing);
		
		// console.log(`<Shape>[RotateFacingTowardPosition] Heading: ${this.heading}`);
		
		return false;
	}
	
	/*---------------------facing-----------------------------------------\
	| - Returns the direction the shape is facing
	\--------------------------------------------------------------------*/
	facing() { return this.heading; }
	
	/*---------------------fieldOfView------------------------------------\
	| - Returns the shape's field of view
	\--------------------------------------------------------------------*/
	fieldOfView() {	return this.fieldOfView; }
	
	/*---------------------StatusChecks-----------------------------------\
	\--------------------------------------------------------------------*/
	// Dead
	isDead() { return this.status == statusEnum.dead; }
	// Alive
	isAlive() { return this.status == statusEnum.alive; }
	// Spawning
	isSpawning() { return this.status = statusEnum.spawning; }
	
	/*---------------------StatusMutators---------------------------------\
	\--------------------------------------------------------------------*/
	// Dead
	setDead() { this.status = statusEnum.dead; }
	// Alive
	setAlive() { this.status = statusEnum.alive; }
	// Spawning
	setSpawning() { this.status = statusEnum.spawning; }
	
	/*---------------------calculateTimeToReachPosition-------------------\
	| - Returns a value indicating the time in seconds it will take the
	|   shape to reach the given position at its current speed
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	calculateTimeToReachPosition(pos) {
		return vecDivide(vec2DDistance(this.position, pos), (this.maxSpeed * engine.frameRate));
	}
	
	/*---------------------isAtPosition-----------------------------------\
	| - Returns true if the shape is close to the given position
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	isAtPosition(pos) {
		const tolerance = 10.0;
		return vec2DDistanceSq(this.center, pos) < tolerance * tolerance;
	}
	
	/*---------------------spawn------------------------------------------\
	| - Spawns the shape at the given position
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	spawn(pos) {
		console.log(`Spawning ${this.entityType()} Status: ${this.status}`);
		this.setAlive();
		this.position = pos;
		this.setPos(pos);
		console.log(`Spawning ${this.entityType()} Status: ${this.status}`);
	}
	
	/*---------------------isReadyForTriggerUpdate------------------------\
	| - Returns true if this shape is ready to test against all triggers
	\--------------------------------------------------------------------*/
	isReadyForTriggerUpdate() {}
	
	/*---------------------hasLOSto---------------------------------------\
	| - Returns true if the bot has line of sight to the given position
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	hasLOSto(pos) { return true; }	// TODO: If we need to add obstructions, we'll add them later
	
	/*---------------------canMoveTo--------------------------------------\
	| - Returns true if the shape can move directly to the given position
	|   without bumping into any walls
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	canMoveTo(pos) { return true; } // TODO: If we need to add obstructions, we'll add them later
	
	/*---------------------canMoveBetween---------------------------------\
	| - Returns true if the shape can move between the two given points
	|   without bumping into any walls
	| - arg types: Vector2D | Vector2D
	\--------------------------------------------------------------------*/
	canMoveBetween(from, to) { return true; } // TODO: If we need to add obstructions, we'll add them later
	
	/*---------------------StepDirections---------------------------------\
	| - Each step test returns true if there is enough space for the shape
	|   to move in the indicated direction.
	| - If true, positionOfStep will be assigned the offset position
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	canStepLeft(positionOfStep) {
		const stepDistance = this.radius * 2;
		positionOfStep = vecSubtract(vecSubtract(this.position, vecMultiply(this.facing().perp(), stepDistance)), vecMultiply(this.facing().perp()), this.radius);
		return this.canMoveTo(positionOfStep);
	}
	canStepRight(positionOfStep) {
		const stepDistance = this.radius * 2;
		positionOfStep = vecAdd(vecAdd(this.position, vecMultiply(this.facing().perp(), stepDistance)), vecMultiply(this.facing().perp()), this.radius);
		return this.canMoveTo(positionOfStep);
	}
	canStepForward(positionOfStep) {
		const stepDistance = this.radius * 2;
		positionOfStep = vecAdd(vecAdd(this.position, vecMultiply(this.facing(), stepDistance)), vecMultiply(this.facing()), this.radius);
		return this.canMoveTo(positionOfStep);
	}
	canStepBackward(positionOfStep) {
		const stepDistance = this.radius * 2;
		positionOfStep = vecSubtract(vecSubtract(this.position, vecMultiply(this.facing(), stepDistance)), vecMultiply(this.facing()), this.radius);
		return this.canMoveTo(positionOfStep);
	}
	
	/*---------------------LinkedAccessors--------------------------------\
	\--------------------------------------------------------------------*/
	// Steering
	getSteering() { return this.steering; }
	getTargetShape() { return this.targetShape; } // maybe?
	
	/*---------------------setupVertexBuffer------------------------------\
	| - Creates a virtual bounding box around the shape
	| - arg types: double | double | double | double
	\--------------------------------------------------------------------*/
	setupVertexBuffer() {
		// Define the number of buffers and calculate the bounding radius
		const numShapeVerts = 4;
		const myShape = [new Vector2D(this.left, this.top), new Vector2D(this.right, this.top), new Vector2D(this.right, this.bottom), new Vector2D(this.left, this.bottom)];
		this.radius = 0.0;
		var scale = this.scale;
		
		// Loop through myShape to test each vertex
		for (var vtx = 0; vtx < numShapeVerts; ++vtx) {
			// Set the bounding radius to the length of the greatest extent
			if (Math.abs(myShape[vtx].x) * scale > this.radius) {
				this.radius = Math.abs(myShape[vtx].x * scale * 0.75);
			}
			if (Math.abs(myShape[vtx].y) * scale > this.radius) {
				this.radius = Math.abs(myShape[vtx].y * scale * 0.75);
			}
		}
	}

	/*---------------------toString---------------------------------------\
	| - Override the toString() attribute for shapes
	\--------------------------------------------------------------------*/
	toString() {
		var s = "";
		s += `<Shape>\n`;
		s += `ID: ${this.id}\n`;
		s += `Type: ${this.type}`;
		return s;
	}
}