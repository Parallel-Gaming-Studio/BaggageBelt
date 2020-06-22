// JavaScript Document

/* Game States and transitions
 ** -- Start Scene
 **  \ - Play Scene
 ** /  \ - End Scene
 ** \____\ - Leaderboard Scene
 **        \ - Start Scene
 */
game.gameState = ['start', 'play', 'end', 'leaderboard'];
game.currState = game.gameState[0];

// Clear the screen of all elements
game.hideElements = {
    // Hide images
    images: function () {
		// Hide all <img> elements
        var y = document.getElementsByTagName("img");
        for (var i = 0; i < y.length; i++) {
            y[i].style.display = "none";
        }
		// Hide all <div> elements
        var z = document.getElementsByTagName("div");
        for (var i = 0; i < z.length; i++) {
            z[i].style.display = "none";
        }
    },
    // Hide canvas drawings
    canvas: function () {
        engine.context.clearRect(0, 0, engine.width, engine.height);
    },
    // Hide everything
    hideAll: function () {
        this.images();
        this.canvas();
    }
};

// Maintain live game data (timers, scores, etc.)
game.gameController = {
    gsStart: function (dt) {
        // Start Scene

        //Reset Game Timer
        game.playTimer.resetTimer();

        //Reset Play time
        game.endPlayerTimeBoard.resetTimer();
        
        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
				// Reset the player
				game.player.reset();
				// Set the new game state to Play Scene
                game.currState = game.gameState[1];
				// Hide all elements
                game.hideElements.hideAll();
                // Refresh timeout
                game.timeoutOverlay.refreshTimer();
				// Redraw all elements
                game.drawOnce();
            }
        }
    },
    gsPlay: function (dt) {
        // Play Scene

        //Start game timers
        if (game.playTimer.timer.paused) {
            game.playTimer.timer.unpauseTimer();
            game.playTimer.playTime.unpauseTimer();
        }
        if (!game.playTimer.timer._timerExpired) {
            game.playTimer.displayTimer();
        }

		// DEBUG
        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
				// Update game state to End Scene
                game.currState = game.gameState[2];
				// Hide all elements
                game.hideElements.hideAll();
                // Refresh timeout
                game.timeoutOverlay.refreshTimer();
				// Redraw all elements
                game.drawOnce();
            }
        }
    },
    gsEnd: function (dt) {
        // End Scene
		
        //Reset Game Timer
        game.playTimer.resetTimer();

        //Pause Play Time
        game.playTimer.playTime.paused = true;
        
		// Handle the initials animation
		game.endPlayerInitials.animateInitials(dt);

		// DEBUG
        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
				// Update game state to Leaderboard Scene
                game.currState = game.gameState[3];
				// Hide all elements
                game.hideElements.hideAll();
                // Refresh timeout
                game.timeoutOverlay.refreshTimer();
				// Redraw all elements
                game.drawOnce();
            }
        }
    },
    gsLeaderboard: function (dt) {
        // Leaderboard Scene

        //Reset Game Timer
        game.playTimer.resetTimer();

        //Reset Play time
        game.endPlayerTimeBoard.resetTimer();
        
		// DEBUG
        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
				// Update game state to Start Scene
		    //Reset player object
		game.player.reset();
		    //Reset leaderboard table
		game.top10players.hideTable();
		    //Update game state to Start Scene
                game.currState = game.gameState[0];
				// Hide all elements
                game.hideElements.hideAll();
                // Refresh timeout
                game.timeoutOverlay.refreshTimer();
				// Redraw all elements
                game.drawOnce();
            }
        }
    }
};

// Update
// - Heavy performance impact
// - Limit actions that do not require real-time updates
// - Executes every frame
game.update = function (dt) {
    // Monitor game states
    switch (game.currState) {
        case 'start':
            this.gameController.gsStart(dt);
            break;
        case 'play':
            this.gameController.gsPlay(dt);
            break;
        case 'end':
            this.gameController.gsEnd(dt);
            break;
        case 'leaderboard':
            this.gameController.gsLeaderboard(dt);
            break;
        default:
            this.gameController.gsStart(dt);
            break;
    };
    
    // Update all timers
    for (var i = 0; i < game.timers.length; i++) {
        game.timers[i].update(dt);
        // DEBUG
        /*if (game.timers[i].timerExpired) {
            console.log(game.timers[i].toString());
        }
        console.log(game.timers[i].displayMinuteSeconds());*/
    }
    
    // Force a draw when the window resizes
    if (this.lastTimeSized < (engine.timeSizing)) {
        this.drawOnce();
        this.lastTimeSized = Date.now();
    }

    // Maintain Game Timeout
    game.timeoutOverlay.update(dt);

    // Handle mouse clicks
    for (var i = 0; i < game.mouse.length; i++) {
        if (engine.input.pressed(game.mouse[i])) {
			// Refresh the overlay's timer
            game.timeoutOverlay.refreshTimer();
        }
    }
};

// Draw functions
// - Static
//   - Draw static assets once, if they are active
//   - Light performance impact
//   - Useful during scene transitions and small animations
game.drawOnce = function () {
    // Draw based on the GameState
    switch (this.currState) {
        case 'start':
            // Draw images on the canvas
            this.startBackground.draw();
			this.ButtonsBackdrop.draw();
            this.BBTitle.draw();
			
            // Display buttons
            this.startButton.adjustStyle();
            this.leaderboardButton.adjustStyle();
            this.quitButton.adjustStyle();
            this.menuButton.adjustStyle();
            break;
        case 'play':
            // Draw images on the canvas
			this.playBackground.draw();
			this.playSponsoredTimer.draw();
                        this.playTimer.draw();
			this.playScoreBox.draw();
			this.playLargePlaneLeft.draw();
			this.playLargePlaneRight.draw();
			this.playSmallPlaneLeft.draw();
			this.playSmallPlaneRight.draw();
			this.playLuggageCartLvl1.draw();

            // Display buttons
             this.menuButton.adjustStyle();
            break;
        case 'end':
            // Draw images on the canvas
			this.endBackground.draw();
			this.endKeypadBackdrop.draw();
			
			this.endTimeBoardBG.draw();
			this.endSponsoredTimerBox.draw();
			
			// Time
			this.endPlayerTimeBoard.draw();
           	this.endSponsorLogo.draw();
            
			this.endTitle.draw();
            this.endGamePoints.draw();
            this.endPlayerScore.draw();
            
            this.endGameOver.draw();
            this.endInitialsBox.draw();
            this.endPlayerInitials.draw();
		
            // Display buttons
            this.endSubmitButton.adjustStyle();
            this.menuButton.adjustStyle();
			
			// Keypad
            this.inputKeypad.adjustStyle();
			
            break;
		
        case 'leaderboard':
            // Draw images on the canvas
            this.leaderboardBackground.draw();
	    this.leaderboardPlayerScore.draw();
	    this.leaderboardSponsorBox.draw();
	    this.leaderboardSponsorLogo.draw();
	    this.finalPlayerScore.draw();
            this.top10players.adjustStyle();
		    
            // Display buttons
            this.menuButton.adjustStyle();
	    this.leaderboardRetryButton.adjustStyle();
            break;
        default:
            break;
    }
    // DEBUG
    console.log("<GAME> Loaded Scene: " + this.currState);
};
//   - First draw event
window.onload = function () {
    game.drawOnce();
}

// - Animation
//   - Draw animations
//     - Heavy performance impact
//     - Only use when animating the full screen
//     - Draws every frame
game.draw = function () {
    // Draw based on the GameState
    switch (this.currState) {
        case 'start':
            break;
        case 'play':
            break;
        case 'end':
            break;
        case 'leaderboard':
            break;
        default:
            break;
    }
};

// Window loses focus
window.onblur = function () {
	// Pause the game
    return game.stop();
};

// Window gains focus
window.onfocus = function () {
	// Force redraw of all elements
    game.run();
    // Unpause the game
    return game.drawOnce();
};

// First draw event
window.game.drawOnce();

// Fade out the overlay and spinner
$("#fadeOutLoader").delay(1000).fadeOut(1000);
$("#fadeOutOverlay").delay(1000).fadeOut(1000);

// Run Game
game.run(); // Force game to start on first script load