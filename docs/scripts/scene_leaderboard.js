// JavaScript Document

// DEBUG
console.log("scene_leaderboard.js loaded successfully");

// -Leaderboard Scene
//   - Images
game.leaderboardBackground = {
        //Get handle to image
    image: document.getElementById("leaderboardBackground"),
        //Declare object transform information
    org_width: 1920 * game.scale,
    org_height: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
        //Adjust the object's transform
    resize: function () {
        this.width = engine.width;
        this.height = engine.height;
    },
        //Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.leaderboardBackdrop = {
        //Get handle to image
    image: document.getElementById("leaderboardBackdrop"),
        //Declare object transform information
    org_width: 700 * game.scale,
    org_height: 1080 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
        //Adjust the object's transform
    resize: function () {
        this.width = this.org_width * .90 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * .90 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = engine.width - this.width - (375 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
        this.posY = 25;
    },
        //Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};

game.title = {
        //Get handle to image
    image: document.getElementById("title"),
        //Declare object transform information
    org_width: 640 * game.scale,
    org_height: 277 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    org_posY: 50,
        //Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = 20;
        this.posY = Math.max(40, Math.min(50, this.org_posY * (1 - Math.max(engine.widthProportion, engine.heightProportion))));
    },
        //Draw the object
    draw: function () {
        this.resize();
        engine.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
};
//   - Buttons
game.menuButton = {
        //Get handle to image
    image: document.getElementById("menuButton"),
        //Declare object transform information
    org_width: 283 * game.scale,
    org_height: 138 * game.scale,
    width: 0,
    height: 0,
    org_posY: 50,
    posX: 0,
    posY: 0,
        //Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = engine.width - this.width;
        this.posY = Math.max(50, Math.min(40, this.org_posY - engine.heightDifference));
    },
        //Draw the object
    draw: function () {
        this.adjustStyle();
    },
        //Apply changes via CSS
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

game.retryButton = {
    //Get handle to image
    image: document.getElementById("retryButton"),
    //Declare object transform information
    org_width: 171 * game.scale,
    org_height: 82 * game.scale,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    //Initialize the object
    init: function () {
        //Add event listener to the button
        this.image.addEventListener("click", game.retryButton.retry);
    },
    //Adjust the object's transform
    resize: function () {
        this.width = this.org_width * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.height = this.org_height * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posX = 100 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        this.posY = engine.height - this.height - (50 * (1 - Math.max(engine.widthProportion, engine.heightProportion)));
    },
    //Draw the object
    draw: function () {
        this.adjustStyle();
    },
    //Apply changes via CSS
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
    //Actions when clicking this button
    retry: function () {
            //Inform Google the player is starting a new game
        //game.google.start();    --un note when ready for google analytics
            //Set the game state to Play Scene
        game.currState = game.gameState[0];
            //Reset the player object
        game.player.reset();
            //Reset leaderboard table
        game.top10players.hideTable();
            //Reset leaderboard animation?  --Do I need animation for BB leaderboard, since we don't have plane? 
        //game.leaderboardAnimation.resetElements();
            //Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
            //Hide all elements
        game.hideElements.hideAll();
            //Redraw all elements
        game.drawOnce();
            //Show the difficulty overlay before starting? --Is there going to be a difficulty option?
        //game.difficultyOverlay.open();
    }
};
game.retryButton.init(); //Force initialize object on first script load
