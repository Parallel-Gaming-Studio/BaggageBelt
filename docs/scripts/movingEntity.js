// JavaScript Document

/*---------------------MovingEntity-----------------------------------\
| - Base class that defines entities that move. The entity has a local
|   coordinate system and members for defining its mass and velocity
\--------------------------------------------------------------------*/

class movingEntity extends baseGameEntity {
    constructor(position, radius, velocity, maxSpeed, heading, mass, scale, turnRate, maxForce, type) {
		// Position of the entity
		var _position;
		if (typeof position !== "undefined") {
            _position = position;
        } else {
            _position = new Vector2D();
        }
		// The entity's bounding radius
		var _radius;
		if (typeof radius !== "undefined") {
            _radius = radius;
        } else {
            _radius = 1.0;
        }
		// Vector representing the entity's velocity
		var _velocity;
		if (typeof velocity !== "undefined") {
            _velocity = velocity;
        } else {
            _velocity = new Vector2D();
        }
		// Normalized vector pointing in the direction the entity is heading
		var _heading;
		if (typeof heading !== "undefined") {
            _heading = heading;
        } else {
            _heading = new Vector2D();
        }
		// A vector perpendicular to the heading vector
		var _side;
		_side = _heading.perp();
		// The entity's mass
		var _mass;
		if (typeof mass !== "undefined") {
            _mass = mass;
        } else {
            _mass = 1.0;
        }
		// The entity's scale
		var _scale
		if (typeof scale !== "undefined") {
            _scale = scale;
        } else {
            _scale = new Vector2D();
        }
		// The maximum speed this entity may travel at
		var _maxSpeed;
		if (typeof maxSpeed !== "undefined") {
            _maxSpeed = maxSpeed;
        } else {
            _maxSpeed = 2.0;
        }
		// The maximum force this entity can produce to power itself
		var _maxForce;
		if (typeof maxForce !== "undefined") {
            _maxForce = maxForce;
        } else {
            _maxForce = 1.0;
        }
		// The maximum rate (radians/second) this entity can rotate
		var _maxTurnRate;
		if (typeof turnRate !== "undefined") {
            _maxTurnRate = turnRate;
        } else {
            _maxTurnRate = 1.0;
        }
		// The entity's type
		var _type;
		if (typeof type !== "undefined") {
			_type = type;
		} else {
			_type = typeEnum.type_moving_entity;
		}
		
		// Initialize baseGameEntity()
		super("undefined", _radius, _position, _scale, _type, false);
		
        // Set all the values for this object
		this.position = _position;
		this.boundingRadius = _radius;
		this.velocity = _velocity;
		this.maxSpeed = _maxSpeed;
		this.heading = _heading;
		this.side = _side;
		this.mass = _mass;
		this.scale = _scale;
		this.maxTurnRate = _maxTurnRate;
		this.maxForce = _maxForce;
		this.type = _type;
    }
	
	/*--------------------------------------------------------------------\
    | - Accessors and Mutators
    \--------------------------------------------------------------------*/
	// Velocity (Vector2D)
	getVelocity() {
		return this.velocity;
	}
	setVelocity(newVel) {
		this.velocity = newVel;
	}
	
	// Mass (double)
	getMass() {
		return this.mass;
	}
	
	// Side (Vector2D)
	getSide() {
		return this.side;
	}
	setSide(newSide) {
		this.side = newSide;
	}
	
	// Max Speed (double)
	getMaxSpeed() {
		return this.maxSpeed;
	}
	setMaxSpeed(newSpeed) {
		this.maxSpeed = newSpeed;
	}
	
	// Max Force (double)
	getMaxForce() {
		return this.maxForce;
	}
	setMaxForce(newForce) {
		this.maxForce = newForce;
	}
	
	// Variable Speed (double)
	isSpeedMaxedOut() {
		return this.maxSpeed * this.maxSpeed >= this.velocity.lengthSq();
	}
	getSpeed() {
		return this.velocity.length();
	}
	getSpeedSq() {
		return this.velocity.lengthSq();
	}
	
	// Heading (Vector2D)
	getHeading() {
		return this.heading;
	}
	
	// Max Turn Rate (double)
	getMaxTurnRate() {
		return this.maxTurnRate;
	}
	setMaxTurnRate(val) {
		this.maxTurnRate = val;
	}
    
    /*---------------------RotateHeadingToFacePosition--------------------\
    | - Given a target position, rotate the entity's heading and side
    |   vectors by an amount not greater than m_dMaxTurnRate until it
    |   directly faces the target.
    | - Returns true when the heading is facing in the desired direction
    \--------------------------------------------------------------------*/
    rotateHeadingToFacePosition(target) {
        var toTarget = vec2DNormalize(vecSubtract(target, this.position));
        
        var dot = this.heading.dot(toTarget);
        
        // Clamp the dot product, forcing it to remain valid for acos
        clamp(dot, -1, 1);
        
        // Find the angle between the heading vector and the target
        var angle = Math.acos(dot);
        
        // Return true if the entity is facing the target
        if (angle < 0.00001) return true;
        
        // Clamp the amount to turn to the max turn rate
        if (angle > this.maxTurnRate) angle = this.maxTurnRate;
        
        // Use a rotation matrix to rotate the entity's heading vector
        var rotationMatrix = new c2DMatrix();
        
        // Determine the direction of the rotation when creating the matrix
        rotationMatrix.rotate(angle * this.heading.sign(toTarget));
        rotationMatrix.transformVector2D(this.heading);
        rotationMatrix.transformVector2D(this.velocity);
        
        // Recreate the side vector
        this.side = this.heading.perp();
        
        // Return false since the rotation is not complete yet
        return false;
    }
    
    /*---------------------SetHeading-------------------------------------\
    | - Initially checks if the given heading is not a vector of zero
    |   length. If the heading is valid, sets the entity's heading and side
    |   vectors accordingly.
    \--------------------------------------------------------------------*/
    setHeading(newHeading) {
        assert( ((newHeading.lengthSq() - 1.0) < 0.00001), `<MovingEntity:SetHeading:Error> HeadingSq not smaller than zero: ${newHeading.lengthSq() - 1.0}`);
        
        this.heading = newHeading;
        
        // The side vector must always be perpendicular to the heading
        this.side = this.heading.perp();
    }
}