// JavaScript Document

game.playDEBUGIncreasePoints = {
    div: document.getElementById("myConsole"),
    width: 300,
    height: 50,
    posX: 0,
    posY: 0,
    level: 0,
    init: function() {
        this.buildbutton();
        this.div.addEventListener("click", game.playDEBUGIncreasePoints.clickMe);
    },
    buildbutton: function() {
        $(`#${this.div.id}`).html("Increase Level");
    },
    resize: function() {
        this.posX = engine.width - this.width;
        this.posY = game.playTitle.posY + game.playTitle.height + engine.height * 0.05;
    },
    adjustStyle: function() {
        this.resize();
        this.div.style.position = "absolute";
        this.div.style.display = "flex";
        this.div.style.backgroundColor = "gray";
        this.div.style.color = "white";
        this.div.style.fontFamily = "BeBasNeue-Regular";
        this.div.style.fontSize = "36pt";
        this.div.style.textAlign = "center";
        this.div.style.alignContent = "center";
        this.div.style.justifyContent = "center";
        this.div.style.left = this.posX.toString() + "px";
        this.div.style.top = this.posY.toString() + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.zIndex = 999;
    },
    draw: function() {
        this.adjustStyle();
    },
    clickMe: function(e) {
        if (game.playDEBUGIncreasePoints.level < game.manager.pointsGoal.length) {
            console.log("Clicked");
            game.player.score = game.manager.pointsGoal[game.playDEBUGIncreasePoints.level++];
        }
        // Prevent this event from propagation (being called multiple times)
        e.stopPropagation();
        // Cancel the event if it's cancelable
        return e.preventDefault();
    }
}
game.playDEBUGIncreasePoints.init();

//   - Images
game.playBackground = {
    // Get handle to image
    image: document.getElementById("playBackground"),
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

game.playTitle = {
    // Get handle to image
    image: document.getElementById("playTitle"),
    // Declare object transform information
    org_width: 298 * game.scale,
    org_height: 64 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = engine.width * 0.9 - this.width / 2;
        this.posY = 40 * engine.preserveAspectRatio;
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
    org_height: 130 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

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
        this.timer.setup(game.playTime, true, "Game Timer");
        game.timers.push(this.timer);
        this.playTime.setup(0, true, "Play Time", "up");
        game.timers.push(this.playTime);
    },
    // Adjust the object's transform
    resize: function () {

        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (game.playSponsoredTimer.posX + game.playSponsoredTimer.width * 0.7) - this.width / 2;
        this.posY = game.playSponsoredTimer.height / 2 - this.height / 2;

        // Adjust font size
        this.font_size = this.org_font_size * engine.preserveAspectRatio;
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
        this.timer.setup(game.playTime, true, "Game Timer");
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
        this.height = 0.8 * this.org_height * engine.preserveAspectRatio;
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
    org_height: 160 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

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
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;
        this.posX = game.playScoreBox.posX + 156 * engine.preserveAspectRatio;
        this.posY = this.org_posY * engine.preserveAspectRatio;
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
        this.div.innerHTML = NumberFormat(game.player.score.toString());
    }
}

game.playLargePlaneLeft = {
    // Get handle to image
    image: document.getElementById("largePlaneTailLeft"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_height: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 1
    posSpawnLevel1: 0,
    posLoadLevel1: 0,
    posExitLevel1: 0,
    // - Level 2
    posSpawnLevel2: 0,
    posLoadLevel2: 0,
    posExitLevel2: 0,
    // - Level 3
    posSpawnLevel3: 0,
    posLoadLevel3: 0,
    posExitLevel3: 0,
    // - Level 4
    posSpawnLevel4: 0,
    posLoadLevel4: 0,
    posExitLevel4: 0,
    org_posY: 170,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = 0;
        this.posY = Math.max(engine.height / 5, Math.min(50, this.org_posY * engine.preserveAspectRatio));

        // Game Level Based Positions
        // - Level 1
        //   - Spawn
        this.posSpawnLevel1 = new Vector2D(
            engine.width + 50,
            engine.height / 2 - this.height / 2);
        //   - Load
        this.posLoadLevel1 = new Vector2D(
            engine.width / 2 - this.width / 2,
            engine.height / 2 - this.height / 2);
        //   - Exit
        this.posExitLevel1 = new Vector2D(
            -this.width * 1.2,
            engine.height / 2 - this.height / 2);
        
        // - Level 2
        //   - Spawn
        this.posSpawnLevel2 = new Vector2D(
            engine.width + 50,
            engine.height / 3 - this.height / 2);
        //   - Load
        this.posLoadLevel2 = new Vector2D(
            0.0,
            engine.height / 3 - this.height / 2);
        //   - Exit
        this.posExitLevel2 = new Vector2D(
            -this.width * 1.2,
            engine.height / 3 - this.height / 2);

        // - Level 3
        //   - Spawn
        this.posSpawnLevel3 = new Vector2D(
            -this.width * 1.2,
            engine.height * 0.35 - this.height / 2);
        //   - Load
        this.posLoadLevel3 = new Vector2D(
            0.0,
            engine.height * 0.35 - this.height / 2);
        //   - Exit
        this.posExitLevel3 = new Vector2D(
            0.0,
            engine.height * 0.35 - this.height / 2);

        // - Level 4
        //   - Spawn
        this.posSpawnLevel4 = new Vector2D(
            -this.width * 1.2,
            engine.height * 0.35 - this.height / 2);
        //   - Load
        this.posLoadLevel4 = new Vector2D(
            0.0,
            engine.height * 0.35 - this.height / 2);
        //   - Exit
        this.posExitLevel4 = new Vector2D(
            -this.width * 1.2,
            engine.height * 0.35 - this.height / 2);

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 592 * engine.preserveAspectRatio,
                this.posY + 320 * engine.preserveAspectRatio,
                180 * engine.preserveAspectRatio,
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Top Left Plane";
    }
};
game.playLargePlaneLeft.draw();

game.playLargePlaneRight = {
    // Get handle to image
    image: document.getElementById("largePlaneTailRight"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_height: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 2
    posSpawnLevel2: 0,
    posLoadLevel2: 0,
    posExitLevel2: 0,
    // - Level 3
    posSpawnLevel3: 0,
    posLoadLevel3: 0,
    posExitLevel3: 0,
    // - Level 4
    posSpawnLevel4: 0,
    posLoadLevel4: 0,
    posExitLevel4: 0,
    org_posY: 170,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = engine.width - this.width;
        this.posY = Math.max(engine.height / 5, Math.min(50, this.org_posY * engine.preserveAspectRatio));

        // Game Level Based Positions
        // - Level 2
        //   - Spawn
        this.posSpawnLevel2 = new Vector2D(
            engine.width + 50,
            engine.height / 1.8 - this.height / 2);
        //   - Load
        this.posLoadLevel2 = new Vector2D(
            engine.width - this.width,
            engine.height / 1.8 - this.height / 2);
        //   - Exit
        this.posExitLevel2 = new Vector2D(
            engine.width + 50,
            engine.height / 1.8 - this.height / 2);

        // - Level 3
        //   - Spawn
        this.posSpawnLevel3 = new Vector2D(
            engine.width + 50,
            engine.height * 0.45 - this.height / 2);
        //   - Load
        this.posLoadLevel3 = new Vector2D(
            engine.width - this.width,
            engine.height * 0.45 - this.height / 2);
        //   - Exit
        this.posExitLevel3 = new Vector2D(
            engine.width + 50,
            engine.height * 0.45 - this.height / 2);

        // - Level 4
        //   - Spawn
        this.posSpawnLevel4 = new Vector2D(
            engine.width + 50,
            engine.height * 0.34 - this.height / 2);
        //   - Load
        this.posLoadLevel4 = new Vector2D(
            engine.width - this.width,
            engine.height * 0.34 - this.height / 2);
        //   - Exit
        this.posExitLevel4 = new Vector2D(
            engine.width + 50,
            engine.height * 0.34 - this.height / 2);

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 392 * engine.preserveAspectRatio,
                this.posY + 320 * engine.preserveAspectRatio,
                180 * engine.preserveAspectRatio,
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Top Right Plane";
    }
};
game.playLargePlaneRight.draw();

game.playSmallPlaneLeft = {
    // Get handle to image
    image: document.getElementById("smallPlaneTailLeft"),
    // Declare object transform information
    org_width: 645 * game.scale,
    org_height: 271 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 3
    posSpawnLevel3: 0,
    posLoadLevel3: 0,
    posExitLevel3: 0,
    // - Level 4
    posSpawnLevel4: 0,
    posLoadLevel4: 0,
    posExitLevel4: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = 0;
        this.posY = engine.height / 2 + this.height / 3;

        // Game Level Based Positions
        // - Level 3
        //   - Spawn
        this.posSpawnLevel3 = new Vector2D(
            -this.width * 1.2,
            engine.height / 2 + this.height / 3);
        //   - Load
        this.posLoadLevel3 = new Vector2D(
            0.0,
            engine.height / 2 + this.height / 3);
        //   - Exit
        this.posExitLevel3 = new Vector2D(
            -this.width * 1.2,
            engine.height / 2 + this.height / 3);

        // - Level 4
        //   - Spawn
        this.posSpawnLevel4 = new Vector2D(
            -this.width * 1.2,
            engine.height * 0.6 - this.height / 2);
        //   - Load
        this.posLoadLevel4 = new Vector2D(
            0.0,
            engine.height * 0.6 - this.height / 2);
        //   - Exit
        this.posExitLevel4 = new Vector2D(
            -this.width * 1.2,
            engine.height * 0.6 - this.height / 2);

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 355 * engine.preserveAspectRatio,
                this.posY + 230 * engine.preserveAspectRatio,
                180 * engine.preserveAspectRatio,
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Bottom Left Plane";
    }
};
game.playSmallPlaneLeft.draw();

game.playSmallPlaneRight = {
    // Get handle to image
    image: document.getElementById("smallPlaneTailRight"),
    // Declare object transform information
    org_width: 924 * game.scale,
    org_height: 345 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 4
    posSpawnLevel4: 0,
    posLoadLevel4: 0,
    posExitLevel4: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = engine.width - this.width;
        this.posY = engine.height / 2 + this.height / 5;

        // Game Level Based Positions
        // - Level 4
        //   - Spawn
        this.posSpawnLevel4 = new Vector2D(
            engine.width + 50,
            engine.height * 0.6 - this.height / 2);
        //   - Load
        this.posLoadLevel4 = new Vector2D(
            engine.width - this.width,
            engine.height * 0.6 - this.height / 2);
        //   - Exit
        this.posExitLevel4 = new Vector2D(
            engine.width + 50,
            engine.height * 0.6 - this.height / 2);

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 627 * engine.preserveAspectRatio,
                this.posY + 294 * engine.preserveAspectRatio,
                180 * engine.preserveAspectRatio,
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Bottom Right Plane";
    }
};
game.playSmallPlaneRight.draw();

game.playLuggageBlue = {
    // Get handle to image
    image: document.getElementById("luggageBlue"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_height: 157 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // this.posX = (engine.width / 2) - this.width / 2;
        // this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageGreen = {
    // Get handle to image
    image: document.getElementById("luggageGreen"),
    // Declare object transform information
    org_width: 93 * game.scale,
    org_height: 144 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // this.posX = (engine.width / 2) - (this.width / 2) - 95;
        // this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggagePurple = {
    // Get handle to image
    image: document.getElementById("luggagePurple"),
    // Declare object transform information
    org_width: 86 * game.scale,
    org_height: 140 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // this.posX = (engine.width / 2) - (this.width / 2) - 190;
        // this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageRed = {
    // Get handle to image
    image: document.getElementById("luggageRed"),
    // Declare object transform information
    org_width: 97 * game.scale,
    org_height: 156 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // this.posX = (engine.width / 2) - (this.width / 2) + 95;
        // this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageYellow = {
    // Get handle to image
    image: document.getElementById("luggageYellow"),
    // Declare object transform information
    org_width: 125 * game.scale,
    org_height: 78 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        // this.posX = (engine.width / 2) - (this.width / 2) + 190;
        // this.posY = (engine.height - this.height) - 190;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.playLuggageCartLvl1 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl1"),
    // Declare object transform information
    org_width: 491 * game.scale,
    org_height: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 1
    posSpawnLevel1: 0,
    posLoadLevel1: 0,
    posExitLevel1: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;

        // Game Level Based Positions
        // - Level 1
        //   - Spawn
        this.posSpawnLevel1 = new Vector2D(
            -this.width * 1.2,
            engine.height - this.height);
        //   - Load
        this.posLoadLevel1 = new Vector2D(
            engine.width / 2 - this.width / 2,
            engine.height - this.height);
        //   - Exit
        this.posExitLevel1 = new Vector2D(
            engine.width + 50,
            engine.height - this.height);

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 21 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 301 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Luggage Cart Level 1";
    }
};

game.playLuggageCartLvl2 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl2"),
    // Declare object transform information
    org_width: 780 * game.scale,
    org_height: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 2
    posSpawnLevel2: 0,
    posLoadLevel2: 0,
    posExitLevel2: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;

        // Game Level Based Positions
        // - Level 2
        //   - Spawn
        this.posSpawnLevel2 = new Vector2D(
            -this.width * 1.2,
            engine.height - this.height);
        //   - Load
        this.posLoadLevel2 = new Vector2D(
            engine.width / 2 - this.width / 2,
            engine.height - this.height);
        //   - Exit
        this.posExitLevel2 = new Vector2D(
            engine.width + 50,
            engine.height - this.height);

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 19 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 590 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 2
        ctx.rect(this.posX + 310 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 590 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Luggage Cart Level 2";
    }
};

game.playLuggageCartLvl3 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl3"),
    // Declare object transform information
    org_width: 1065 * game.scale,
    org_height: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 3
    posSpawnLevel3: 0,
    posLoadLevel3: 0,
    posExitLevel3: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;

        // Game Level Based Positions
        // - Level 3
        //   - Spawn
        this.posSpawnLevel3 = new Vector2D(
            -this.width * 1.2,
            engine.height - this.height);
        //   - Load
        this.posLoadLevel3 = new Vector2D(
            engine.width * 0.6 - this.width / 2,
            engine.height - this.height);
        //   - Exit
        this.posExitLevel3 = new Vector2D(
            engine.width + 50,
            engine.height - this.height);

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 19 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 875 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 2
        ctx.rect(this.posX + 304 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 875 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 3
        ctx.rect(this.posX + 595 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 875 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Luggage Cart Level 3";
    }
};

game.playLuggageCartLvl4 = {
    // Get handle to image
    image: document.getElementById("luggageCartLvl4"),
    // Declare object transform information
    org_width: 1370 * game.scale,
    org_height: 170 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    // Game Level Based Positions
    // - Level 4
    posSpawnLevel4: 0,
    posLoadLevel4: 0,
    posExitLevel4: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * engine.preserveAspectRatio;
        this.height = this.org_height * engine.preserveAspectRatio;

        this.posX = (engine.width / 2) - this.width / 2;
        this.posY = engine.height - this.height;

        // Game Level Based Positions
        // - Level 1
        //   - Spawn
        this.posSpawnLevel4 = new Vector2D(
            -this.width * 1.2,
            engine.height - this.height);
        //   - Load
        this.posLoadLevel4 = new Vector2D(
            engine.width / 2 - this.width / 2,
            engine.height - this.height);
        //   - Exit
        this.posExitLevel4 = new Vector2D(
            engine.width + 50,
            engine.height - this.height);

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 40 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 1180 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 2
        ctx.rect(this.posX + 324 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 1180 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 3
        ctx.rect(this.posX + 609 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 1180 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        // Cart 4
        ctx.rect(this.posX + 900 * engine.preserveAspectRatio,
                    this.posY + 5 * engine.preserveAspectRatio,
                    this.width - 1180 * engine.preserveAspectRatio,
                    this.height - 70 * engine.preserveAspectRatio;
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    toString: function() {
        return "Luggage Cart Level 4";
    }
};

// - Gems
game.gemTriangle = {
	// Get handle to image
    image: document.getElementById("gemTriangle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    x + obj.width * 0.82 - this.width / 2,
                    // Y
                    y + obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    x + obj.width * 0.15 - this.width / 2,
                    // Y
                    y + obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    x + obj.width * 0.438 - this.width / 2,
                    // Y
                    y + obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Triangle";
    }
};

game.gemStar = {
	// Get handle to image
    image: document.getElementById("gemStar"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;
        
        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Star";
    }
};

game.gemHeart = {
	// Get handle to image
    image: document.getElementById("gemHeart"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Heart";
    }
};

game.gemSquare = {
	// Get handle to image
    image: document.getElementById("gemSquare"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempArray = [], tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Square";
    }
};

game.gemCircle = {
	// Get handle to image
    image: document.getElementById("gemCircle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Circle";
    }
};

game.gemPentagon = {
	// Get handle to image
    image: document.getElementById("gemPentagon"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    -this.height + 4 * engine.preserveAspectRatio);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Pentagon";
    }
};

game.gemRectangle = {
	// Get handle to image
    image: document.getElementById("gemRectangle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_height: 99 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    shapeScale: 1.0,
    blueScale: 0.6,
    greenScale: 0.65,
    purpleScale: 0.6,
    redScale: 0.67,
    yellowScale: 0.5,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    tailTopLeftScale: 0.75,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.shapeScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;
        console.log(`${getNameOfType(obj.type)} \ ${loc}`);
        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "ShapeStand":
                if (typeof loc !== "undefined")
                {
                    switch(loc) {
                        case "TopLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "TopRight":
                            tempDims = new Vector2D(
                                // Width
                                this.topRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.topRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomLeft":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                            break;
                        case "BottomRight":
                            tempDims = new Vector2D(
                                // Width
                                this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                                // Height
                                this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                            break;
                    }
                }
                console.log(`Position:\n${tempDims}`);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    this.height + 4 * engine.preserveAspectRatio);
                    console.log(`Dimensions:\n${tempPos}`);
                break;
            case "LuggageBlue":
                tempDims = new Vector2D(
                    // Width
                    this.blueScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.blueScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2.1 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "LuggageGreen":
                tempDims = new Vector2D(
                    // Width
                    this.greenScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.greenScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggagePurple":
                tempDims = new Vector2D(
                    // Width
                    this.purpleScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.purpleScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageRed":
                tempDims = new Vector2D(
                    // Width
                    this.redScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.redScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 2 - this.height / 2);
                break;
            case "LuggageYellow":
                tempDims = new Vector2D(
                    // Width
                    this.yellowScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.yellowScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width / 2 - this.width / 2,
                    // Y
                    obj.height / 1.8 - this.height / 2);
                break;
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.875 - this.width / 2,
                    // Y
                    obj.height * 0.39 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.82 - this.width / 2,
                    // Y
                    obj.height * 0.27 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.tailTopRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailTopRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.15 - this.width / 2,
                    // Y
                    obj.height * 0.30 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.tailBottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.tailBottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.438 - this.width / 2,
                    // Y
                    obj.height * 0.26 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Rectangle";
    }
};

game.shapeStand = {
	// Get handle to image
    image: document.getElementById("shapeStand"),
    // Declare object transform information
    org_width: 27 * game.scale,
    org_height: 36 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    standScale: 1.0,
    topLeftScale: 0.7,
    topRightScale: 0.71,
    bottomLeftScale: 0.65,
    bottomRightScale: 0.67,
    // Adjust the object's transform
    resize: function () {
        this.width = this.standScale * this.org_width * engine.preserveAspectRatio;
        this.height = this.standScale * this.org_height * engine.preserveAspectRatio;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    },
    // Return the transform, given an attached obj (optional:) and location
    getTransform: function(obj, loc) {
        // Temporary variables to store, combined, and return
        var tempDims, tempPos, x = obj.position.x, y = obj.position.y;

        // Determine who the requesting object is
        switch(getNameOfType(obj.type)) {
            case "PlaneLeftTop":
                tempDims = new Vector2D(
                    // Width
                    this.topLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.topLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.69 - this.width / 2,
                    // Y
                    obj.height * 0.90 - this.height / 2);
                break;
            case "PlaneLeftBottom":
                tempDims = new Vector2D(
                    // Width
                    this.bottomLeftScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.bottomLeftScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.62 - this.width / 2,
                    // Y
                    obj.height * 0.81 - this.height / 2);
                break;
            case "PlaneRightTop":
                tempDims = new Vector2D(
                    // Width
                    this.topRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.topRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.37 - this.width / 2,
                    // Y
                    obj.height * 0.90 - this.height / 2);
                break;
            case "PlaneRightBottom":
                tempDims = new Vector2D(
                    // Width
                    this.bottomRightScale * this.org_width * engine.preserveAspectRatio,
                    // Height
                    this.bottomRightScale * this.org_height * engine.preserveAspectRatio);
                tempPos = new Vector2D(
                    // X
                    obj.width * 0.625 - this.width / 2,
                    // Y
                    obj.height * 0.825 - this.height / 2);
                break;
        }

        return JSON.stringify({
            width: `${tempDims.x}`,
            height: `${tempDims.y}`,
            x: `${tempPos.x}`,
            y: `${tempPos.y}`});
    },
    toString: function() {
        return "Shape Stand";
    }
}