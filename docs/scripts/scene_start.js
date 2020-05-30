// JavaScript Document

// - Start Scene
// - Images
game.startBackground = {
	// Get handle to image
    image: document.getElementById("BaggageBeltBackground"),
	// Declare object transform information
    org_width: 1920 * game.scale,
    org_heigth: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	// Adjust the object's transform
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
	// Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.BBTitle = {
	// Get handle to image
    image: document.getElementById("BaggageBeltTitle"),
	// Declare object transform information
    org_width: 900 * game.scale,
    org_height: 390 * game.scale,
    width: 0,
    height: 0,
    posX: 753,
    posY: 40,
    org_posY: 40,
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = Math.max(40, Math.min(50, this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion))));
    },
	// Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.ButtonsBackdrop = {
	// Get handle to image
    image: document.getElementById("ButtonsBackdrop"),
	// Declare object transform information
    org_width: 450 * game.scale,
    org_height: 206 * game.scale,
    width: 0,
    height: 0,
    posX: 753,
    posY: 40,
    org_posY: 40,
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = engine.width / 2 - this.width / 2;
        this.posY = Math.max(40, Math.min(50, this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion))));
    },
	// Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//   - Buttons
game.menuButton = {
	// Get handle to image
    image: document.getElementById("menuButton"),
	// Declare object transform information
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
	// Initialize the object
    init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.menuButton.clickMe);
    },
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // Attach Top-Right Side
        this.posX = engine.width - this.width;
        this.posY = Math.max(50, Math.min(40, this.org_posY - engine.heightDifference));
    },
	// Draw the object
    draw: function () {
        this.adjustStyle();
    },
	// Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	// Handle user interaction based on game state
    clickMe: function () {
		// Determine the current game state
        switch (game.currState) {
            case 'start':
				// Inform Google the user quit the game
                game.google.quit();
				// Redirect the user to the O'Hare landing page
                window.location.replace("http://www.flywithbutchohare.com/");
                break;
            default:
				// All but the Start Scene returns to the Start Scene
				// Hide all elements
                game.hideElements.hideAll();
                // Reset leaderboard table
                game.top10players.hideTable();
				// Reset the player object
                game.player.reset();
				// Refresh the timeout timer
                game.timeoutOverlay.refreshTimer();
				// Set the new game state to the Start Scene
                game.currState = game.gameState[0];
				// Redraw all objects
                game.drawOnce();
                break;
        }
    }
};
game.menuButton.init();// Force initialize object on first script load

game.startButton = {
	// Get handle to image
    image: document.getElementById("startButton"),
	// Declare object transform information
    org_width: 241 * game.scale,
    org_height: 310 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	// Initialize the object
    init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.startButton.clickMe);
    },
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = engine.width / 3 - this.width / 2;
        this.posY = engine.height - this.height - 40;
    },
	// Draw the object
    draw: function () {
        this.adjustStyle();
    },
	// Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	// Handle user interaction based on game state
    clickMe: function () {
		// Inform Google the user started playing a game
        game.google.start();
        // Set game score to zero
        game.score = 0;
        // Reset the player object
        game.player.reset();
        // Refresh the timeout timer
		game.timeoutOverlay.refreshTimer();
        // Set the new game state to Play Scene
        game.currState = game.gameState[1];
        // Hide all elements
        game.hideElements.hideAll();
        // Redraw all elements
        game.drawOnce();
    }
};
game.startButton.init(); // Force object initialization on first script load

game.leaderboardButton = {
	// Get handle to image
    image: document.getElementById("leaderboardButton"),
	// Declare object transform information
    org_width: 241 * game.scale,
    org_height: 310 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	// Initialize the object
    init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.leaderboardButton.clickMe);
    },
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height - 40;
    },
	// Draw the object
    draw: function () {
        this.adjustStyle();
    },
	// Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	// Handle user interaction based on game state
    clickMe: function () {
        // Inform Google the user went straight to the leaderboard
        game.google.leaderboard();
        // Clear the player object
        game.player.reset();
        // Refresh the timeout timer
		game.timeoutOverlay.refreshTimer();
        // Update game state to Leaderboard Scene
        game.currState = game.gameState[3];
        // Hide all elements
        game.hideElements.hideAll();
        // Redraw all elements
        game.drawOnce();
    }
};
game.leaderboardButton.init(); // Force object initialization on first script load

game.quitButton = {
	// Get handle to image
    image: document.getElementById("quitButton"),
	// Declare object transform information
    org_width: 241 * game.scale,
    org_height: 310 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
	// Initialize the object
    init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.quitButton.clickMe);
    },
	// Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = (engine.width / 3 * 2) - this.width / 2;
        this.posY = engine.height - this.height - 40;
    },
	// Draw the object
    draw: function () {
        this.adjustStyle();
    },
	// Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.image.style.position = "absolute";
        this.image.style.display = "block";
        this.image.style.left = this.posX.toString() + "px";
        this.image.style.top = this.posY.toString() + "px";
        this.image.style.width = this.width + "px";
        this.image.style.height = this.height + "px";
        this.image.style.zIndex = 1;
    },
	// Handle user interaction based on game state
    clickMe: function () {
        // Inform Google the user quit the game
        game.google.quit();
        // Redirect the user to the O'Hare landing page
        window.location.replace("http://www.flywithbutchohare.com/");
    }
};
game.quitButton.init(); // Force object initialization on first script load