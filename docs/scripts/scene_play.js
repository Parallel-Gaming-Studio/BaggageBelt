// JavaScript Document

// DEBUG
console.log("scene_play.js loaded successfully");

//   - Images
game.playBackground = {
    // Get handle to image
    image: document.getElementById("playBackground"),
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

game.playSponsoredTimer = {
    // Get handle to image
    image: document.getElementById("playSponsoredTimer"),
    // Declare object transform information
    org_width: 450 * game.scale,
    org_heigth: 130 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = engine.width / 3 - this.width / 2;
        this.posY = 0;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}

game.playTimer = {
    // Get handle to div
    div: document.getElementById("playTimer"),
    // Declare object transform information
    org_width: 200 * game.scale,
    org_height: 72 * game.scale,
    width: 0,
    height: 0,
    org_posX: 150,
    org_posY: 82,
    posX: 0,
    posY: 0,
    // Declare member variables
    org_font_size: 60,
    font_size: 0,
    timer: new Timer(),
    playTime: new Timer(),
    // Initialize the object
    init: function () {
        this.timer.setup(150, true, "Game Timer");
        game.timers.push(this.timer);
        this.playTime.setup(0, true, "Play Time", "up");
        game.timers.push(this.playTime);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (game.playSponsoredTimer.posX + game.playSponsoredTimer.width * 0.7) - this.width / 2;
        this.posY = game.playSponsoredTimer.height / 2 - this.height / 2;

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
    // Handle user interaction based on game state
    clickMe: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
    },
    startTimer: function () {
        if (this.timer.paused) {
            this.timer.unpauseTimer();
        }
        if (this.playTime.paused) {
            this.playTime.unpauseTimer();
        }
    },
    displayTimer: function () {
        this.startTimer();
        this.div.innerHTML = this.timer.displayMinuteSeconds();
    },
    resetTimer: function () {
        this.timer.setup(150, true, "Game Timer");
    }
};
game.playTimer.init(); // Force initialize playTimer's event listener

game.playSponsorLogo = {
    // Get handle
    image: function () {
        return document.getElementById(game.sponsors.getSponsor());
    },
    // Declare object information
    org_width: 200 * game.scale,
    org_height: 200 * game.scale,
    width: 0,
    height: 0,
    org_posX: 0,
    org_posY: 0,
    posX: 0,
    posY: 0,
    // Adjust transformation
    resize: function () {
        this.height = 0.9 * this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.width = this.height;

        // Attach Bottom Side
        this.posX = (game.playSponsoredTimer.posX + game.playSponsoredTimer.width * 0.3) - this.width / 2;
        this.posY = game.playSponsoredTimer.height / 2 - this.height / 2;
    },
    // Draw object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image(), this.posX, this.posY, this.width, this.height);
    }
}

game.playScoreBox = {
    // Get handle to image
    image: document.getElementById("playScoreBoxImage"),
    // Declare object transform information
    org_width: 450 * game.scale,
    org_heigth: 160 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 3 * 2) - this.width / 2;
        this.posY = 0;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playScore = {
    // Get handle to div
    div: document.getElementById("playScoreBox"),
    // Declare object transform information
    org_width: 238 * game.scale,
    org_height: 76 * game.scale,
    width: 0,
    height: 0,
    org_posX: 0,
    org_posY: 29,
    posX: 0,
    posY: 0,
    // Declare member variables
    org_font_size: 60,
    font_size: 0,
    textResize: function () {
        // Declare references to screen objects
        var mySpan = $("#playScoreBoxSpan");
        var myDiv = $("#playScoreBox");
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
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = game.playScoreBox.posX + 156 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion));
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
        this.div.style.zIndex = 5;
    },
    // Update the score
    updateScore: function () {
        this.div.innerHTML = game.player.score;
    }
}

game.playLargePlaneLeft = {
    // Get handle to image
    image: document.getElementById("largePlaneTailLeft"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_heigth: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 170,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = 0;
        this.posY = Math.max(engine.height / 5, Math.min(50, this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion))));
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLargePlaneRight = {
    // Get handle to image
    image: document.getElementById("largePlaneTailRight"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_heigth: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 170,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = engine.width - this.width;
        this.posY = Math.max(engine.height / 5, Math.min(50, this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion))));
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playSmallPlaneLeft = {
    // Get handle to image
    image: document.getElementById("smallPlaneTailLeft"),
    // Declare object transform information
    org_width: 645 * game.scale,
    org_heigth: 271 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = 0;
        this.posY = engine.height / 2 + this.height / 3;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playSmallPlaneRight = {
    // Get handle to image
    image: document.getElementById("smallPlaneTailRight"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_heigth: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = engine.width - this.width;
        this.posY = engine.height / 2 + this.height / 5;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageBlue = {
    // Get handle to image
    image: document.getElementById("luggageBlue"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_heigth: 157 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageGreen = {
    // Get handle to image
    image: document.getElementById("luggageGreen"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_heigth: 144 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - (this.width / 2) - 95;
        this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggagePurple = {
    // Get handle to image
    image: document.getElementById("luggagePurple"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_heigth: 157 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - (this.width / 2) - 190;
        this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageRed = {
    // Get handle to image
    image: document.getElementById("luggageRed"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_heigth: 157 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - (this.width / 2) + 95;
        this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageYellow = {
    // Get handle to image
    image: document.getElementById("luggageYellow"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_heigth: 157 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - (this.width / 2) + 190;
        this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageCartLvl1 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl1"),
    // Declare object transform information
    org_width: 491 * game.scale,
    org_heigth: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageCartLvl2 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl2"),
    // Declare object transform information
    org_width: 780 * game.scale,
    org_heigth: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageCartLvl3 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl3"),
    // Declare object transform information
    org_width: 1065 * game.scale,
    org_heigth: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageCartLvl4 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl4"),
    // Declare object transform information
    org_width: 1370 * game.scale,
    org_heigth: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;
    },
    // Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};