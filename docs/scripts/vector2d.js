// JavaScript Document

/*---------------------Enumerators------------------------------------\
| - Define necessary enumerators
\--------------------------------------------------------------------*/
const rotationEnum = Object.freeze({"clockwise":1, "anticlockwise":-1});

/*---------------------Vector 2D--------------------------------------\
| - Various Vector Controls
\--------------------------------------------------------------------*/
class Vector2D {
    // Overloaded constructor
    constructor(x, y) {
        if (typeof x !== "undefined" && typeof y !== "undefined") {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0.0;
            this.y = 0.0;
        }
        const $this = this;
    }

    // Display the vector's value
    toString() {
        return `(x, y, m) (${this.x},${this.y},0)`;
    }
    
    /*-----------------------Member Functions-----------------------------\
    | - Member functions for Vector2D
    \--------------------------------------------------------------------*/
    
    // Set x and y to zero
    zero() {
        this.x = 0.0;
        this.y = 0.0;
    }
    
    // Returns true if both x and y are zero
    isZero() {
        // return (this.x * this.x + this.y * this.y) < Number.MIN_VALUE;
		return (this.x * this.x + this.y * this.y) < 0.000001;
    }
    
    // Returns the length of the vector
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    // Returns the squared length of the 2D vector
    lengthSq() {
        return (this.x * this.x + this.y * this.y);
    }
    
    // Normalizes this vector
    normalize() {
        var vector_length = this.length();
        
        if (vector_length > Number.EPSILON) {
            this.x /= vector_length;
            this.y /= vector_length;
        }
    }
    
    // Calculates the vector's dot product
    dot(vec2d) {
        return this.x * vec2d.x + this.y * vec2d.y;
    }
    
    /* Returns positive if vec2d is clockwise of this vector,
     * negative if anticlockwise (assuming the Y-axis is pointing down
     * X-axis to right)
    */
    sign(vec2d) {
        if (this.y * vec2d.x > this.x * vec2d.y) {
            return rotationEnum.anticlockwise;
        } else {
            return rotationEnum.clockwise;
        }
    }
    
    // Returns the vector perpendicular to this one
    perp() {
        return new Vector2D(-this.y, this.x);
    }
    
    // Adjusts x and y so the length of the vector does not exceed max
    truncate(max) {
		// console.log(`<Vector2D>[Truncate] Max: ${max}`);
        if (this.length() > max) {
            this.normalize();
            this.$this *= max;
        }
    }
    
    // Returns the distance between this vector and the one passed as a parameter
    distance(vec2d) {
        var ySeparation = vec2d.y - this.y;
        var xSeparation = vec2d.x - this.x;
        
        return Math.sqrt(ySeparation * ySeparation + xSeparation * xSeparation);
    }
    
    // Squared version of distance
    distanceSq(vec2d) {
        var ySeparation = vec2d.y - this.y;
        var xSeparation = vec2d.x - this.x;
        
        return (ySeparation * ySeparation + xSeparation * xSeparation);
    }
    
    // Given a normalized vector, this method reflects the vector it
    // is operating upon (like the path of a ball bouncing off a wall)
    reflect(vec2d) {
        this.$this += 2.0 * this.dot(vec2d) * vec2d.getReverse();
    }
    
    // Returns the vector that is the reverse of this vector
    getReverse() {
        return new Vector2D(-this.x, -this.y);
    }
    
    /*-----------------------Operator Overloads---------------------------\
    | - Operator overloading equivalent
    \--------------------------------------------------------------------*/
    
    // Adds vec2d to this vector
    add(vec2d) {
        this.x += vec2d.x;
        this.y += vec2d.y;
        
        return this;
    }
    
    // Subtracts vec2d from this vector
    subtract(vec2d) {
        this.x -= vec2d.x;
        this.y -= vec2d.y;
        
        return this;
    }
    
    // Multiplies this vector by vec2d
    multiply(vec2d) {
        this.x *= vec2d.x;
        this.y *= vec2d.y;
        
        return this;
    }
    
    // Divides this vector by vec2d
    divide(vec2d) {
        this.x /= vec2d.x;
        this.y /= vec2d.y;
        
        return this;
    }
    
    // Equates this vector to vec2d
    equalTo(vec2d) {
        return (isEqual(this.x, vec2d.x) && isEqual(this.y, vec2d.y));
    }
    
    // Determines if this vector is not equal to vec2d
    notEqualTo(vec2d) {
        return (this.x != vec2d.x) || (this.y != vec2d.y);
    }
};

/*----------------------------Non-Member Functions--------------------\
| - Non-Member Functions
\--------------------------------------------------------------------*/
// Normalize a vector
function vec2DNormalize(v) {
    var vec = new Vector2D();
    vec = v;
    var vector_length = v.length();

    if (vector_length > Number.EPSILON) {
        v.x /= vector_length;
        v.y /= vector_length;
    }

    return v;
}

// Get the distance of two vectors
function vec2DDistance(v1, v2) {
    var ySeparation = v2.y - v1.y;
    var xSeparation = v2.x - v1.x;
    
    return Math.sqrt(ySeparation * ySeparation + xSeparation * xSeparation);
}

// Get the squared distance of two vectors
function vec2DDistanceSq(v1, v2) {
    var ySeparation = v2.y - v1.y;
    var xSeparation = v2.x - v1.x;
    
    return (ySeparation * ySeparation + xSeparation * xSeparation);
}

// Get the length of a vector
function vec2DLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

// Get the squared length of a vector
function vec2DLengthSq(v) {
    return (v.x * v.x + v.y * v.y);
}

// Convert a POINTS into a vector
function POINTStoVector(p) {
    return new Vector2D(p.x, p.y);
}

// Convert a POINT into a vector (double)
function POINTtoVector(p) {
    return new Vector2D(p.x, p.y);
}

// Convert a vector to POINTS
function VectorToPOINTS(v) {
    var p = new POINTS();
    p.x = v.x;
    p.y = v.y;
    return p;
}

// Convert a vector to POINT
function VectorToPOINT(v) {
    var p = new POINT();
    p.x = v.x;
    p.y = v.y;
    return p;
}

/*----------------------------Operator Overloads---------------------\
| - Overloading operators
\--------------------------------------------------------------------*/
// Multiply vector by a value (including other vectors)
function vecMultiply(v1, val) {
    var result = new Vector2D(v1.x, v1.y);
    // result = v1;
	result.x *= val;
	result.y *= val;
    return result;
}

// Subtract one vector from another
function vecSubtract(v1, v2) {
    var result = new Vector2D(v1.x, v1.y);
    // result = v1;
    result.x -= v2.x;
    result.y -= v2.y;
    return result;
}

// Add one vector to another
function vecAdd(v1, v2) {
    var result = new Vector2D(v1.x, v1.y);
    // result = v1;
    result.x += v2.x;
    result.y += v2.y;
    return result;
}

// Divide a vectory by some value
function vecDivide(v1, val) {
    var result = new Vector2D(v1.x, v1.y);
    // console.log(`<Vector2D>[VecDivide] Result: ${result}\nv1: ${v1}\nval: ${parseFloat(val)}`);
	result.x /= val;
	result.y /= val;
	// console.log(`<Vector2D>[VecDivide] Result: ${result}`);
    return result;
}

/*----------------------------Window Treatment------------------------\
| - Window treatment and overlaps
\--------------------------------------------------------------------*/
// Treat the window as a toroid
function wrapAround(pos, maxX, maxY) {
    // Right to left
    if (pos.x > maxX) { pos.x = 0.0; }
    // Left to right
    if (pos.x < 0) { pos.x = maxX; }
    // Top to bottom
    if (pos.y < 0) { pos.y = maxY; }
    // Bottom to top
    if (pos.y > maxY) { pos.y = 0.0; }
}

// Returns true if the point p is not inside the region defined by top_left
// and bot_rgt
function notInsideRegion(p, top_left, bot_rgt) {
    return (p.x < top_left.x) || (p.x > bot_rgt.x) ||
           (p.y < top_left.y) || (p.y > bot_rgt.y);
}

// Returns true if the point p is inside the bounds of top_left and bot_rgt
function insideRegion(p, top_left, bot_rgt) {
    return !((p.x < top_left.x) || (p.x > bot_rgt.x) ||
             (p.y < top_left.y) || (p.y > bot_rgt.y));
}

// Returns true if the vector is inside the bounds of a RECT's bounds
function vecInsideRegion(p, left, top, right, bottom) {
    return !((p.x < left) || (p.x > right) || (p.y < top) || (p.y > bottom));
}

/*----------------------------isSecondInFOVOfFirst--------------------\
| - Returns true if the target position is in the FOV of the entity
|   positioned at posFirst facing in facingFirst
\--------------------------------------------------------------------*/
function isSecondInFOVOfFirst(posFirst, facingFirst, posSecond, fov) {
    var toTarget = new Vector2D();
    toTarget = vec2DNormalize(posSecond - posFirst);
    return facingFirst.Dot(toTarget) >= Math.cos(fov / 2.0);
}