// JavaScript Document

// Images
//End_Scene Play background 
game.endBackground = {
    // Get handle to image
    image: document.getElementById("bbBackground"),
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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // Attach Top-Left Side
        this.posX = game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width + 20 + 50 * engine.preserveAspectRatio;
        this.posY = 0;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

// End Scene Sponsor Time Box
game.endSponsoredTimerBox = {
    // Get handle to image
    image: document.getElementById("endSponsoredTimerBox"),
    // Declare object transform information
    org_width: 266 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 150,
    org_posY: 82,
    posX: 0,
    posY: 0,
    font_size: 0,
    org_font_size: 72,
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endSponsoredTimerBox.clickMe);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // Attach Left Side
        this.posX = (game.endTimeBoardBG.posX + game.endTimeBoardBG.width / 2) - this.width / 2;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 220 * engine.preserveAspectRatio;

        // Adjust font size
        this.font_size = this.org_font_size * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

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
        this.height = game.endSponsoredTimerBox.posY - game.endPlayerTimeBoard.posY - 10 * engine.preserveAspectRatio;
        this.width = this.height;
        // Attach Bottom Side
        this.posX = game.endSponsoredTimerBox.posX + game.endSponsoredTimerBox.width / 2 - this.width / 2;
        this.posY = game.endSponsoredTimerBox.posY + (game.endPlayerTimeBoard.posY - game.endSponsoredTimerBox.posY) / 2 - this.height / 2;
    },
    // Draw object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image(), this.posX, this.posY, this.width, this.height);
    }
};


// End_Scene Time Left
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
    org_font_size: 40,
    font_size: 0,
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endPlayerTimeBoard.clickMe);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // Attach Left Side
        this.posX = (game.endTimeBoardBG.posX + game.endTimeBoardBG.width / 2) - this.width / 2;
        this.posY = game.endTimeBoardBG.posY + game.endTimeBoardBG.height - this.height - 190 * engine.preserveAspectRatio;

        // Adjust font size
        this.font_size = this.org_font_size * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.adjustStyle();
        this.displayTimer();
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

    displayTimer: function () {
        if (!game.playTimer.playTime.paused) {
            game.playTimer.playTime.pauseTimer();
        }
        this.div.innerHTML = game.playTimer.playTime.displayMinuteSeconds();
    },
    resetTimer: function () {
        game.playTimer.playTime.setup(1, true, "Play Time", "up");
    }
};
game.endPlayerTimeBoard.init(); // Force initialize endPlayerTimeBoard's event listener


// End_Scene Title Background
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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width / 2 - this.width / 2;
        this.posY = Math.max(40, game.endKeypadBackdrop.posY / 2 - this.height / 2);
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
    org_width: 210 * game.scale,
    org_height: 147 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    org_font_size: 50,
    font_size: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;
        this.posX = game.endTimeBoardBG.posX + game.endTimeBoardBG.width / 2 - this.width / 2;
        this.posY = game.endSponsoredTimerBox.posY + game.endSponsoredTimerBox.height + 20 * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

// End_Scene Player Score
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
    org_font_size: 74,
    font_size: 74,
    textResize: function () {
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
        mySpan.css("font-size", this.font_size);
        // Reduce the font size until the span is the correct height
        if (mySpan.height() > this.height) {
            while (mySpan.height() > this.height) {
                // Get the font size as an integer, base 10
                this.font_size = parseInt(mySpan.css("font-size"), 10);
                // Reduce the font size by 1
                mySpan.css("font-size", this.font_size - 1);
            }
        }

        mySpan.css("font-size", this.font_size);
        // Set the player score to the proper size
        myDiv.css("font-size", this.font_size).html(mySpan.html());
    },
    // Adjust the object's transform
    resize: function () {
        this.width = game.endGamePoints.width;
        this.height = game.endGamePoints.height / 2;
        this.posX = game.endGamePoints.posX + game.endGamePoints.width / 2 - this.width / 2;
        this.posY = game.endGamePoints.posY + game.endGamePoints.height / 2 + 0 * engine.preserveAspectRatio;
        // Adjust font size
        this.textResize();
    },
    // Draw the object
    draw: function () {
        this.updateScore();
        this.adjustStyle();
    },
    // Apply changes via CSS
    adjustStyle: function () {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "flex";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 1;
    },
    // Update the score
    updateScore: function () {
        this.div.innerHTML = NumberFormat(game.player.score.toString());
    }
};

// Game Over Area
// End_Scene Game Over
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

        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;
        this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width / 2 - this.width / 2);
        this.posY = (game.endGameOver.posY + game.endGameOver.height) + (game.endKeypadBackdrop.height * 0.05 * ((this.height / game.endKeypadBackdrop.height)));
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
    org_width: 350 * game.scale,
    org_height: 95 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    poxY: 0,
    // Declare member variables
    org_font_size: 74,
    font_size: 0,
    score: 0,
    initials: "",
    // Animation variables
    lastUpdate: 0,
    toggleUpdate: 0.35,
    showUpdate: false,
    // Initialize the object
    init: function () {
        // Add event listener to the button
        this.div.addEventListener("click", game.endPlayerInitials.clickMe);
        // Empty the initials
        this.initialsValue = "";
        // Clear and display the initials
        this.clearInitials();
        // Reset the last update
        this.lastUpdate = 0;
    },
    // Adjust the object's transform
    resize: function () {

        this.width = game.endInitialsBox.width * 0.2;
        this.height = game.endInitialsBox.height * 0.95;

        this.posX = game.endInitialsBox.posX + game.endInitialsBox.width - this.width;
        this.posY = game.endInitialsBox.posY + game.endInitialsBox.height * 0.025;

        // Adjust font size
        this.font_size = this.org_font_size * engine.preserveAspectRatio;
        this.posY -= this.font_size * 0.05 * engine.preserveAspectRatio;
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
        this.div.style.zIndex = 4;
        this.div.style.fontSize = this.font_size + "pt";
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
    // Animate the initials value
    animateInitials: function (dt) {
        // Update the time since the last update
        this.lastUpdate += dt;
        // Update the visible characters after toggleUpdate milliseconds
        if (this.lastUpdate >= this.toggleUpdate) {
            // Display/hide an underscore in the initials field
            if (this.initials.length < 2) {
                // Display
                if (!this.showUpdate) {
                    this.initialsValue = this.initials + "_";
                } else {
                    // Hide
                    this.initialsValue = this.initials;
                }
                // Toggle the update
                this.showUpdate = !this.showUpdate;
            } else {
                this.initialsValue = this.initials;
            }
            // Reset the last update time
            this.lastUpdate = 0;
        }
        // Write to the div element
        this.div.innerHTML = this.initialsValue;
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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (engine.width / 2 - this.width / 2) - 75 * engine.preserveAspectRatio;
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
    image: document.getElementById("letterButton_"),
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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;
    },
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
    org_width: 0,
    org_height: 0,
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

        this.width = game.endInitialsBox.width; //game.endKeypadBackdrop.width - 40 * engine.preserveAspectRatio;
        this.height = game.endSubmitButton.posY - (game.endPlayerInitials.posY + game.endPlayerInitials.height) - 60 * engine.preserveAspectRatio;

        // Attach to Top-Left of Keyboard Background
        this.posX = game.endInitialsBox.posX; // game.endKeypadBackdrop.posX + 10 * engine.preserveAspectRatio;
        this.posY = (game.endInitialsBox.posY + game.endInitialsBox.height) + 20 * engine.preserveAspectRatio;

        this.btnWidth = this.width / 9.1;

        // Update CSS for all children
        for (var i = 0; i < this.keyArray.length; i++) {
            var domElement = document.getElementById(this.keyArray[i]);
            domElement.style.width = this.btnWidth + "px";
            domElement.style.height = domElement.childNodes[1].style.getPropertyValue('height') + "px";
            domElement.childNodes[1].style.fontSize = this.btnWidth * 0.50 + "px";
        }
    },
    // Apply changes via CSS
    adjustStyle: function () {
        if (this.keyArray.length == 0) this.buildKeypad();
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "flex";
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
            buttonBuilder += divPrefix + letter + '" class="keypad-container" style="width:' + (this.width / 9) + 'px">';

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
            if (i == 8) {
                buttonBuilder += "<br>";
            }

            // Add the button to the array
            this.keyArray.push("containerDiv_" + String.fromCharCode(65 + i));
        }
        // Define the number of buttons per row
        this.btnPerRow = 9; // Math.ceil(this.keyArray.length / 2);

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

                            // Add letter to the player's initials
                            game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[1].name);
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

                            // Add letter to the player's initials
                            game.endPlayerInitials.updateInitials(e.srcElement.parentNode.childNodes[0].name);
                        });
                        continue;
                    }
                }
            }
        }
    }
};


// Buttons
// End_Scene Submit Button
game.endSubmitButton = {
    // Get handle to image
    image: document.getElementById("endSubmitButton"),
    // Declare object transform information
    org_width: 156 * game.scale,
    org_height: 63 * game.scale,
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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (game.endKeypadBackdrop.posX + game.endKeypadBackdrop.width / 2) - this.width / 2;
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