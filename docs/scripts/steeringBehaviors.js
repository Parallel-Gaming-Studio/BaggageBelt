// JavaScript Document

/*---------------------steeringBehavior-------------------------------\
| - Class to encapsulate steering behaviors for an entity
\--------------------------------------------------------------------*/

/*---------------------Enumerators------------------------------------\
| - Define the necessary enumerators
\--------------------------------------------------------------------*/

const summingMethodEnum = Object.freeze({
    "weighted_average": "weighted_average",
    "prioritized": "prioritized",
    "dithered": "dithered"
});

const behaviorTypeEnum = Object.freeze({
    "none": 0x00000,
    "seek": 0x00002,
    "arrive": 0x00008,
    "wander": 0x00010,
    "separation": 0x00040,
    "wall_avoidance": 0x00200
});

const decelerationEnum = Object.freeze({
    "slow": 3,
    "normal": 2,
    "fast": 1
});

class steeringBehavior {
    constructor(shape) {
        if (typeof shape !== "undefined") {
            this.shape = shape;
        } else {
            console.log("<SteeringBehavior:Constructor> Shape is null.");
            return null;
        }

        // The steering force created by the combined effect of all the selected behaviors (Vector2D)
        this.steeringForce = new Vector2D();

        // The current target (Vector2D)
        this.target = new Vector2D();

        // (Binary) flag to indicate whether or not a behavior should be active - start with none:0
        this.flags = 0;

        // Define the separation weight
        this.weightSeparation = 0.0;

        // Define the wander weight
        this.weightWander = 0.0;

        // Define the wall avoidance weight
        this.weightWallAvoidance = 0.0;

        // Define the view distance
        this.viewDistance = 10.0;

        // Define wall detection feeler length
        this.wallDetectionFeelerLength = 4.0;

        // Define the number of feelers to use
        this.feelers = 3;

        // Define the deceleration rate category
        this.deceleration = decelerationEnum.normal;

        // Define two target shapes as null
        this.targetShape1 = null;
        this.targetShape2 = null;

        // Define the wander distance
        this.wanderDistance = 2.0;

        // Define the wander jitter
        this.wanderJitter = 40.0;

        // Define the wander radius
        this.wanderRadius = 1.19999999956;

        // Define the seek weight
        this.weightSeek = 1.0;

        // Define the arrive weight
        this.weightArrive = 2.0;

        // Define the summing method
        this.summingMethod = summingMethodEnum.prioritized;

        // Azimuth for wander behavior
        this.theta = randFloat() * TwoPi;

        // Create a vector to a target position on the wander circle
        this.wanderTarget = new Vector2D(this.wanderRadius * Math.cos(this.theta), this.wanderRadius * Math.sin(this.theta));
    }

    /*---------------------flagOn-----------------------------------------\
    | - Tests if a specific bit of this.flag is set
    \--------------------------------------------------------------------*/
    flagOn(bt) {
        return (this.flags & bt) == bt;
    }

    /*---------------------Calculate Methods------------------------------\
    \--------------------------------------------------------------------*/

    /*---------------------calculate--------------------------------------\
    | - Calculates the accumulated steering force according to the method
    |   set in summingMethod
    \--------------------------------------------------------------------*/
    calculate() {
        // Reset the steering force
        this.steeringForce.zero();

        // Tag neighbors if any of the following 3 group behaviors are switched on
        if (this.flagOn(behaviorTypeEnum.separation)) {
            game.tagShapesWithinViewRange(this.shape, this.viewDistance);
        }

        this.steeringForce = this.calculatePrioritized();
		
		// console.log(`<SteeringBehavior>[Calculate] Steering Force: ${this.steeringForce}`);

        return this.steeringForce;
    }

    /*---------------------forwardComponent-------------------------------\
    | - Returns the forward component of the steering force
    \--------------------------------------------------------------------*/
    forwardComponent() {
        return this.shape.getHeading().dot(this.steeringForce);
    }

    /*---------------------sideComponent----------------------------------\
    | - Returns the side component of the steering force
    \--------------------------------------------------------------------*/
    sideComponent() {
        return this.shape.getSide().dot(this.steeringForce);
    }

    /*---------------------accumulateForce--------------------------------\
    | - This function calculates how much of its max steering force the
    |   entity has left to apply and then applies that amount of the force
    |   to add.
    | - arg types: Vector2D | Vector2D
    \--------------------------------------------------------------------*/
    accumulateForce(RunningTot, ForceToAdd) {
        // Calculate how much steering force the vehicle has used so far
        var MagnitudeSoFar = RunningTot.length();
		// console.log(`<Steering>[AccumulateForce] MagnitudeSoFar: ${MagnitudeSoFar}`);
		
        // Calculate how much steering force remains to be used by this vehicle
        // double MagnitudeRemaining = m_pLH_Bot->MaxForce() - MagnitudeSoFar;
        var MagnitudeRemaining = this.shape.getMaxForce() - MagnitudeSoFar;
		//console.log(`<Steering>[AccumulateForce] MagnitudeRemaining: ${MagnitudeRemaining}`);
        
		// Return false if there is no more force left to use
        if (MagnitudeRemaining <= 0.0) return false;

        // Calculate the magnitude of the force we want to add
        // double MagnitudeToAdd = ForceToAdd.Length();
        // console.log(`<Steering>[AccumulateForce] ForceToAdd: ${ForceToAdd}`);
        var MagnitudeToAdd = ForceToAdd.length();
		//console.log(`<Steering>[AccumulateForce] MagnitudeToAdd: ${MagnitudeToAdd}`);

        // If the magnitude of the sum of ForceToAdd and the running total
        // does not exceed the maximum force available to this vehicle, just
        // add together. Otherwise add as much of the ForceToAdd vector is
        // possible without going over the max.
        if (MagnitudeToAdd < MagnitudeRemaining) {
            // RunningTot += ForceToAdd;
            RunningTot = vecAdd(RunningTot, ForceToAdd);
        } else {
            MagnitudeToAdd = MagnitudeRemaining;

            // Add it to the steering force
            // RunningTot += (Vec2DNormalize(ForceToAdd) * MagnitudeToAdd);
            RunningTot = vecAdd(RunningTot, vecMultiply(vec2DNormalize(ForceToAdd), MagnitudeToAdd));
        }

		//console.log(`<Steering>[AccumulateForce:Return] MagnitudeToAdd: ${MagnitudeToAdd} | RunningTot: ${RunningTot}`);
        return RunningTot;
    }

    /*---------------------calculatePrioritized---------------------------\
    | - This method calls each active steering behavior in order of
    |   priority and accumulates their forces until the max steering force
    |   magnitued is reached, at which time the function returns the
    |   steering force accumulated to that point.
    \--------------------------------------------------------------------*/
    calculatePrioritized() {
        // Vector2D force;
        var force = new Vector2D();

        if (this.flagOn(behaviorTypeEnum.wall_avoidance)) {
            force = this.wallAvoidance(game.walls.getWalls()) * this.weightWallAvoidance;
            if (!this.accumulateForce(this.steeringForce, force)) return this.steeringForce;
        }

        // These next three can be combined for flocking behavior (wander is
        // also a good behavior to add into this mix)
        if (this.flagOn(behaviorTypeEnum.separation)) {
            force = this.separation(game.shapes) * this.weightSeparation;
            if (!this.accumulateForce(this.steeringForce, force)) return this.steeringForce
        }

		if (this.flagOn(behaviorTypeEnum.seek)) {
            // console.log(`<Steering>[CalculatePrioritized] Seek: ${this.seek(this.target)}`);
            force = vecMultiply(this.seek(this.target), this.weightSeek);
            
            /*if (!this.accumulateForce(this.steeringForce, force)) {
                console.log(`<SteeringBehavior>[CalculatePrioritized] Steering Force: ${this.steeringForce}`);
                return this.steeringForce;
            }*/
			this.steeringForce = this.accumulateForce(this.steeringForce, force);
			// console.log(`<Steering>[CalculatePrioritized:Seek] SteeringForce: ${this.steeringForce} | Force: ${force}`);
			// return this.steeringForce;
        }
		
		if (this.flagOn(behaviorTypeEnum.arrive)) {
			force = vecMultiply(this.arrive(this.target, this.deceleration), this.weightArrive);
			
			// console.log(`<Steering>[CalculatePrioritized:Arrive] SteeringForce: ${this.steeringForce} | Force: ${force.isZero()} ${force}`);
            if (!this.accumulateForce(this.steeringForce, force) || force.equalTo(new Vector2D())) return this.steeringForce;
        }

        if (this.flagOn(behaviorTypeEnum.wander)) {
            force = this.wander() * this.wanderWeight;
            if (!this.accumulateForce(this.steeringForce, force)) return this.steeringForce;
        }

        return this.steeringForce;
    }

    /*---------------------Start of Behaviors-----------------------------\
    \--------------------------------------------------------------------*/

    /*---------------------seek-------------------------------------------\
    | - Given a target, this behavior returns a steering force which will
    |   direct the agent towards the target.
    | - arg types: Vector2D
    \--------------------------------------------------------------------*/
    seek(target) {
		
		//if (!this.shape.rotateHeadingToFacePosition(target)) return this.shape.getVelocity();
		
        // Vector2D DesiredVelocity = Vec2DNormalize(target - m_pLH_Bot->Pos()) * m_pLH_Bot->MaxSpeed();
        var DesiredVelocity = vecMultiply(vec2DNormalize(vecSubtract(target, this.shape.pos())), this.shape.getMaxSpeed());
		
		// console.log(`<SteeringBehavior>[Seek] DesiredVelocity: ${DesiredVelocity} | ShapeVelocity: ${this.shape.getVelocity()}`);

        // return (DesiredVelocity - m_pLH_Bot->Velocity());
        return vecSubtract(DesiredVelocity, this.shape.getVelocity());
    }

    /*---------------------arrive-----------------------------------------\
    | - This behavior is similar to seek, but it attempts to arrive at the
    |   target with a zero velocity.
    | - arg types: Vector2D | decelerationEnum
    \--------------------------------------------------------------------*/
    arrive(target, deceleration) {
        // Vector2D ToTarget = target - m_pLH_Bot->Pos();
        var toTarget = vecSubtract(target, this.shape.pos());

        // Calculate the distance to the target
        // double dist = ToTarget.Length();
        var dist = toTarget.length();
		
		// console.log(`Distance: ${dist}`);

        if (dist > 0) {
            // Because Deceleration is enumerated as an int, this value is required
            // to provide fine tweaking of the deceleration..
            // const double DecelerationTweaker = 0.3;
            var DecelerationTweaker = 0.3;

            // Calculate the speed required to reach the target given the desired
            // deceleration
            // double speed = dist / ((double)deceleration * DecelerationTweaker);
            var speed = dist / (deceleration * DecelerationTweaker);

            // Make sure the velocity does not exceed the max
            // speed = MinOf(speed, m_pLH_Bot->MaxSpeed());
            speed = minimum(speed, this.shape.getMaxSpeed());

            // From here proceed just like seek except we don't need to normalize 
            // the toTarget vector because we have already gone to the trouble
            // of calculating its length: dist. 
            // Vector2D DesiredVelocity = ToTarget * speed / dist;
            var DesiredVelocity = vecMultiply(toTarget, (speed / dist));
			
			// console.log(`<SteeringBehavior>[Arrive] DesiredVelocity: ${DesiredVelocity}`);

            // return (DesiredVelocity - m_pLH_Bot->Velocity());
            return vecSubtract(DesiredVelocity, this.shape.getVelocity());
        }
		
		this.shape.setPos(target);

        var tempVec = new Vector2D();
        return tempVec;
    }

    /*---------------------wander-----------------------------------------\
    | - This behavior makes the entity wander about randomly
    \--------------------------------------------------------------------*/
    wander() {
        // First, add a small random vector to the target's position
        // m_vWanderTarget += Vector2D(RandomClamped() * m_dWanderJitter, RandomClamped() * m_dWanderJitter);
        var newWanderTarget = new Vector2D(randomClamped() * this.wanderJitter, randomClamped() * this.wanderJitter);
        this.wanderTarget = vecAdd(this.wanderTarget, newWanderTarget);

        // Reproject this new vector back on to a unit circle
        // m_vWanderTarget.Normalize();
        this.wanderTarget.normalize();

        // Increase the length of the vector to the same as the radius
        // of the wander circle
        // m_vWanderTarget *= m_dWanderRadius;
        this.wanderTarget = vecMultiply(this.wanderTarget, this.wanderRadius);

        // Move the target into a position WanderDist in front of the shape
        // Vector2D target = m_vWanderTarget + Vector2D(m_dWanderDistance, 0);
        var wanderDist = new Vector2D(this.wanderDistance, 0);
        var target = vecAdd(this.wanderTarget, wanderDist);

        // Project the target into world space
        // Vector2D Target = PointToWorldSpace(target,	m_pLH_Bot->Heading(), m_pLH_Bot->Side(), m_pLH_Bot->Pos());
        var newTarget = pointToWorldSpace(target, this.shape.getHeading(), this.shape.getSide(), this.shape.pos());

        // Steer towards it
        // return Target - m_pLH_Bot->Pos();
        return vecSubtract(newTarget, this.shape.pos());
    }

    /*---------------------wallAvoidance----------------------------------\
    | - This returns a steering force that will keep the agent away from
    |   any walls it may encounter.
    | - arg types: walls array
    \--------------------------------------------------------------------*/
    wallAvoidance(walls) {
        // The feelers are contained in an array this.feelers
        // CreateFeelers();
        this.createFeelers();

        /*double DistToThisIP = 0.0;
        double DistToClosestIP = MaxDouble;*/

        // This will hold an index into the vector of walls
        // int ClosestWall = -1;
        var ClosestWall = -1;

        /*Vector2D SteeringForce,
        	point,         // Used for storing temporary info
        	ClosestPoint;  // Holds the closest intersection point*/
        var SteeringForce = new Vector2D(); // Holds a local copy of the steering force
        var point = new Vector2D(); // Used for storing temporary info
        var ClosestPoint = new Vector2D(); // Holds the closest intersection point

        // Examine each feeler in turn
        for (var flr = 0; flr < this.feelers.size(); ++flr) {
            // Run through each wall checking for any intersection points
            for (var w = 0; w < walls.size(); ++w) {
                // TODO: Will need to add walls class if using this function
                if (lineIntersection2DDistPoint(this.shape.pos(), this.feelers[flr], walls[w].From(), walls[w].To(), DistToThisIP, point)) {
                    // Is this the closest found so far? If so keep a record
                    if (DistToThisIP < DistToClosestIP) {
                        DistToClosestIP = DistToThisIP;
                        ClosestWall = w;
                        ClosestPoint = point;
                    }
                }
            } // Next wall

            // If an intersection point has been detected, calculate a force  
            // that will direct the agent away
            if (ClosestWall >= 0) {
                // Calculate by what distance the projected position of the entity will overshoot the wall
                // Vector2D OverShoot = m_Feelers[flr] - ClosestPoint;
                var OverShoot = vecSubtract(this.feelers[flr], ClosestPoint);

                // Create a force in the direction of the wall normal, with a magnitude of the overshoot
                // SteeringForce = walls[ClosestWall]->Normal() * OverShoot.Length();
                SteeringForce = vecMultiply(walls[ClosestWall].Normal(), OverShoot.lenth());
            }
        } // Next feeler

        return SteeringForce;
    }

    /*---------------------createFeelers----------------------------------\
    | - Creates the antenna utilized by WallAvoidance.
    \--------------------------------------------------------------------*/
    createFeelers() {
        // Feeler pointing straight in front
        // m_Feelers[0] = m_pLH_Bot->Pos() + m_dWallDetectionFeelerLength * m_pLH_Bot->Heading() * m_pLH_Bot->Speed();
        this.feelers[0] = vecAdd(this.shape.pos(), vecMultiply(vecMultiply(this.shape.getHeading(), this.shape.getSpeed()), this.wallDetectionFeelerLength));

        var temp = new Vector2D();

        // Feeler to left
        // Vector2D temp = m_pLH_Bot->Heading();
        temp = this.shape.getHeading();
        // Vec2DRotateAroundOrigin(temp, HalfPi * 3.5);
        vec2DRotateAroundOrigin(temp, HalfPi * 3.5);
        // m_Feelers[1] = m_pLH_Bot->Pos() + m_dWallDetectionFeelerLength / 2.0 * temp;
        this.feelers[1] = vecAdd(this.shape.pos(), vecMultiply(temp, (this.wallDetectionFeelerLength / 2.0)));

        // Feeler to right
        // temp = m_pLH_Bot->Heading();
        temp = this.shape.getHeading();
        // Vec2DRotateAroundOrigin(temp, HalfPi * 0.5);
        vec2DRotateAroundOrigin(temp, HalfPi * 0.5);
        // m_Feelers[2] = m_pLH_Bot->Pos() + m_dWallDetectionFeelerLength / 2.0 * temp;
        this.feelers[2] = vecAdd(this.shape.pos(), vecMultiply(temp, (this.wallDetectionFeelerLength / 2.0)));
    }

    /*---------------------separation-------------------------------------\
    | - This calculates a force repelling from the other neighbors.
    | - arg types: Shapes List
    \--------------------------------------------------------------------*/
    separation(neighbors) {
        // Iterate through all the neighbors and calculate the vector from them
        // Vector2D SteeringForce;
        var SteeringForce = new Vector2D();

        for (var it = neighbors[0]; it < neighbors.length; ++it) {
            // Ensure this shape is not included in the calculations and that the shape being examined is close enough
            // *** Also ensure it does not include the evade target ***
            if ((neighbors[it] != this.shape) && (neighbors[it].isTagged()) && (neighbors[it] != this.targetShape1)) {
                var toAgent = new Vector2D();
                toAgent = vecSubtract(this.shape.pos(), neighbors[it].pos());
                // Scale the force inversely proportional to the shape's distance from its neighbor
                SteeringForce = vecAdd(SteeringForce, vecDivide(vec2DNormalize(toAgent), toAgent.length()));
            }
        }

        return SteeringForce;
    }

    /*--------------------------------------------------------------------\
    | - Accessors and Mutators
    \--------------------------------------------------------------------*/
    // Target
    getTarget() {
        return this.target;
    }
    setTarget(t) { // Vector2D
        this.target = t;
    }

    // Target Agents
    setTargetAgent1(agent) { // Shape
        this.targetShape1 = agent;
    }
    setTargetAgent2(agent) { // Shape
        this.targetShape2 = agent;
    }

    // Steering Force
    force() {
        return this.steeringForce;
    }

    // Summing method
    setSummingMethod(sm) {
        this.summingMethod = summingMethodEnum.sm;
    }

    // Behavior flags
    // - On
    seekOn() {
        this.flags |= behaviorTypeEnum.seek;
    }
    arriveOn() {
        this.flags |= behaviorTypeEnum.arrive;
    }
    wanderOn() {
        this.flags |= behaviorTypeEnum.wander;
    }
    separationOn() {
        this.flags |= behaviorTypeEnum.separation;
    }
    wallAvoidanceOn() {
        this.flags |= behaviorTypeEnum.wall_avoidance;
    }
    // - Off
    seekOff() {
        if (this.flagOn(behaviorTypeEnum.seek)) this.flags ^= behaviorTypeEnum.seek;
    }
    arriveOff() {
        if (this.flagOn(behaviorTypeEnum.arrive)) this.flags ^= behaviorTypeEnum.arrive;
    }
    wanderOff() {
        if (this.flagOn(behaviorTypeEnum.wander)) this.flags ^= behaviorTypeEnum.wander;
    }
    separationOff() {
        if (this.flagOn(behaviorTypeEnum.separation)) this.flags ^= behaviorTypeEnum.separation;
    }
    wallAvoidanceOff() {
        if (this.flagOn(behaviorTypeEnum.wall_avoidance)) this.flags ^= behaviorTypeEnum.wall_avoidance;
    }
    // - Get State
    seekIsOn() {
        return this.flagOn(behaviorTypeEnum.seek);
    }
    arriveIsOn() {
        return this.flagOn(behaviorTypeEnum.arrive);
    }
    wanderIsOn() {
        return this.flagOn(behaviorTypeEnum.wander);
    }
    separationIsOn() {
        return this.flagOn(behaviorTypeEnum.separation);
    }
    wallAvoidanceIsOn() {
        return this.flagOn(behaviorTypeEnum.wall_avoidance);
    }

    // Feelers
    getFeelers() {
        return this.feelers;
    }

    // Wander stats
    getWanderJitter() {
        return this.wanderJitter;
    }
    getWanderDistance() {
        return this.wanderDistance;
    }
    getWanderRadius() {
        return this.wanderRadius;
    }

    // Separation Weight
    getSeparationWeight() {
        return this.weightSeparation;
    }
}
