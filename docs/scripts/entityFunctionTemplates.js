// JavaScript Document

/*---------------------EntityFunctionTemplates------------------------\
| - Useful template functions
\--------------------------------------------------------------------*/

/*---------------------overlapped-------------------------------------\
| - Tests to see if an entity is overlapping any number of other
|   entities stored in a container
| - arg types: template | template | double
\--------------------------------------------------------------------*/
function overlapped(ob, conOb, MinDistBetweenObstacles = 40.0) {
	var it;

	for (it = conOb[0]; it != conOb[conOb.size()-1]; ++it)
	{
		if (twoCirclesOverlapped(ob.pos(), (ob.bRadius() + MinDistBetweenObstacles), it.pos(), it.bRadius())) {
			return true;
		}
	}

	return false;
}

/*---------------------tagNeighbors-----------------------------------\
| - Tags any entities contained in a std container that are within the
|   radius of the single entity parameter
| - arg types: entity | template | double
\--------------------------------------------------------------------*/
function tagNeighbors(entity, others, radius) {
	var it;

	// Iterate through all entities checking for range
	for (it = others[0]; it != others[others.size()-1]; ++it) {
		// First clear any current tag
		it.unTag();

		// Work in distance squared to avoid sqrts
		// Vector2D to = (*it)->Pos() - entity->Pos();
		var to = vectorSubtract(it.pos(), entity.pos());

		// The bounding radius of the other is taken into account by adding it 
		// to the range
		// double range = radius + (*it)->BRadius();
		var range = radius + it.bRadius();

		// If entity within range, tag for further consideration
		/*if (((*it) != entity) && (to.LengthSq() < range * range))
		{
			(*it)->Tag();
		}*/
		if ((it != entity) && (to.LengthSq() < range * range)) {
			it.Tag();
		}

	} // Next entity
}

/*---------------------enforceNonPenetrationConstraint----------------\
| - Given a pointer to an entity and a std container of pointers to
|   nearby entities, check to see if there is any overlap between
|   entities.  If an overlap exists, move the entities away from each
|   other.
| - arg types: entity | template
\--------------------------------------------------------------------*/
function enforceNonPenetrationContraint(entity, others) {
	var it;

	// Iterate through all entities checking for any overlap of bounding radii
	for (it = others[0]; it != others[others.size()-1]; ++it) {
		// Make sure we don't check against this entity
		if (it == entity) continue;

		// Calculate the distance between the positions of the entities
		// Vector2D ToEntity = entity->Pos() - (*it)->Pos();
		var toEntity = vecSubtract(entity.pos(), it.pos());

		var DistFromEachOther = toEntity.length();

		// If this distance is smaller than the sum of their radii then this
		// entity must be moved away in the direction parallel to the
		// tToEntity vector
		// double AmountOfOverLap = (*it)->BRadius() + entity->BRadius() -	DistFromEachOther;
		var AmountOfOverLap = it.bRadius() + entity.bRadius() - DistFromEachOther;

		if (AmountOfOverLap >= 0)
		{
			// Move the entity a distance away equivalent to the amount of overlap.
			// entity->SetPos(entity->Pos() + (ToEntity / DistFromEachOther) *	AmountOfOverLap);
			entity.setPos(vecAdd(entity.pos(), vecMultiply(vecDivide(ToEntity, DistFromEachOther), AmountOfOverLap)));
		}
	} // Next entity
}