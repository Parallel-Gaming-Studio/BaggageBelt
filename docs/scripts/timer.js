// JavaScript Document

class Timer {
    // Default constructor
    constructor() {
        this.startTime = 0;
        this.timeLeft = 0;
        this.currentTime = 0;
        this._timerExpired = false;
        this.paused = false;
        this.description = '';
    }
    
    ///////////////////////
    // Methods           //
    ///////////////////////
    
    // Initialize the timer with how long it should count down (seconds)
    setup(timeLength, pause, description = 'Some Timer') {
        // Initialize the timer's length (Convert seconds to milliseconds)
        this.timeLeft = timeLength;
        
        // Initialize paused state
        this.paused = pause;
        
        // Set the timer's description
        this.description = description;
        
        // Reset the start time
        this.startTime = 0;
        
        // Reset the current time
        this.currentTime = 0;
        
        // Reset the timer's expiration
        this._timerExpired = false;
    }
    
    // Update the timer's count down if it's not paused
    update(dt) {
        // Check timer expiration
        if (!this._timerExpired) {
            // Check paused state
            if (!this.paused) {
                // Expire the timer if less than 0 seconds are left
                if (this.timeLeft <= 0) {
                    this.expireTimer();
                    this.pauseTimer();
                    this.timeLeft = 0;
                } else {
                    // Reduce the time left by delta time
                    this.timeLeft -= dt;
                }
            }
        }
    }
    
    // Add time to the current time left (seconds)
    addTime(amount) {
        this.timeLeft += amount;
    }
    
    // Subtract time from the current time left (seconds)
    subtractTime(amount) {
        this.timeLeft -= amount;
    }
    
    // Pause / Stop the timer
    pauseTimer() {
        this.paused = true;
    }
    
    // Unpause / Start the timer
    unpauseTimer() {
        this.paused = false;
    }
    
    // Expire / Finish the timer
    expireTimer() {
        this._timerExpired = true;
    }
    
    // Return the timer in the format MM:SS
    displayMinuteSeconds() {
        // Initialize a blank string to hold the time
        var displayString = "";
        // Get seconds as an integer
        var secondsTotal = Math.round(this.timeLeft);
        // Get the total minutes from the total seconds
        var minutes = Math.floor(secondsTotal / 60);
        // Get the remaining seconds
        var seconds = secondsTotal % 60;
        // Determine the amount of time left
        if (this.timeLeft >= 0) {
            // Create the MM:SS format from the time left
            displayString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        } else {
            displayString = "00:00";
        }
        // Return the time
        return `${displayString}`;
    }
    
    toString() {
        return `Timer ${this.description}. Time Left: ${this.timeLeft.toPrecision(4)}.\nPaused: ${this.paused}. Expired: ${this.timerExpired}.`;
    }
}
