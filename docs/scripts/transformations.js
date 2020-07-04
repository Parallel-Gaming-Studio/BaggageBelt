// JavaScript Document

/*---------------------Transformations--------------------------------\
| - Functions for converting 2D vectors between World and Local space
\--------------------------------------------------------------------*/

/*---------------------WorldTransform---------------------------------\
| - Given a std::vector of 2D vectors, a position, orientation, and
|   scale, transform the 2D vectors into the object's world space
\--------------------------------------------------------------------*/
function worldTransform(points, pos, forward, side, scale) {
    // Copy the original vertices into the buffer about to be transformed
    var transformVector2Ds = points;
    
    // Create a transformation matrix
    var matTransform = new c2DMatrix();
    
    // Adjust the transform's scale, if it's provided
    if (typeof scale !== "undefined") {
        if ( (scale.x != 1.0) || (scale.y != 1.0) ) {
            matTransform.scale(scale.x, scale.y);
        }
    }
    
    // Rotate
    matTransform.rotate(forward, side);
    
    // Translate
    matTransform.translate(pos.x, pos.y);
    
    // Transform the object's vertices
    matTransform.transformVector2Ds(transformVector2Ds);
    
    return transformVector2Ds;
}

/*---------------------PointToWorldSpace------------------------------\
| - Transform a point from the entity's local space into world space
\--------------------------------------------------------------------*/
function pointToWorldSpace(point, heading, side, position) {
    // Make a copy of the point
    var transformPoint = point;
    
    // Create a transformation matrix
    var matTransform = new c2DMatrix();
    
    // Rotate
    matTransform.rotate(heading, side);
    
    // Translate
    matTransform.translate(position.x, position.y);
    
    // Transform the vertices
    matTransform.transformVector2Ds(transformPoint);
    
    return transformPoint;
}

/*---------------------VectorToWorldSpace-----------------------------\
| - Transform a vector from the entity's local space into world space
\--------------------------------------------------------------------*/
function vectorToWorldSpace(vec, heading, side) {
    // Make a copy of the vector
    var transformVector = vec;
    
    // Create a transformation matrix
    var matTransform = new c2DMatrix();
    
    // Rotate
    matTransform.rotate(heading, side);
    
    // Transform the vertices
    matTransform.transformVector2Ds(transformVector);
    
    return transformVector;
}

/*---------------------PointToLocalSpace------------------------------\
| - Convert the point from world space into local space for the agent
\--------------------------------------------------------------------*/
function pointToLocalSpace(point, heading, side, position) {
    // Make a copy of the point
    var transformPoint = point;
    
    // Create a transformation matrix
    var matTransform = new c2DMatrix();
    
    var tX = -position.dot(heading);
    var tY = -position.dot(side);
    
    // Create the transformation matrix
    matTransform._11(heading.x); matTransform._12(side.x);
    matTransform._21(heading.y); matTransform._22(side.y);
    matTransform._31(tX);        matTransform._32(tY);
    
    // Transform the vertices
    matTransform.transformVector2Ds(transformPoint);
    
    return transformPoint;
}

/*---------------------VectorToLocalSpace-----------------------------\
| - Convert the vector from world space into local space for the agent
\--------------------------------------------------------------------*/
function vectorToLocalSpace(vec, heading, side) {
    // Make a copy of the point
    var transformVector = vec;
    
    // Create a transformation matrix
    var matTransform = new c2DMatrix();
    
    // Create the transformation matrix
    matTransform._11(heading.x); matTransform._12(side.x);
    matTransform._21(heading.y); matTransform._22(side.y);
    
    // Transform the vertices
    matTransform.transformVector2Ds(transformVector);
    
    return transformVector;
}

/*---------------------Vec2DRotateAroundOrigin------------------------\
| - Rotate a vector ang rads around the origin
\--------------------------------------------------------------------*/
function vec2DRotateAroundOrigin(v, ang) {
    // Create a transformation matrix
    var mat = new c2DMatrix();
    
    // Rotate
    mat.rotate(ang);
    
    // Transform the object's vertices
    mat.transformVector2Ds(v);
}

/*---------------------CreateFeelers----------------------------------\
| - Given an origin, facing direction, FOV describing the limit of the
|   outer feelers, a feeler length, and the number of feelers
| - Returns a vector containing the end positions of a series of
|   feelers radiating away from the origin and with equal distance
|   between them
\--------------------------------------------------------------------*/
function createFeelers(numFeelers, feelerLength, fov, facing, origin) {
    // Magnitude of the angle separating each feeler
    var sectorsize = fov / (numFeelers - 1);
    
    // Create an array of feelers
    var feelers = [];
    
    // Create a temp vector
    var temp = new Vector2D();
    
    var angle = -fov * 0.5;
    
    for (var i = 0; i < numFeelers; ++i) {
        // Create the feeler extending outwards at this angle
        temp = facing;
        vec2DRotateAroundOrigin(temp, angle);
        feelers.unshift(origin + feelerLength * temp);
        
        angle += sectorsize;
    }
    
    return feelers;
}