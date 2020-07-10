// JavaScript Document

/*---------------------Shape------------------------------------------\
| - Class to implement the Shape
\--------------------------------------------------------------------*/

/*---------------------Enumerators------------------------------------\
| - Define the necessary enumerators
\--------------------------------------------------------------------*/

const statusEnum = Object.freeze({
	"alive": "alive",
	"dead": "dead",
	"spawning": "spawning"
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
		var _center = new Vector2D(_position.x + _width / 2, _position.y + _height / 2);
		// Offset
		var _offset = vecSubtract(_position, vecSubtract(_center, _position));
		_position = _offset;
		_center = new Vector2D(_position.x + _width / 2, _position.y + _height / 2);

		// Default values when creating a new shape
		var _velocity = new Vector2D();
		var _heading = new Vector2D(_center.x, _center.y - _height);

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

	// Abstract Draw Function
	draw() { }

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
		this.center = new Vector2D(this.position.x + this.width / 2, this.position.y + this.height / 2);
		this.offset = vecSubtract(this.position, vecSubtract(this.center, this.position));
		this.toCenter = vecSubtract(this.center, this.position);
		this.radius = this.width / 2.2;
	}

	/*---------------------adjustStyles-----------------------------------\
    | - Adjust the styles to match the target's
    \--------------------------------------------------------------------*/
	adjustStyles() {
		this.updateAttributes();

		// this.domElement.style.display = "block";
		this.domElement.style.width = this.getOrigin().width + "px";
		this.domElement.style.height = this.getOrigin().height + "px";
		if (this.attachedSquare !== "undefined") {
			/*this.domElement.style.top = (this.attachedSquare.top + Math.abs(this.toCenter.y - this.attachedSquare.toCenter.y)) + "px";
			this.domElement.style.left = (this.attachedSquare.left + Math.abs(this.toCenter.x - this.attachedSquare.toCenter.x)) + "px";*/
			this.updateAttributes();
			// this.forceMoveToLocation(this.attachedSquare.center);
		}

		// console.log(`Width: ${this.domElement.style.width} | Height: ${this.domElement.style.height} | Src: ${this.image.src}`);
	}

	/*---------------------forceMoveToLocation----------------------------\
	| - Move this shape to the specified destination
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	forceMoveToLocation(pos, CallBack) {
		// Flag this shape as moving
		this.isMoving = true;

		// console.log(`<Shape>[forceMoveToLocation]\nMoving ${this.domElement.id} to square ${this.attachedSquare.id}\n X: ${this.toCenter.x} | ${this.domElement.style.left}\n Y: ${this.toCenter.y} | ${this.domElement.style.top}`);

		// Children adjustments
		var adjX = pos.x;
		var adjY = pos.y;

		// If this is a piece of luggage, set it as not ready
		let typeName = getNameOfType(this.type);
		/*if (typeName == "LuggageBlue" ||
			typeName == "LuggageGreen" ||
			typeName == "LuggagePurple" ||
			typeName == "LuggageRed" ||
			typeName == "LuggageYellow") {
			this.ready = !this.ready;
		}*/

		// Move this shape to a higher z-index, then animate to its destination
		$(`#${this.domElement.id}`).animate({
			top: `${pos.y}px`, // - this.toCenter.y}px`,
			left: `${pos.x}px` // - this.toCenter.x}px`
		}, 1750, "swing", () => {
			// Clear moving flag
			this.isMoving = false;

			// Update the shape's attributes after each move
			this.updateAttributes();

			// If this is a plane, draw its drop zone
			if (this.type == typeEnum.type_plane_left_bottom ||
				this.type == typeEnum.type_plane_left_top ||
				this.type == typeEnum.type_plane_right_bottom ||
				this.type == typeEnum.type_plane_right_top ||
				this.type == typeEnum.type_cart_1 ||
				this.type == typeEnum.type_cart_2 ||
				this.type == typeEnum.type_cart_3 ||
				this.type == typeEnum.type_cart_4) {
				this.ready = !this.ready;
				// if (!this.ready) {this.ready = true;} // else {this.ready = false;}
				if (this.bagsLeft <= 0) { this.removeMe = true; this.ready = false; }
			}

			// If this is a piece of luggage it, compare it with the planes' drop zones
			if (typeName == "LuggageBlue" ||
				typeName == "LuggageGreen" ||
				typeName == "LuggagePurple" ||
				typeName == "LuggageRed" ||
				typeName == "LuggageYellow") {
				this.updateAttributes();
				game.manager.compareLuggageWithPlane(this);
			}

			// Remove if flag is set
			if (this.removeMe) this.destroyDiv();

			// Perform CallBack
			if (typeof CallBack !== "undefined") return CallBack();
		});
	}

	/*---------------------popShape---------------------------------------\
	| - Pops the shape, removes it from its attached square
	| - arg types: Vector2D
	\--------------------------------------------------------------------*/
	popShape(pos, Callback) {

		// console.log(`<Shape>[PopShape]\nID: ${this.id}`);
		// Set this shape as moving
		this.isMoving = true;

		// Add to the list of animating entities
		// game.gameEntities.animatingList.push(this);

		// Pop animation
		// Update the z-index, placing it on the top-most layer, then animate
		$(`#${this.domElement.id}`).css("z-index", 22).animate({
			top: "0px",
			left: "0px",
			opacity: "0.0"
		}, 750, () => {

			// Clear this shape's moving flag, enabling it for deletion
			this.isMoving = false;

			// Remove from animating list
			// game.gameEntities.removeAnimating(this);

			// Update player score
			// game.player.score += this.points;
			game.manager.addPoints(this.points);

			// Remove from the square's shape attachment
			// this.attachedSquare.removeShape();

			// Enable the popped flag
			this.popped = true;

			// Remove this shape
			// game.gameEntities.removeEntity(this);
			this.exit(pos);

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
		this.center = new Vector2D(this.position.x + this.width / 2, this.position.y + this.height / 2);
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
	fieldOfView() { return this.fieldOfView; }

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
	isReadyForTriggerUpdate() { }

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