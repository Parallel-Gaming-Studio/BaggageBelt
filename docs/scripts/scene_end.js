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
    org_width: 346 * game.scale,
    org_height: 465 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
  resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // Attach Top-Left Side
	  this.posX = game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width + 20 + 50 * (1 - Math.max(engine.widthProportion, engine.heightProportion));        
	  this.posY = 0;   
  },
	// Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

//End Scene Sponsor Time Box
game.endSponsoredTimerBox = {
    // Get handle to div
    div: document.getElementById("endSponsoredTimerBox"),
    // Declare object transform information
    org_width: 266 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 150,
    org_posY: 82,
    posX: 0,
    posY: 0,
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
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 220 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        
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
        this.div.style.zIndex = 3;
    },
	// Handle user interaction based on game state
    clickMe: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
    }
};
game.endSponsoredTimerBox.init(); // Force initialize the object's event listener

game.endSponsorLogo = {
    // Get handle
    image: function () {
        return document.getElementById(game.sponsors.getSponsor());
    },
    // Declare object information
    org_width: 200 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 1590,
    org_posY: 785,
    posX: 0,
    posY: 0,
    // Adjust transformation
    resize: function () {
        this.width = game.endSponsoredTimerBox.width * 0.70;
        this.height = this.width;

        // Attach Bottom Side
        this.posX = (game.endTimeBoardBG.posX + game.endTimeBoardBG.width/2) - this.width/2;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 220 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
    },
    // Draw object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image(), this.posX, this.posY, this.width, this.height);
    }
};


//End_Scene Time Left
game.endPlayerTimeBoard = {
    // Get handle to div
    div: document.getElementById("endPlayerTimeBoard"),
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
        this.div.addEventListener("click", game.endPlayerTimeBoard.clickMe);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // Attach Left Side
        this.posX = (game.endTimeBoardBG.posX + game.endTimeBoardBG.width/2) - this.width/2;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 250 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        
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
game.endPlayerTimeBoard.init(); // Force initialize endPlayerTimeBoard's event listener


//End_Scene Title Background
game.endTitle = {
    // Get handle to image
    image: document.getElementById("endTitle"),
    // Declare object transform information
    org_width: 523 * game.scale,
    org_height: 112 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

		this.posX = game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width/2 - this.width/2;
		this.posY = Math.max(40, game.endKeypadBackdrop.posY/2 - this.height/2);   
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

        this.posX = game.endTimeBoardBG.posX + game.endTimeBoardBG.posY;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height/2;
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
    div: document.getElementById("endPlayerScore"),
    // Declare object transform information
    org_width: 210 * game.scale,
    org_height: 147 * game.scale,
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

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = game.endTimeBoardBG.posX + game.endTimeBoardBG.posY;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - 100 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
		
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
    org_width: 430 * game.scale,
    org_height: 118 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = game.endKeypadBackdrop.posX + (game.endKeypadBackdrop.width / 2) - (this.width / 2);
        this.posY = game.endKeypadBackdrop.posY + (game.endKeypadBackdrop.height * 0.05 * (1 - (this.height / game.endKeypadBackdrop.height)));
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
    org_width: 880 * game.scale,
    org_height: 100 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width - this.width / 2) / 1.7;
        this.posY = (game.endGameOver.posY + game.endGameOver.height) + (game.endKeypadBackdrop.height * 0.05 * (1 - (this.height / game.endKeypadBackdrop.height)));
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

        this.width = game.endInitialsBox.width * 0.3;
        this.height = game.endInitialsBox.height * 0.95;

        this.posX = game.endInitialsBox.posX + game.endInitialsBox.width - this.width;
        this.posY = game.endInitialsBox.posY + game.endInitialsBox.height * 0.025;

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
    org_width: 940 * game.scale,
    org_height: 730 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1- Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2 - this.width / 2) - 75 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = engine.height / 2 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playKeyPadSpace = {
	// Get handle to image
    image: document.getElementById("playKeyPadSpace"),
	// Declare object transform information
    org_width: 94 * game.scale,
    org_height: 102 * game.scale,
    width: 0,
    height: 0,
    org_posX: 60,
    org_posY: 0,
    posX: 0,
    posY: 0,
	// Adjust the object's transform
   resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width - this.width / 2) / 1.7;
        this.posY = (game.endGameOver.posY + game.endGameOver.height) + (game.endKeypadBackdrop.height * 0.05 * (1 - (this.height / game.endKeypadBackdrop.height)));
    },
    // Draw the object
	// Draw the object
    draw: function () {
        this.resize();
    },
	// Apply changes via CSS
    adjustStyle: function () {
        this.resize();
    }
};


game.inputKeypad = {
	// Get handle to div
    div: document.getElementById("inputKeypad"),
    // Get handle to initials
	initials: document.getElementById("endPlayerInitials"),
	// Declare object transform information
    org_width: 447,
    org_height: 139,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posX: 30,
    // Declare member variables
    divArray: [],
    keyArray: [],
    btnMargin: 5,
    btnWidth: 0,
    btnHeight: 0,
    btnPerRow: 0,
	// Adjust the object's transform
    resize: function () {
        // Adjust based on game state
        switch (game.currState) {
            case 'play':
                this.width = game.playSponsor.posX - 40;
                this.height = (game.playKeyPadSpace.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion)) + this.btnMargin * 4) * 2;

                // Attach Left Side with Buffer
               this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width - this.width) * 0.72;
        	   this.posY = (game.endKeypadBackdrop.posY + game.endKeypadBackdrop.height - this.height) * 0.95;

                this.btnWidth = this.width / 14;

                // Update CSS for all children
                for (var i = 0; i < this.keyArray.length; i++) {
                    var domElement = document.getElementById(this.keyArray[i]);
                    domElement.style.width = this.btnWidth + "px";
                    domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
                    domElement.childNodes[1].style.fontSize = this.btnWidth * 0.50 + "px";
                }
                break;
            case 'end':
                this.width = game.endKeypadBackdrop.width - 40 - game.endSubmitButton.width;
                this.height = engine.height - game.endKeypadBackdrop.posY - 20;

                // Attach to Top-Left of Keyboard Background
                this.posX = game.endKeypadBackdrop.posX + 10;
                this.posY = game.endKeypadBackdrop.posY + 10;

                this.btnWidth = this.width / 13.1;

                // Update CSS for all children
                for (var i = 0; i < this.keyArray.length; i++) {
                    var domElement = document.getElementById(this.keyArray[i]);
                    domElement.style.width = this.btnWidth + "px";
                    domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
                    domElement.childNodes[1].style.fontSize = this.btnWidth * 0.50 + "px";
                }
                break;
            default:
                break;
        }
    },
	// Apply changes via CSS
    adjustStyle: function () {
        if (this.keyArray.length == 0) this.buildKeypad();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "inline-block";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    // Hide keypad and clear arrays
    hideKeypad: function () {
        this.divArray = [];
        this.keyArray = [];
    },
    // Build the keypad
    buildKeypad: function () {
        var letter = "";

        // Define variables starting DOM definitions
        var divPrefix = '<div id="containerDiv_';
        var btnPrefix = '<img id="letterButton_';
        var innerDivPrefix = '<div id="letterDiv_';
        
        // Build a string to hold all the buttons
        var buttonBuilder = '';

        // Create all buttons
        for (var i = 0; i < 26; i++) {
            // Identify the letter for this button
            letter = String.fromCharCode(65 + i);

            // Open outer div based on game state
            switch (game.currState) {
                case 'play':
                    buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.width / 13) + 'px">';
                    break;
                case 'end':
                    buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.width / 13) + 'px">';
                    break;
            }

            // Inner Image
            buttonBuilder += btnPrefix + letter + '" class="keypad-image" src="images/end_scene/key_blank.png">';

            // Open inner div
            buttonBuilder += innerDivPrefix + letter + '" class="keypad-center-letter">';

            // Write letter
            buttonBuilder += letter;

            // Close inner div
            buttonBuilder += "</div>";

            // Close outer div
            buttonBuilder += "</div>";

            // Insert a break after the 13th button
            if (i == 12) {
                buttonBuilder += "<br>";
            }

            // Add the button to the array
            this.keyArray.push("containerDiv_" + String.fromCharCode(65 + i));
        }
        // Define the number of buttons per row
        this.btnPerRow = Math.ceil(this.keyArray.length / 2);

        // Display the buttons in the container
        this.div.innerHTML = buttonBuilder;

        // Apply user interaction to the inner elements of each button
        // Get a list of all the images
        var imgElement = this.div.getElementsByTagName("img");
        for (var i = 0; i < imgElement.length; i++) {
            // Check the element's name
            if (imgElement[i].id.substring(0, 13) == "letterButton_") {
                for (var j = 0; j < 26; j++) {
                    // Create an identity matching string
                    var letter = "letterButton_" + String.fromCharCode(65 + j);
                    if (imgElement[i].id == letter) {
                        // Give the element a name for easy identification
                        imgElement[i].name = String.fromCharCode(65 + j);
                        // Add a click event to the element
                        imgElement[i].addEventListener("click", function (e) {

                            // Reset timeout overlay timer
                            game.timeoutOverlay.refreshTimer();

                            // Apply actions based on the game state
                            switch (game.currState) {
                                case 'play':
                                    if (e.srcElement.parentNode.childNodes[1].getAttribute("class") === 'keypad-center-letter') {

                                        // Set key letter to inactve
                                        e.srcElement.parentNode.childNodes[1].classList.remove("keypad-center-letter");
                                        e.srcElement.parentNode.childNodes[1].classList.add("keypad-center-letter-inactive");

                                        // Set key image to inactive
                                        e.srcElement.classList.remove("keypad-image");
                                        e.srcElement.classList.add("keypad-image-inactive");

                                        // Test letter with chosen word
                                        game.playLetterSpaces.testLetter(e.srcElement.name);
                                    }
                                    break;
                                case 'end':
                                    // Add letter to the player's initials
                                    game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[1].name);
                                    break;
                            }
                        });
                        continue;
                    }
                }
            }
        }

        // Get a list of all the divs
        var divElement = this.div.getElementsByTagName("div");
        for (var i = 0; i < divElement.length; i++) {
            // Check the element's name
            if (divElement[i].id.substring(0, 10) == "letterDiv_") {
                for (var j = 0; j < 26; j++) {
                    // Create an identity matching string
                    var letter = "letterDiv_" + String.fromCharCode(65 + j);
                    if (divElement[i].id == letter) {
                        // Give the element a name for easy identification
                        divElement[i].name = String.fromCharCode(65 + j);
                        // Add a click event to the element
                        divElement[i].addEventListener("click", function (e) {

                            // Reset timeout overlay timer
                            game.timeoutOverlay.refreshTimer();

                            // Apply actions based on the game state
                            switch (game.currState) {
                                case 'play':
                                    if (e.srcElement.getAttribute("class") === 'keypad-center-letter') {

                                        // Set key letter to inactve
                                        e.srcElement.classList.remove("keypad-center-letter");
                                        e.srcElement.classList.add("keypad-center-letter-inactive");

                                        // Set key image to inactive
                                        e.srcElement.parentNode.childNodes[0].classList.remove("keypad-image");
                                        e.srcElement.parentNode.childNodes[0].classList.add("keypad-image-inactive");

                                        // Test letter with chosen word
                                        game.playLetterSpaces.testLetter(e.srcElement.name);
                                    }
                                    break;
                                case 'end':
                                    // Add letter to the player's initials
                                    game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[0].name);
                                    break;
                            }
                        });
                        continue;
                    }
                }
            }
        }
    }
};



// Buttons
//End_Scene Submit Button
game.endSubmitButton = {
    // Get handle to image
    image: document.getElementById("endSubmitButton"),
    // Declare object transform information
    org_width: 156 * game.scale,
    org_height: 53 * game.scale,
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
        this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width - this.width) * 0.72;
        this.posY = (game.endKeypadBackdrop.posY + game.endKeypadBackdrop.height - this.height) * 0.95;
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