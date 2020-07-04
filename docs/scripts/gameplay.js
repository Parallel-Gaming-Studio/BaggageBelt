// JavaScript Document

game.manager = {
    // Current Level
    level: 0,
    levelPointsMultiplier: 1.2,
    // Lug Count: 10  | 15  | 20
    pointsGoal: [1200, 3360, 9120],

    // Limit Game Updates / Refreshes
    timeSinceUpdate: 0.0,
    timeBetweenUpdates: 0.01,
    evalReady: function(dt) {
        // Update by time since last frame (dt)
        this.timeSinceUpdate += dt;

        // If the time is greater than the update wait time
        if (this.timeSinceUpdate >= this.timeBetweenUpdates) {
            // Reset the update time
            this.timeSinceUpdate = 0.0;
            // Return ready
            return true;
        }

        // Return not ready
        return false;
    },

    // Reset All Necessary Game Variables
    resetGame: function() {
        // Game Manager Attributes
        this.level = 1;

        // Player
        game.player.reset();
    },

    // Check the level thresholds
    checkLevel: function() {
        // Cancel check if max level is reached
        if (this.level > this.pointsGoal.length) return;

        // Increase the current level after reaching its threshold
        if (game.player.score >= this.pointsGoal[this.level]) this.level++;
    },

    // Increase the player's score
    addPoints: function(val) {
        // Add points
        game.player.score += val * (this.level * this.levelPointsMultiplier);
        // Update the scoreboard
        game.playScore.updateScore();
    },

    // Update Game Manager
    update: function() {
        // Validate the game's current level
        this.checkLevel();
    }
};

game.playLoop = function(dt) {
    // Limit the update attempts to reduce device overhead
    if (!game.manager.evalReady(dt)) return;

    // Perform Game Manager Updates
    game.manager.update();
};