// JavaScript Document

/*---------------------Geometry---------------------------------------\
| - Define useful 2D geometry functions
\--------------------------------------------------------------------*/

/*---------------------distanceToRayPlaneIntersection-----------------\
| - Given a plane and a ray, determine how far along the ray an
|   intersection occurs.
| - Returns negative if the ray is parallel
| - arg types: Vector2D | Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
function distanceToRayPlaneIntersection(rayOrigin, rayHeading, planePoint, planeNormal) {
	var d = -planeNormal.dot(planePoint);
	var numer = planeNormal.dot(rayOrigin) + d;
	var denom = planeNormal.dot(rayHeading);
	
	// Normal is parallel to the vector
	if ((denom < 0.000001) && (denom > -0.000001)) {
		return (-1.0);
	}
	
	return -(numer/denom);
}

/*---------------------whereIsPoint-----------------------------------\
| - Returns the location of a point in relation to the plane
| - arg types: Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
const spanTypeEnum = Object.freeze({
	"planeBackside":"planeBackside",
	"planeFront":"planeFront",
	"onPlane":"onPlane"
});

function whereIsPoint(point, pointOnPlane, planeNormal) {
	var dir = pointOnPlane - point;
	var d = dir.dot(planeNormal);
	if (d < - 0.000001) {
		return spanTypeEnum.planeFront;
	} else if (d > 0.000001) {
		return spanTypeEnum.planeBackside;
	}
	return spanTypeEnum.onPlane;
}

/*---------------------getRayCircleIntersect--------------------------\
| - Get the point at which a ray intersects a circle
| - arg types: Vector2D | Vector2D | Vector2D | double
\--------------------------------------------------------------------*/
function getRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius) {
	var toCircle = circleOrigin.subtract(rayOrigin);
	var length = toCircle.length();
	var v = toCircle.dot(rayHeading);
	var d = radius * radius - (length * length - v * v);
	
	// If there isn't an intersection, return -1
	if (d < 0.0) return (-1.0);
	
	// Return the distance to the [first] intersecting point
	return (v - Math.sqrt(d));
}

/*---------------------doRayCircleIntersect---------------------------\
| - Determines if a ray and circle intersect
| - arg types: Vector2D | Vector2D | Vector2D | double
\--------------------------------------------------------------------*/
function doRayCircleIntersect(rayOrigin, rayHeading, circleOrigin, radius) {
   var toCircle = circleOrigin.subtract(rayOrigin);
   var length = toCircle.length();
   var v = toCircle.dot(rayHeading);
   var d = radius * radius - (length*length - v*v);

   // If there was no intersection, return -1
   return (d < 0.0);
}

/*---------------------getTangentPoints-------------------------------\
| - Given a point P and a circle of radius R centered at C, determine
|   the two points on the circle that intersect with the tangents from
|   P to the circle.
| - Return false if P is within the circle
| - arg types: Vector2D | double | Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
function getTangentPoints(C, R, P, T1, T2)
{
	var PmC = P.subtract(C);
	var SqrLen = PmC.lengthSq();
	var RSqr = R * R;
	if ( SqrLen <= RSqr ) {
	  // P is inside or on the circle
	  return false;
	}

	var InvSqrLen = 1/SqrLen;
	var Root = Math.sqrt(Math.abs(SqrLen - RSqr));

	T1.x = C.x + R*(R*PmC.x - PmC.y*Root)*InvSqrLen;
	T1.y = C.y + R*(R*PmC.y + PmC.x*Root)*InvSqrLen;
	T2.x = C.x + R*(R*PmC.x + PmC.y*Root)*InvSqrLen;
	T2.y = C.y + R*(R*PmC.y - PmC.x*Root)*InvSqrLen;

	return true;
}

/*---------------------distToLineSegment------------------------------\
| - Given a line segment AB and point P, calculate the perpendicular
|   distance between them
| - arg types: Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
function distToLineSegment(A, B, P) {
	// If the angle between PA and AB is obtuse then the closest vertex must be A
	var dotA = (P.x - A.x)*(B.x - A.x) + (P.y - A.y)*(B.y - A.y);

	if (dotA <= 0) return vec2DDistance(A, P);

	// If the angle between PB and AB is obtuse then the closest vertex must be B
	var dotB = (P.x - B.x)*(A.x - B.x) + (P.y - B.y)*(A.y - B.y);

	if (dotB <= 0) return vec2DDistance(B, P);

	// Calculate the point along AB that is the closest to P
	// var Point = A + ((B - A) * dotA)/(dotA + dotB);
	var Point = vecAdd(A, vecDivide(vecMultiply(vecSubtract(B, A), dotA), (dotA + dotB)));

	// Calculate the distance P-Point
	return vec2DDistance(P,Point);
}

/*---------------------distToLineSegmentSq----------------------------\
| - Same as DistToLineSegment, but avoids using sqrt
| - arg types: Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
function distToLineSegmentSq(A, B, P) {
	// If the angle between PA and AB is obtuse then the closest
	// vertex must be A
	var dotA = (P.x - A.x)*(B.x - A.x) + (P.y - A.y)*(B.y - A.y);

	if (dotA <= 0) return vec2DDistanceSq(A, P);

	// If the angle is obtuse between PB and AB is obtuse then the closest
	// vertex must be B
	var dotB = (P.x - B.x)*(A.x - B.x) + (P.y - B.y)*(A.y - B.y);

	if (dotB <= 0) return vec2DDistanceSq(B, P);

	// Calculate the point along AB that is the closest to P
	// var Point = A + ((B - A) * dotA)/(dotA + dotB);
	var Point = vecAdd(A, vecDivide(vecMultiply(vecSubtract(B, A), dotA), (dotA + dotB)));

	// Calculate the distance P-Point
	return vec2DDistanceSq(P,Point);
}

/*---------------------lineIntersection2D-----------------------------\
| - Given 2 lines in 2D space AB, CD will return true if they intersect
| - arg types: Vector2D | Vector2D | Vector2D | Vector2D
\--------------------------------------------------------------------*/
function lineIntersection2D(A, B, C, D) {
	var rTop = (A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y);
	var sTop = (A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y);
	var Bot = (B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);

	// Parallel
	if (Bot == 0) {
		return false;
	}

	var invBot = 1.0/Bot;
	var r = rTop * invBot;
	var s = sTop * invBot;

	if( (r > 0) && (r < 1) && (s > 0) && (s < 1) ) {
		// Lines intersect
		return true;
	}

	// Lines do not intersect
	return false;
}

/*---------------------lineIntersection2DDist-------------------------\
| - Given 2 lines in 2D space AB, CD will return true if they intersect
|   and set dist to the distance from the origin to the intersection
|   along AB
| - arg types: Vector2D | Vector2D | Vector2D | Vector2D | double
\--------------------------------------------------------------------*/
function lineIntersection2DDist(A, B, C, D, dist) {
	var rTop = (A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y);
	var sTop = (A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y);
	var Bot = (B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);

	// Parallel
	if (Bot == 0) {
		if (isEqual(rTop, 0) && isEqual(sTop, 0)) {
			return true;
		}
		return false;
	}

	var r = rTop/Bot;
	var s = sTop/Bot;

	if( (r > 0) && (r < 1) && (s > 0) && (s < 1) ) {
		dist = vec2DDistance(A,B) * r;
		return true;
	} else {
		dist = 0;
		return false;
	}
}

/*---------------------lineIntersection2DDistPoint--------------------\
| - Given 2 lines in 2D space AB, CD will return true if they intersect
|   and set dist to the distance from the origin to the intersection
|   along AB and set the 2D vector point to the POI
| - arg types: Vector2D | Vector2D | Vector2D | Vector2d | double | Vector2D
\--------------------------------------------------------------------*/
function lineIntersection2DDistPoint(A, B, C, D, dist, point) {
	var rTop = (A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y);
	var rBot = (B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);

	var sTop = (A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y);
	var sBot = (B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);

	if ( (rBot == 0) || (sBot == 0)) {
		// Lines are parallel
		return false;
	}

	var r = rTop/rBot;
	var s = sTop/sBot;

	if( (r > 0) && (r < 1) && (s > 0) && (s < 1) )
	{
		dist = vec2DDistance(A,B) * r;
		// point = A + r * (B - A);
		point = vecAdd(A, vecMultiply(vecSubtract(B, A), r));
		return true;
	} else {
		dist = 0;
		return false;
	}
}

/*---------------------objectIntersection2D---------------------------\
| - Test for the overlap of two objects, but not enclosure
| - arg types: Vector2D Array | Vector2D Array
\--------------------------------------------------------------------*/
function objectIntersection2D(object1, object2) {
	// Test each line segment of object1 against each segment of object2
	for (var r=0; r<object1.size()-1; ++r) {
		for (var t=0; t<object2.size()-1; ++t) {
			if (lineIntersection2D(object2[t], object2[t+1], object1[r], object1[r+1])) {
				return true;
			}
		}
	}

	return false;
}

/*---------------------segmentIntersection2D--------------------------\
| - Test a line segment against a polygon's sides for intersection
| - arg types: Vector2D | Vector2D | Vector2D Array
\--------------------------------------------------------------------*/
function segmentObjectIntersection2D(A, B, object) {
	// Test AB against each segment of object
	for (var r=0; r<object.size()-1; ++r) {
		if (lineIntersection2D(A, B, object[r], object[r+1])) {
			return true;
		}
	}

	return false;
}

/*---------------------twoCirclesOverlapped---------------------------\
| - Returns true if two circles overlap
| - arg types: double | double | double | double | double | double
\--------------------------------------------------------------------*/
function twoCirclesOverlapped(x1, y1, r1, x2, y2, r2) {
	var distBetweenCenters = Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));

	if ((distBetweenCenters < (r1+r2)) || (distBetweenCenters < Math.abs(r1-r2))) {
		return true;
	}

	return false;
}

/*---------------------twoCirclesOverlapped---------------------------\
| - Returns true if two circles overlap
| - arg types: Vector2D | double | Vector2D | double
\--------------------------------------------------------------------*/
function twoCirclesOverlappedVec(c1, r1, c2, r2) {
	var distBetweenCenters = Math.sqrt( (c1.x-c2.x) * (c1.x-c2.x) + (c1.y-c2.y) * (c1.y-c2.y));

	if ((distBetweenCenters < (r1+r2)) || (distBetweenCenters < Math.abs(r1-r2)))
	{
		return true;
	}

	return false;
}

/*---------------------twoCirclesEnclosed-----------------------------\
| - Returns true if one circle encloses another
| - arg types: double | double | double | double | double | double
\--------------------------------------------------------------------*/
function twoCirclesEnclosed(x1, y1, r1, x2, y2, r2) {
	var distBetweenCenters = Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));

	if (distBetweenCenters < Math.abs(r1-r2))
	{
		return true;
	}

	return false;
}

/*---------------------twoCirclesIntersectionPoints-------------------\
| - Given two circles, calculate the intersection points of any overlap
| - Returns false if no overlaps are found
| - http://astronomy.swin.edu.au/~pbourke/geometry/2circle/
| - arg types: double | double | double | double | double | double | double | double | double | double
\--------------------------------------------------------------------*/
function twoCirclesIntersectionPoints(x1, y1, r1, x2, y2, r2, p3X, p3Y, p4X, p4Y) {
	// First check to see if they overlap
	if (!twoCirclesOverlapped(x1,y1,r1,x2,y2,r2))
	{
		return false;
	}

	// Calculate the distance between the circle centers
	var d = Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));

	// Now calculate the distance from the center of each circle to the center
	// of the line which connects the intersection points.
	var a = (r1 - r2 + (d * d)) / (2 * d);
	var b = (r2 - r1 + (d * d)) / (2 * d);

	// Calculate the point P2 which is the center of the line which 
	// connects the intersection points
	var p2X, p2Y;

	p2X = x1 + a * (x2 - x1) / d;
	p2Y = y1 + a * (y2 - y1) / d;

	// Calculate first point
	var h1 = Math.sqrt((r1 * r1) - (a * a));

	p3X = p2X - h1 * (y2 - y1) / d;
	p3Y = p2Y + h1 * (x2 - x1) / d;

	// Calculate second point
	var h2 = Math.sqrt((r2 * r2) - (a * a));

	p4X = p2X + h2 * (y2 - y1) / d;
	p4Y = p2Y - h2 * (x2 - x1) / d;

	return true;
}

/*---------------------twoCirclesIntersectionArea---------------------\
| - Tests whether or not two circles intersect
|  - (T) Calculates the area of the union between the circles
| - http://mathforum.org/library/drmath/view/54785.html
| - arg types: double | double | double | double | double | double
\--------------------------------------------------------------------*/
function twoCirclesIntersectionArea(x1, y1, r1, x2, y2, r2) {
	// First calculate the intersection points
	var iX1, iY1, iX2, iY2;

	if(!twoCirclesIntersectionPoints(x1,y1,r1,x2,y2,r2,iX1,iY1,iX2,iY2))
	{
		return 0.0; // No overlap
	}

	// Calculate the distance between the circle centers
	var d = Math.sqrt( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));

	// Find the angles given that A and B are the two circle centers
	// and C and D are the intersection points
	var CBD = 2 * Math.acos((r2*r2 + d*d - r1*r1) / (r2 * d * 2)); 

	var CAD = 2 * Math.acos((r1*r1 + d*d - r2*r2) / (r1 * d * 2));

	// Then we find the segment of each of the circles cut off by the 
	// chord CD, by taking the area of the sector of the circle BCD and
	// subtracting the area of triangle BCD. Similarly we find the area
	// of the sector ACD and subtract the area of triangle ACD.
	var area = 0.5*CBD*r2*r2 - 0.5*r2*r2*Math.sin(CBD) + 0.5*CAD*r1*r1 - 0.5*r1*r1*Math.sin(CAD);

	return area;
}

/*---------------------circleArea-------------------------------------\
| - Given a radius, find the area of a circle
| - arg types: double
\--------------------------------------------------------------------*/
function circleArea(radius)
{
	return Pi * radius * radius;
}

/*---------------------pointInCircle----------------------------------\
| - Returns true if the point p is within the radius of a circle
| - arg types: Vector2D | double | Vector2D
\--------------------------------------------------------------------*/
function pointInCircle(Pos, radius, p) {
	var distFromCenterSquared = (p-Pos).lengthSq();

	if (distFromCenterSquared < (radius*radius)) {
		return true;
	}

	return false;
}

/*---------------------lineSegmentCircleIntersection------------------\
| - Returns true if the line segment AB intersects with a circle at
|   position P with radius radius
| - arg types: Vector2D | Vector2D | Vector2D | double
\--------------------------------------------------------------------*/
function lineSegmentCircleIntersection(A, B, P, radius) {
	// First determine the distance from the center of the circle to
	// the line segment (working in distance squared space)
	var distToLineSq = distToLineSegmentSq(A, B, P);

	if (distToLineSq < radius*radius) {
		return true;
	} else {
		return false;
	}
}

/*---------------------getLineSegmentCircleClosestIntersectionPoint---\
| - Given a line segment AB and a circle position and radius, find the
|   intersection and store the position of the closest intersection
|   in the reference IntersectPoint
| - Returns false if no intersection is found
| - arg types: Vector2D | Vector2D | Vector2D | double | Vector2D
\--------------------------------------------------------------------*/
function getLineSegmentCircleClosestIntersectionPoint(A, B, pos, radius, IntersectionPoint) {
	var toBNorm = vec2DNormalize(B.subtract(A));

	// Move the circle into the local space defined by the vector B-A with origin
	// at A
	var LocalPos = pointToLocalSpace(pos, toBNorm, toBNorm.perp(), A);

	var ipFound = false;

	// If the local position + the radius is negative then the circle lays behind
	// point A so there is no intersection possible. If the local x pos minus the 
	// radius is greater than length A-B then the circle cannot intersect the 
	// line segment
	if ( (LocalPos.x+radius >= 0) && ( (LocalPos.x-radius)*(LocalPos.x-radius) <= vec2DDistanceSq(B, A)) ) {
		// If the distance from the x axis to the object's position is less
		// than its radius then there is a potential intersection.
		if (Math.abs(LocalPos.y) < radius) {
			// Now to do a line/circle intersection test. The center of the 
			// circle is represented by A, B. The intersection points are 
			// given by the formulae x = A +/-sqrt(r^2-B^2), y=0. We only 
			// need to look at the smallest positive value of x.
			var a = LocalPos.x;
			var b = LocalPos.y;       

			var ip = a - Math.sqrt(radius*radius - b*b);

			if (ip <= 0) {
				ip = a + Math.sqrt(radius*radius - b*b);
			}

			ipFound = true;

			IntersectionPoint = A+ toBNorm*ip;
		}
	}

	return ipFound;
}