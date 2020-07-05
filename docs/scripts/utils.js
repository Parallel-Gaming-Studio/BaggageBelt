// JavaScript Document

// Useful variables
var Pi = 3.14159;
var TwoPi = Pi * 2;
var HalfPi = Pi / 2;
var QuarterPi = Pi / 4;

/*----------------Random Number Functions-----------------------------\
| - Multiple useful functions for generating random numbers
\--------------------------------------------------------------------*/

// Returns a random integer between x and y
function randInt(x, y) { return Math.floor(Math.random() * (y-x+1) + x)}; //Math.floor(Math.random()%(y-x+1)+x); };

// Returns a random double between zero and 1
function randFloat() { return (Math.random()/(Number.MIN_SAFE_INTEGER+1.0)); };

// Returns a random double between x and y
function randInRange(x, y) { return x + randFloat() * (y - x); };

// Returns a random boolean
function randBool() {
    if (randInt(0,1)) return true;
    else return false;
}

// Returns a random double in the range -1 < n < 1
function randomClamped() { return randFloat() - randFloat(); };

// Returns a random number with a normal distribution
function randGaussian(mean = 0.0, standard_deviation = 1.0) {
    var x1, x2, w, y1;
    var y2;
    const use_last = 0;
    
    // Use value from the previous call
    if (use_last) {
        y1 = y2;
        use_last = 0;
    } else {
        do {
            x1 = 2.0 * randFloat() - 1.0;
            x2 = 2.0 * randFloat() - 1.0;
            w = x1 * x1 + x2 * x2;
        } while ( w >= 1.0 );
        
        w = Math.sqrt( (-2.0 * Math.log( w ) ) / w );
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = 1;
    }
    
    return (mean + y1 * standard_deviation);
}

/*-----------------------Useful Functions-----------------------------\
| - Useful functions for multiple different uses
\--------------------------------------------------------------------*/

// Push a value to the "back" of an array (like unshift())
Array.prototype.push_back = function(val) {
    this.reverse();
    this.push(val);
    this.reverse();
}

// Send a message to the console that a problem exists with the supplied condition
function assert(condition, message) {
    if (!condition) {
        message = message || "Assert failed...";
        /* if (typeof Error !== "undefined") {
            throw new Error(message);
        } */
        throw message;
    }
}

// Return the sigmoid of the input
function sigmoid(input, response = 1.0) {
    return (1.0 / (1.0 + Math.exp(-input / response)));
}

// Returns true if the value is NaN (Not a Number)
function isNaN(val) {
    return val != val;
}

// Converts Degrees to Radians
function degsToRads(degs) {
    return TwoPi * (degs/360);
}

// Returns true if the third parameter is in the range described
// by the first two
function inRange(start, end, val) {
    if (start < end) {
        if ( (val > start) && (val < end) ) return true;
        else return false;
    } else {
        if ( (val < start) && (val > end) ) return true;
        else return false;
    }
}

// Returns the greater value
function maximum(v1, v2) {
    return v1 > v2 ? v1 : v2;
}

// Returns the minimum of two values
function minimum(v1, v2) {
    return v1 < v2 ? v1 : v2;
}

// Clamps the first argument between the second two
function clamp(arg, minVal, maxVal) {
    //assert((minVal < maxVal), `<Utils:Clamp:Error> maxVal (${maxVal}) < minVal (${minVal}).`);
    
    if (arg < minVal) arg = minVal;
    
    if (arg > maxVal) arg = maxVal;
	
	return arg;
}

// Rounds a double up or down depending on its value
function rounded(val) {
    var integral = Math.floor(val);
    var mantissa = val - integral;
    
    if (mantissa < 0.5) {
        return integral;
    } else {
        return integral + 1;
    }
}

// Rounds a double up or down depending on whether its
// mantissa is higher or lower than offset
function roundUnderOffset(val, offset) {
    var integral = Math.floor(val);
    var mantissa = val - integral;
    
    if (mantissa < offset) {
        return integral;
    } else {
        return integral + 1;
    }
}

// Compares two real numbers. Returns true if they are equal
function isEqual(a, b) {
    if (Math.abs(a-b) < Number.MIN_VALUE) {
        return true;
    }
    return false;
}

// Returns the average of a vector
function average(v) {
    var average = 0.0;
    
    for (var i = 0; i < v.size(); i++) {
        average += v[i];
    }
    
    return average / v.size();
}

// Returns the standard deviation of a vector
function standardDeviation(v) {
    var sd = 0.0;
    var average = average(v);
    
    for (var i = 0; i < v.size(); i++) {
        sd += (v[i] - average) * (v[i] - average);
    }
    
    sd = sd / v.size();
    
    return Math.sqrt(sd);
}