// JavaScript Document

// DEBUG
console.log("scene_end.js loaded successfully");
//Start End Scene

// Images
//End_Scene Play background 
game.endBackground = {
    // Get handle to image
    image: document.getElementById("endBackground"),
    // Declare object transform information
    org_width: 1920 * game.scale,
    org_height: 1080 * game.scale,
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


// Left Panel
//End_Scene Time Board Background
game.endTimeBoardBG = {
    // Get handle to image
    image: document.getElementById("endTimeBoardBG"),
    // Declare object transform information
    org_width: 413 * game.scale,
    org_height: 350 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = 30 + 10 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = Math.max(50, Math.min(40, this.org_posY - engine.heightDifference));
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End_Scene Time Left
game.endSponsoredTimerBox = {
    // Get handle to div
    div: document.getElementById("endSponsoredTimerBox"),
    // Declare object transform information
    org_width: 200 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    org_posX: 150,
    org_posY: 82,
    posX: 0,
    posY: 0,
    // Declare member variables
    org_font_size: 82,
    font_size: 0,
    timeStart: null,
    timeEnd: null,
    timeSeconds: null,
    timerStarted: false,
    timerExpired: false,
    timerDisplay: '',
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endSponsoredTimerBox.clickMe);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // Attach Left Side
        this.posX = (game.endTimeBoardBG.posX + game.endTimeBoardBG.width/2) - this.width/2;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 16 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        
        // Adjust font size
        this.font_size = this.org_font_size * (1 - Math.max(engine.widthProportion, engine.heightProportion));
    },
    // Draw the object
    draw: function () {
        this.adjustStyle();
    },
    // Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.fontSize = this.font_size + "pt";
        this.div.style.zIndex = 4;
    },
    update: function () {
        // Handle timer events
        if (!this.timerStarted) {
            // Start the timer if it hasn't been started yet
            this.startTimer();
        } else {
            // Update the time
            this.updateTime();
            // Display the timer
            this.displayTimer();
            // Expire the timer if less than 0 seconds remain
            if ((this.timeSeconds) <= 0) {
                this.expireTimer();
            }
        }
    },
    startTimer: function () {
        // Flag timer as started
        this.timerStarted = true;
        // Set the start time
        this.timeStart = Date.now();
        // Set the end time
        this.timeEnd = Date.now() + game.playTime;
    },
    displayTimer: function () {
        // Display time in MM:SS format
        if ((this.timeSeconds) >= 0) {
            this.timerDisplay = "0" + Math.floor(this.timeSeconds / 60) + ":" + ((this.timeSeconds % 60) < 10 ? "0" : "") + (this.timeSeconds % 60);
        } else {
            this.timerDisplay = "00:00";
        }
        // Display the time
        this.div.innerHTML = this.timerDisplay;

        // Flash the timer when less than 10 seconds are left
        if ((this.timeSeconds) <= 10) {
            this.div.classList.remove("pulse");
            this.div.classList.add("glow");
        } else if (this.div.getAttribute("class") === 'glow') {
            this.div.classList.remove("glow");
        }
    },
    updateTime: function () {
        // Set the countdown in seconds
        this.timeSeconds = Math.round((this.timeEnd - Date.now()) / 1000);
    },
    // Handle user interaction based on game state
    clickMe: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
    }
};
game.endSponsoredTimerBox.init(); // Force initialize endPlayerTimeBoard's event listener

//End_Scene Title Background
game.endTitle = {
    // Get handle to image
    image: document.getElementById("endTitle"),
    // Declare object transform information
    org_width: 413 * game.scale,
    org_height: 262 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = 30 + 10 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End_Scene Game Points Background
game.endGamePoints = {
    // Get handle to image
    image: document.getElementById("endGamePoints"),
    // Declare object transform information
    org_width: 413 * game.scale,
    org_height: 263 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = 30 + 10 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = game.endTitle.posY + game.endTitle.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End_Scene Player Score
game.endPlayerScore = {
    // Get handle to div element
    div: document.getElementById("endScore"),
    // Declare object transform information
    org_width: 200 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Declare member variables
    org_font_size: 82,
    font_size: 0,
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endPlayerScore.clickMe);
    },
    textResize: function() {
        // Declare references to screen objects
        var mySpan = $("#endPlayerScoreSpan");
        var myDiv = $("#endPlayerScore");
        
        // Initialize the span
        mySpan.css("font-size", this.org_font_size);
        mySpan.html(myDiv.html());
        
        // Reduce the font size until the span is the correct width
        if (mySpan.width() > this.width) {
                while (mySpan.width() > this.width) {
                // Get the font size as an integer, base 10
                this.font_size = parseInt(mySpan.css("font-size"), 10);
                // Reduce the font size by 1
                mySpan.css("font-size", this.font_size - 1);
            }
        } else if (this.font_size < this.org_font_size) {
            // Reset the font size to normal
            this.font_size = this.org_font_size;
            // Reduce the font size by 1
            mySpan.css("font-size", this.font_size);
        }
        
        // Set the player score to the proper size
        $("#endPlayerScore").css("font-size", this.font_size).html(mySpan.html());
    },
    // Adjust the object's transform
    resize: function () {

        this.width = game.endGamePoints.width * 0.8;
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (game.endGamePoints.posX + game.endGamePoints.width/2) - this.width/2;
        this.posY = game.endGamePoints.posY + game.endGamePoints.height * 0.32;
        
        // Adjust font size
        this.textResize();
    },
    // Draw the object
    draw: function () {
        this.adjustStyle();
    },
    // Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    // Handle user interaction based on game state
    clickMe: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
    }
};
game.endPlayerScore.init(); // Force initialize the object's event listener

// Game Over Area
//End_Scene Game Over
game.endGameOver = {
    // Get handle to image
    image: document.getElementById("endGameOver"),
    // Declare object transform information
    org_width: 1323 * game.scale,
    org_height: 210 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Adjust the object's transform
    resize: function () {

        this.width = game.endKeyboardBackground.width;
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = game.endKeyboardBackground.posX;
        this.posY = game.endKeyboardBackground.posY + (game.endKeyboardBackground.height * 0.05 * (1 - (this.height / game.endKeyboardBackground.height)));
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End_Scene Intials Background
game.endInitialsBox = {
    // Get handle to image
    image: document.getElementById("endInitialsBox"),
    // Declare object transform information
    org_width: 811 * game.scale,
    org_height: 103 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (game.endKeyboardBackground.posX + game.endKeyboardBackground.width - this.width / 2) / 1.7;
        this.posY = (game.endGameOver.posY + game.endGameOver.height) + (game.endKeyboardBackground.height * 0.05 * (1 - (this.height / game.endKeyboardBackground.height)));
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End_Scene Player Score
game.endPlayerInitials = {
    // Get handle to div element
    div: document.getElementById("endPlayerInitials"),
    // Declare object transform information
    org_width: 811 * game.scale,
    org_height: 103 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Declare member variables
    org_font_size: 82,
    font_size: 0,
    score: 0,
    initials: "",
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endPlayerInitials.clickMe);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = game.endInitialsBG.width * 0.3;
        this.height = game.endInitialsBG.height * 0.95;

        this.posX = game.endInitialsBG.posX + game.endInitialsBG.width - this.width;
        this.posY = game.endInitialsBG.posY + game.endInitialsBG.height * 0.025;

        this.font_size = this.org_font_size * (1 - Math.max(engine.widthProportion, engine.heightProportion));
    },
    // Draw the object
    draw: function () {
        this.adjustStyle();
    },
    // Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
        this.div.style.fontSize = this.font_size + "px";
    },
    // Update and display the player's initials
    updateInitials: function (letter) {
        // Add to or reset initials, limiting 2 letters
        if (this.initials.length < 2 && this.initials != "") {
            this.initials += letter;
        } else {
            this.initials = letter;
        }
        // Display and set the player's initials
        this.div.innerHTML = this.initials;
        game.player.initials = this.initials;
    },
    // Clear and hid the initials
    clearInitials: function () {
        this.initials = "";
        this.div.innerHTML = this.initials;
    },
    // Handle user interaction based on game state
    clickMe: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
    }
};
game.endPlayerInitials.init(); // Force initialize the event listener

//End_Scene Keypad Background
game.endKeypadBackdrop = {
    // Get handle to image
    image: document.getElementById("endKeypadBackdrop"),
    // Declare object transform information
    org_width: 1323 * game.scale,
    org_height: 870 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = ((engine.width - (game.endTitle.posX + game.endTitle.width)) + (this.width / 2)) / 4;
        this.posY = engine.height - this.height + 5;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};


// Buttons
//End_Scene Menu Button
game.endMenuButton = {
    // Get handle to image
    image: document.getElementById("endMenuButton"),
    // Declare object transform information
    org_width: 275 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
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
    }
};

//End_Scene Submit Button
game.endSubmitButton = {
    // Get handle to image
    image: document.getElementById("endSubmitButton"),
    // Declare object transform information
    org_width: 215 * game.scale,
    org_height: 86 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.image.addEventListener("click", game.endSubmitButton.clickMe);
    },
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = (game.endKeyboardBackground.posX + game.endKeyboardBackground.width - this.width) * 0.97;
        this.posY = (game.endKeyboardBackground.posY + game.endKeyboardBackground.height - this.height) * 0.95;
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

    clickMe: function () {
        //AJAX
        var ajax = new XMLHttpRequest();
        // Send player's initials and score to the database
        ajax.open("GET", "scripts/insert_score.php?u=" + game.player.initials + "&s=" + game.player.score, true);
        ajax.send();

        // Await response completion (State: 4)
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // DEBUG
                console.log(this.responseText);

                // TRANSITION
                // Change game state to Leaderboard Scene
                game.currState = game.gameState[3];
                // Hide all elements
                game.hideElements.hideAll();
                // Redraw all elements
                game.drawOnce();
                // Inform Google the player completed a playthrough
                game.google.finish();
            }
        }
    }
};
game.endSubmitButton.init(); // Force initialize object on first script load 
