// JavaScript Document

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
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        this.posX = engine.width * 0.9 - this.width / 2;
        this.posY = 40 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
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
        this.timer.setup(game.playTime, true, "Game Timer");
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
        this.height = 0.8 * this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
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
        this.div.innerHTML = NumberFormat(game.player.score.toString());
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

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 592 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                this.posY + 320 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 392 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                this.posY + 320 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 355 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                this.posY + 230 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.fillStyle = "purple";
        ctx.arc(this.posX + 627 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                this.posY + 294 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                0,
                2 * Math.PI);
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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
    org_heigth: 140 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

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
    org_heigth: 156 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

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
    org_heigth: 78 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
    // Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

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

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 21 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 301 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 19 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 590 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 2
        ctx.rect(this.posX + 310 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 590 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 19 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 875 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 2
        ctx.rect(this.posX + 304 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 875 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 3
        ctx.rect(this.posX + 595 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 875 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
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

        /* let ctx = engine.context;
        // Cart 1
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#F41C63";
        ctx.rect(this.posX + 40 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 1180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 2
        ctx.rect(this.posX + 324 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 1180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 3
        ctx.rect(this.posX + 609 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 1180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        // Cart 4
        ctx.rect(this.posX + 900 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.posY + 5 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.width - 1180 * (1 - Math.max(engine.widthProportion, engine.heightProportion)),
                    this.height - 70 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        ctx.stroke();
        ctx.fill(); */
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

// - Gems
game.gemTriangle = {
	// Get handle to image
    image: document.getElementById("gemTriangle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemStar = {
	// Get handle to image
    image: document.getElementById("gemStar"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemHeart = {
	// Get handle to image
    image: document.getElementById("gemHeart"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemSquare = {
	// Get handle to image
    image: document.getElementById("gemSquare"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemCircle = {
	// Get handle to image
    image: document.getElementById("gemCircle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemPentagon = {
	// Get handle to image
    image: document.getElementById("gemPentagon"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.gemRectangle = {
	// Get handle to image
    image: document.getElementById("gemRectangle"),
    // Declare object transform information
    org_width: 99 * game.scale,
    org_heigth: 99 * game.scale,
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
    tailTopLeftScale: 0.6,
    tailTopRightScale: 0.75,
    tailBottomLeftScale: 0.55,
    tailBottomRightScale: 0.73,
    // Adjust the object's transform
    resize: function () {
        this.width = this.shapeScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.shapeScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Tail
        // - Top Left
        // this.width = this.tailTopLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.86 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.36 - this.height / 2;
        // - Bottom Left
        // this.width = this.tailBottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.82 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.27 - this.height / 2;
        // - Top Right
        // this.width = this.tailTopRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailTopRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.15 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.30 - this.height / 2;
        // - Bottom Right
        // this.width = this.tailBottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.tailBottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.438 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.26 - this.height / 2;

        // On Stand
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // - Attach to Stand
        // this.posX = (game.shapeStand.posX + game.shapeStand.width / 2) - this.width / 2;
        // this.posY = game.shapeStand.posY - this.height + 4 * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // On Luggage
        // - Blue
        // this.width = this.blueScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.blueScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageBlue.posX + game.playLuggageBlue.width / 2.1 - this.width / 2;
        // this.posY = game.playLuggageBlue.posY + game.playLuggageBlue.height / 1.8 - this.height / 2;
        // - Green
        // this.width = this.greenScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.greenScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageGreen.posX + game.playLuggageGreen.width / 2 - this.width / 2;
        // this.posY = game.playLuggageGreen.posY + game.playLuggageGreen.height / 2 - this.height / 2;
        // - Purple
        // this.width = this.purpleScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.purpleScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggagePurple.posX + game.playLuggagePurple.width / 2 - this.width / 2;
        // this.posY = game.playLuggagePurple.posY + game.playLuggagePurple.height / 2 - this.height / 2;
        // - Red
        // this.width = this.redScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.redScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageRed.posX + game.playLuggageRed.width / 2 - this.width / 2;
        // this.posY = game.playLuggageRed.posY + game.playLuggageRed.height / 2 - this.height / 2;
        // - Yellow
        // this.width = this.yellowScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.yellowScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLuggageYellow.posX + game.playLuggageYellow.width / 2 - this.width / 2;
        // this.posY = game.playLuggageYellow.posY + game.playLuggageYellow.height / 1.8 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.shapeStand = {
	// Get handle to image
    image: document.getElementById("shapeStand"),
    // Declare object transform information
    org_width: 27 * game.scale,
    org_heigth: 36 * game.scale,
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
        this.width = this.standScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.standScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));

        // this.posX = engine.width / 2 - this.width / 2;
        // this.posY = engine.height / 2 - this.height / 2;

        // Planes
        // - Top Left
        // this.width = this.topLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneLeft.posX + game.playLargePlaneLeft.width * 0.69 - this.width / 2;
        // this.posY = game.playLargePlaneLeft.posY + game.playLargePlaneLeft.height * 0.90 - this.height / 2;
        // - Bottom Left
        // this.width = this.bottomLeftScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomLeftScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneLeft.posX + game.playSmallPlaneLeft.width * 0.62 - this.width / 2;
        // this.posY = game.playSmallPlaneLeft.posY + game.playSmallPlaneLeft.height * 0.81 - this.height / 2;
        // - Top Right
        // this.width = this.topRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.topRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playLargePlaneRight.posX + game.playLargePlaneRight.width * 0.37 - this.width / 2;
        // this.posY = game.playLargePlaneRight.posY + game.playLargePlaneRight.height * 0.90 - this.height / 2;
        // - Bottom Right
        // this.width = this.bottomRightScale * this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.height = this.bottomRightScale * this.org_heigth * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        // this.posX = game.playSmallPlaneRight.posX + game.playSmallPlaneRight.width * 0.625 - this.width / 2;
        // this.posY = game.playSmallPlaneRight.posY + game.playSmallPlaneRight.height * 0.825 - this.height / 2;
    },
    // Draw the object
    draw: function () {
        this.resize();
        // engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}