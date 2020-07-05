// JavaScript Document

/*---------------------C2DMatrix--------------------------------------\
| - 2D Matrix Class
\--------------------------------------------------------------------*/

// Basic matrix class
class matrix {
    constructor() {
        this._11 = 0.0; this._12 = 0.0; this._13 = 0.0;
        this._21 = 0.0; this._22 = 0.0; this._23 = 0.0;
        this._31 = 0.0; this._32 = 0.0; this._33 = 0.0;
    }
}

// Controlled 2D Matrices
class c2DMatrix {
    constructor() {
        this.myMatrix = new matrix();
        this.identity();
    }
    
    /*--------------------------------------------------------------------\
    | - Methods and Member Functions
    \--------------------------------------------------------------------*/
    
    // Create an identity matrix
    identity() {
        this.myMatrix._11 = 1.0; this.myMatrix._12 = 0.0; this.myMatrix._13 = 0.0;
        this.myMatrix._21 = 0.0; this.myMatrix._22 = 1.0; this.myMatrix._23 = 0.0;
        this.myMatrix._31 = 0.0; this.myMatrix._32 = 0.0; this.myMatrix._33 = 1.0;
    }
    
    // Multiply two matrices together
    matrixMultiply(mIn) {
        var mat_temp = new matrix();
        
        // First row
        mat_temp._11 = (this.myMatrix._11 * mIn._11) + (this.myMatrix._12 * mIn._21) + (this.myMatrix._13 * mIn._31);
        mat_temp._12 = (this.myMatrix._11 * mIn._12) + (this.myMatrix._12 * mIn._22) + (this.myMatrix._13 * mIn._32);
        mat_temp._13 = (this.myMatrix._11 * mIn._13) + (this.myMatrix._12 * mIn._23) + (this.myMatrix._13 * mIn._33);

        // Second
        mat_temp._21 = (this.myMatrix._21 * mIn._11) + (this.myMatrix._22 * mIn._21) + (this.myMatrix._23 * mIn._31);
        mat_temp._22 = (this.myMatrix._21 * mIn._12) + (this.myMatrix._22 * mIn._22) + (this.myMatrix._23 * mIn._32);
        mat_temp._23 = (this.myMatrix._21 * mIn._13) + (this.myMatrix._22 * mIn._23) + (this.myMatrix._23 * mIn._33);

        // Third
        mat_temp._31 = (this.myMatrix._31 * mIn._11) + (this.myMatrix._32 * mIn._21) + (this.myMatrix._33 * mIn._31);
        mat_temp._32 = (this.myMatrix._31 * mIn._12) + (this.myMatrix._32 * mIn._22) + (this.myMatrix._33 * mIn._32);
        mat_temp._33 = (this.myMatrix._31 * mIn._13) + (this.myMatrix._32 * mIn._23) + (this.myMatrix._33 * mIn._33);

        this.myMatrix = mat_temp;
    }
    
    /*--------------------------------------------------------------------\
    | - Transformations
    \--------------------------------------------------------------------*/
    
    // Applies a 2D transformation matrix to a vector of Vector2Ds
    transformVector2Ds(vPoint) {
        for (var i = 0; i < vPoint.length; i++) {
            var tempX = (this.myMatrix._11 * vPoint[i].x) + (this.myMatrix._21 * vPoint[i].y) + (this.myMatrix._31);
            var tempY = (this.myMatrix._12 * vPoint[i].x) + (this.myMatrix._22 * vPoint[i].y) + (this.myMatrix._32);
            
            vPoint[i].x = tempX;
            vPoint[i].y = tempY;
        }
    }
    
    // Applies a 2D transformation matrix to a single Vector2D
    transformVector2D(vPoint) {
        var tempX = (this.myMatrix._11 * vPoint.x) + (this.myMatrix._21 * vPoint.y) + (this.myMatrix._31);
        var tempY = (this.myMatrix._12 * vPoint.x) + (this.myMatrix._22 * vPoint.y) + (this.myMatrix._32);

        vPoint.x = tempX;
        vPoint.y = tempY;
    }
    
    // Create a transformation matrix
    translate(x, y) {
        var mat = new matrix();
        
        mat._11 = 1; mat._12 = 0; mat._13 = 0;
        mat._21 = 0; mat._22 = 1; mat._23 = 0;
        mat._31 = x; mat._32 = y; mat._33 = 1;
        
        // Multiply
        this.matrixMultiply(mat);
    }
    
    // Create a scale matrix
    scale(xScale, yScale) {
        var mat = new matrix();
        
        mat._11 = xScale; mat._12 =      0; mat._13 = 0;
        mat._21 =      0; mat._22 = yScale; mat._23 = 0;
        mat._31 =      0; mat._32 =      0; mat._33 = 1;
        
        // Multiply
        this.matrixMultiply(mat);
    }
    
    // Create a rotation matrix
    rotate(rot) {
        var mat = new matrix();
        
        var Sin = Math.sin(rot);
        var Cos = Math.cos(rot);
        
        mat._11 =  Cos; mat._12 = Sin; mat._13 = 0;
        mat._21 = -Sin; mat._22 = Cos; mat._23 = 0;
        mat._31 =    0; mat._32 =   0; mat._33 = 1;
        
        // Multiply
        this.matrixMultiply(mat);
    }
    
    // Create a rotation matrix from a 2D vector
    vecRotate(fwd, side) {
        var mat = new matrix();
        
        mat._11 =  fwd.x; mat._12 =  fwd.y; mat._13 = 0;
        mat._21 = side.x; mat._22 = side.y; mat._23 = 0;
        mat._31 =      0; mat._32 =      0; mat._33 = 1;
        
        // Multiply
        this.matrixMultiply(mat);
    }
    
    /*--------------------------------------------------------------------\
    | - Accessors and Mutators
    \--------------------------------------------------------------------*/
    
    // Accessors to matrix elements
    _11(val) { this.myMatrix._11 = val; }
	_12(val) { this.myMatrix._12 = val; }
	_13(val) { this.myMatrix._13 = val; }

	_21(val) { this.myMatrix._21 = val; }
	_22(val) { this.myMatrix._22 = val; }
	_23(val) { this.myMatrix._23 = val; }

	_31(val) { this.myMatrix._31 = val; }
	_32(val) { this.myMatrix._32 = val; }
	_33(val) { this.myMatrix._33 = val; }
    
    // Returns a formatted string
    toStringF() {
        return `[${this.myMatrix._11.toFixed(2)}, ${this.myMatrix._12.toFixed(2)}, ${this.myMatrix._13.toFixed(2)}]\n[${this.myMatrix._21.toFixed(2)}, ${this.myMatrix._22.toFixed(2)}, ${this.myMatrix._23.toFixed(2)}]\n[${this.myMatrix._31.toFixed(2)}, ${this.myMatrix._32.toFixed(2)}, ${this.myMatrix._33.toFixed(2)}]`;
    }
}