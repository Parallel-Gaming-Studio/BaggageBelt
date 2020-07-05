// JavaScript Document

/*---------------------BaseGameEntity---------------------------------\
| - Define the base game entity class
\--------------------------------------------------------------------*/

/*---------------------Enumerators------------------------------------\
| - Define necessary enumerators
\--------------------------------------------------------------------*/

const baseGameEntityTypeEnum = Object.freeze({"default_entity_type":-1});

/*---------------------Initial Variables------------------------------\
| - Define necessary, initial variable values
\--------------------------------------------------------------------*/

// The next valid, unique ID. Every time a baseGameEntity is instantiated,
// this value gets updated
var bgeNextValidID = 0;

class baseGameEntity {
    constructor(_id, boundingRadius, position, scale, type, tag) {
        // Set the entity's ID
        if (typeof _id !== "undefined" && _id >= 0) {
            this.id = _id;
        } else {
            this.id = bgeNextValidID;
        }
        // Set the entity's position
        if (typeof position !== "undefined") {
            this.position = new Vector2D(position.x, position.y);
        } else {
            this.position = new Vector2D();
        }
        // Set the entity's bounding radius
        if (typeof boundingRadius !== "undefined") {
            this.boundingRadius = boundingRadius;
        } else {
            this.boundingRadius = 0.0;
        }
        // Set the entity's scale
        if (typeof scale !== "undefined") {
            this.scale = scale;
        } else {
            this.scale = new Vector2D(1.0, 1.0);
        }
        // Set the entity's type
        if (typeof type !== "undefined") {
            this.type = type;
        } else {
            this.type = typeEnum.type_entity;
        }
        // Set the entity's tag
        if (typeof tag !== "undefined") {
            this.tag = tag;
        } else {
            this.tag = false;
        }
		
		// DOM Element reference
		this.domElement = "undefined";
		
		// Entity origin reference
		this.originReference = "undefined";
        
        this.setID(this.id);
		
		game.manager.entities.push(this);
    }
	
	/*---------------------draw-------------------------------------------\
    | - Force all children to implement a draw function.
	| - Note: Not all entity classes or subclasses require a draw.
    \--------------------------------------------------------------------*/
	draw() {}
    
    /*---------------------SetID------------------------------------------\
    | - This must be called within each constructor to ensure the ID is set
    |   correctly. It verifies that the value passed to the method is
    |   greater than or equal to the next valid ID before setting the ID
    |   and incrementing the next valid ID.
    \--------------------------------------------------------------------*/
    setID(val) {
		
        // DEBUG : Ensure the val is equal to or greater than the next available ID
        // assert((val >= bgeNextValidID), "<BaseGameEntity:SetID:Error> Invalid ID - Fixing ID");
        
        this.id = (val >= bgeNextValidID) ? val : bgeNextValidID;
        
        bgeNextValidID = this.id + 1;
    }
    
    // Used to grab the next valid ID
    getNextValidID() {
        return bgeNextValidID;
    }
    
    // Resets the next ID
    resetNextValidID() {
        bgeNextValidID = 0;
    }
    
    // Returns of this entity's position
    pos() {
        return this.position;
    }
    
    // Sets this entity's new position
    setPos(newPos) {
        this.position = newPos;
    }
    
    // Returns the bounding radius
    bRadius() {
        return this.boundingRadius;
    }
    
    // Sets a new bounding radius
    setBRadius(r) {
        this.boundingRadius = r;
    }
    
    // Returns the ID
    ID() {
        return this.id;
    }
	
	// Returns the DOM
	getDOM() {
		return this.domElement;
	}
	
	// Sets the DOM
	setDOM(newDom) {
		this.domElement = newDom;
	}
	
	// Returns the entity's origin reference
	getOrigin() {
		return this.originReference;
	}
	
	// Sets the entity's origin reference
	setOrigin(newOrigin) {
		this.originReference = newOrigin;
	}
    
    // Returns the tag value
    isTagged() {
        return this.tag;
    }
    
    // Activates the tag
    Tag() {
        this.tag = true;
    }
    
    // Deactivates the tag
    unTag() {
        this.tag = false;
    }
    
    // Returns the scale
    getScale() {
        return this.scale;
    }
    
    // Sets the scale with a vector2d
    setScaleVec(val) {
        this.boundingRadius *= maximum(val.x, val.y) / maximum(this.scale.x, this.scale.y);
        this.scale = val;
    }
    
    // Adjusts the scale by a val
    setScale(val) {
        this.boundingRadius *= (val / maximum(this.scale.x, this.scale.y));
        this.scale = new Vector2D(val, val);
    }
    
    // Returns the entity type
    entityType() {
        return this.type;
    }
    
    // Sets the entity type
    setEntityType(newType) {
        this.type = newType;
    }
}