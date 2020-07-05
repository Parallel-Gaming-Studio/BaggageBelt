// JavaScript Document

/*---------------------Regulator--------------------------------------\
| - Regulate code flow (i.e. for update functions)
| - Initiate the function with the rate at which the code should flow
|   (i.e. 15 times / second)
| - Only allow the program to continue if Ready() is true
\--------------------------------------------------------------------*/

class Regulator {
	constructor(NumUpdatesPerSecondRqd, target) {
		this.updatePeriod;
		this.nextUpdateTime;
		this.owner = target;
		
		this.nextUpdateTime = Date.now() + randFloat() * 1000;
		
		if (NumUpdatesPerSecondRqd > 0) {
			this.updatePeriod = 1000 / NumUpdatesPerSecondRqd;
		} else if (isEqual(0.0, NumUpdatesPerSecondRqd)) {
			this.updatePeriod = 0.0;
		} else if (NumUpdatesPerSecondRqd < 0) {
			this.updatePeriod = -1;
		}

		// console.log(`Regulator for square ${this.owner.id}`);

		// Add to regulated list
		game.regulators.addRegulator(this);
	}
	
	getOwner() { return this.owner; }
	
	// Returns true if the current time exceeds nextUpdateTime
	isReady() {
		// If a regulator is instantiated with a zero freq, then it doesn't regulate
		if (isEqual(0.0, this.updatePeriod)) return true;
		
		// If a regulator is instantiated with a negative freq, then it will stop the code flow
		if (this.updatePeriod < 0) return false;
		
		var currentTime = Date.now();
		
		// The number of milliseconds the update period can vary per required
		// update step. This ensures multiple clients of this class have their
		// updates spread evenly appart.
		const updatePeriodVariator = 10.0;
		
		if (currentTime >= this.nextUpdateTime) {
			this.nextUpdateTime = currentTime + this.updatePeriod + randInRange(-updatePeriodVariator, updatePeriodVariator);
			return true;
		}

		return false;
	}
}