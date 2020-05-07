//========================================================================
// DeVry University - New Development
// PROJECT TITLE:   Baggage Belt
// PROJECT DATE:    05/04/2020
// TEAM:            Parallel Gaming Studio
// PROGRAMMERS:     Chris Medeiros
//                  Samantha Harvey
//                  Joanna Blackwell
//                  Allen Chen
//                  Mohamed Alsalaous
//                  Gerren Clark
//                  Jonathon Havens
//                  Dusty Schlotfeldt
// FILE NAME:       game.js
// DESCRIPTION:     Controls the heart of Baggage Belt
// LAST UPDATE:     05/07/2020 - Created main game.js file to work from
//========================================================================

// Initialize game object
window.game = Object.create(GameObject.prototype);

// Keybindings
game.keys = ['A', 'S', 'D', 'F'];
for (var i = 0; i < game.keys.length - 1; i++) {
    engine.input.bind(engine.key[game.keys[i]], game.keys[i]);
}

// Control bindings for testing purposes
game.controls = ['SPACE'];
for (var i = 0; i < game.controls.length; i++) {
    engine.input.bind(engine.key[game.controls[i]], game.controls[i]);
};

// Mouse bindings
game.mouse = ['LEFT', 'MIDDLE', 'RIGHT', 'WHEELDOWN', 'WHEELUP'];
for (var i = 0; i < game.mouse.length; i++) {
    // engine.input.bind(engine.button.LEFT, 'left_click');
    engine.input.bind(engine.button[game.mouse[i]], game.mouse[i]);
}

// Declare Game Variables
// - Globals
game.timeoutTime = 120;					// Timeout time before returning to landing page
game.lastTimeSized = new Date();        // Used to track window resizing without window events

// - Player object information (persists through scenes)
game.player = {
    score: 0,
    initials: "ZZ",
	// Reset player object variables
    reset: function () {
        this.score = 0;
        this.initials = "";
		// Reset global score
		game.score = 0;
    }
};

// Google Analytics
/*		*** WARNING *** WARNING *** WARNING ***
 *** DO NOT UNCOMMENT THE GTAG() FUNCTIONS BEFORE DEPLOYMENT ***/
game.google = {
    load: function () {
		// Inform Google of Start Scene landing
        // gtag('event', 'screen_view', {'screen_name': 'Menu'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:load>");
    },
    start: function () {
		// Inform Google of Play Scene landing
        // gtag('event', 'screen_view', {'screen_name': 'Start'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:start>");
    },
    finish: function () {
		// Inform Google when player submits their initials (complete play through)
        // gtag('event', 'screen_view', {'screen_name': 'Finish'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:finish>");
    },
    quit: function () {
		// Inform Google of a player quitting the game
        // gtag('event', 'screen_view', {'screen_name': 'Quit'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:quit>");
    },
    timeOut: function () {
		// Inform Google of a game timeout (inactivity)
        // gtag('event', 'screen_view', {'screen_name': 'TimeOut'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:timeOut>");
    },
    leaderboard: function () {
		// Inform Google of players going straight to the leaderboard (from Start Scene)
        // gtag('event', 'screen_view', {'screen_name': 'Leaderboard'});

        // DEBUG ONLY:
        console.log("<GoogleAnalytics:leaderboard>");
    }
};
/*
 *** DO NOT UNCOMMENT THE GTAG() FUNCTIONS BEFORE DEPLOYMENT ***
 *** WARNING *** WARNING *** WARNING ***
 */

// Game functions
// Display an interactive overlay after a period of inactivity
// - Return to landing page upon a lack of interaction
game.timeoutOverlay = {
	// Handle to overlay
    div: document.getElementById("timeoutOverlay"),
	// Handle to header message
    divHeader: document.getElementById("timeoutHeader"),
	// Handle to instructions message
    divInstructions: document.getElementById("timeoutInstructions"),
	// Handle to timer
    divTimer: document.getElementById("timeoutTimer"),
	// Declare variables
    initialTime: null,
    finalTime: null,
    currentTime: null,
    initialTimerExpired: false,
    finalTimerExpired: false,
	// Initialize overlay
    init: function () {
        // Hide the overlay
        this.hideOverlay();

        // Add event listener to the main overlay div element
        this.div.addEventListener("click", function (e) {
            game.timeoutOverlay.refreshTimer();
        });

        // Initialize all variables
        this.resetTimer();
    },
	// Show the overlay and its children
    showOverlay: function () {
        this.div.style.display = "block";
        this.divHeader.style.display = "block";
        this.divInstructions.style.display = "block";
        this.divTimer.style.display = "block";
    },
	// Hide the overlay and its children
    hideOverlay: function () {
        this.div.style.display = "none";
    },
	// Update the overlay and its timers
    update: function (dt) {
        if (this.currentTime != null) {
            // Update the current time
            this.updateTime(dt);

            // Update the active timer (primary/secondary)
            if (!this.initialTimerExpired) {
                this.initialTimer(dt);
            } else if (!this.finalTimerExpired) {
                this.finalTimer(dt);
            }
        } else if (this.initialTimerExpired && this.finalTimerExpired) {
            // All timers expired - redirect
            this.expireTimer();
        }
    },
	// Initialize the primary timer and start its countdown
    initialTimer: function (dt) {
        // Check whether the time is greater than the limit
        if (this.currentTime >= this.initialTime) {
            // Reset the timer to zero
            this.currentTime = 0;
            // Flag the initial timer as complete
            this.initialTimerExpired = true;
            // Display the overlay
            this.showOverlay();
        }
    },
	// Display the secondary timer
    finalTimer: function (dt) {
        // Update the time left
        this.divTimer.innerHTML = ". . . " + Math.ceil(this.finalTime - this.currentTime) + " . . .";

        // Check whether the time is greater than the limit
        if (this.currentTime >= this.finalTime) {
            // Set the timer to null, stopping execution
            this.currentTime = null;
            // Flag the final timer as complete
            this.finalTimerExpired = true;
        }
    },
	// Update the time counter
    updateTime: function (dt) {
        this.currentTime += dt;
    },
	// Refresh the timer upon user interaction
    refreshTimer: function () {
        this.resetTimer();
    },
	// Reset the timer
    resetTimer: function () {
		// Hide the overlay
        this.hideOverlay();
		// Reinitialize all variables
        this.initialTime = game.timeoutTime;
        this.finalTime = game.timeoutTime / 10;
        this.currentTime = 0;
        this.initialTimerExpired = false;
        this.finalTimerExpired = false;
    },
	// Timeout expired
    expireTimer: function () {
		// Notify Google a timeout was reached
        game.google.timeOut();
		// Redirect to the OHare landing page
        window.location.replace("http://www.flywithbutchohare.com/");
    }
};
game.timeoutOverlay.init(); // Force initialization of the timer during script load

// Image hooks (Shorthand Object Notation)
// - Start Scene
//   - Images

//   - Buttons


// - Play Scene
//   - Images

//   - Buttons


// - End Scene
//   - Images

//   - Buttons


// - Leaderboard Scene
//   - Images

//   - Buttons


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

        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
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

		// DEBUG
        // Toggle next state
        for (var i = 0; i < game.controls.length; i++) {
            if (engine.input.pressed(game.controls[i])) {
				// Update game state to Start Scene
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
			
            // Display buttons
            
            break;
        case 'play':
            // Draw images on the canvas
			
            // Display buttons
            
            break;
        case 'end':
            // Draw images on the canvas
			
            // Display buttons
            
            break;
        case 'leaderboard':
            // Draw images on the canvas
            
            // Display buttons
            
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

// Run Game
game.run(); // Force game to start on first script load
