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

// Touch bindings
game.touch = ['START', 'MOVE', 'END', 'LEAVE', 'CANCEL'];
for (var i = 0; i < game.touch.length; i++) {
    engine.input.bind(engine.touch[game.touch[i]], game.touch[i]);
}

// Declare Game Variables
// - Globals
game.scale = 1.0;                       // Scale for adjusting object sizes
game.timeoutTime = 120;					// Timeout time before returning to landing page
game.playTime = 150;                     // Time players have to compete
game.lastTimeSized = new Date();        // Used to track window resizing without window events
game.timers = [];                       // Array for all timers
game.firstPlayThrough = true;           // Flag for the first play through

// Sponsors
game.lastSponsor = ""; // Previously used sponsor
game.sponsor = ""; // Current sponsor
game.nextSponsor = ""; // Next sponsor
game.sponsorId = ""; // Current sponsor's ID

// - Player object information (persists through scenes)
game.player = {
    score: 0,
    initials: "ZZ",
    timeTotal: 0,   // Time in seconds
	// Reset player object variables
    reset: function () {
        this.score = 0;
        this.initials = "";
        this.timeTotal = 0;
		// Reset global score
		game.score = 0;
    }
};

// Shape List
game.shapesList = ["Circle", "Heart", "Pentagon", "Rectangle", "Square", "Star", "Triangle"];
// game.shapesList = ["Pentagon"];
game.shapesUsed = [];

// Luggage List
game.luggageList = ["Blue", "Green", "Purple", "Red", "Yellow"];

// Visible Debugging Console
game.myConsole = {
    
}

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

// Tutorial Overlay
game.tutorialOverlay = {
    div: document.getElementById("tutorialOverlay"),
    divContent: document.getElementById("tutorialContent"),
    closeButton: document.getElementById("tutorialCloseButton"),
    img01: document.getElementsByName("tutImg01"),
    img02: document.getElementsByName("tutImg02"),
    img03: document.getElementsByName("tutImg03"),
    tutImg01: document.getElementById("tutorialImg01"),
    tutImg02: document.getElementById("tutorialImg02"),
    tutImg03: document.getElementById("tutorialImg03"),
    tutTxt1: document.getElementById("tutorialTxt01"),
    tutTxt2: document.getElementById("tutorialTxt02"),
    tutTxt3: document.getElementById("tutorialTxt03"),
    tutorialPages: document.getElementById("tutorialPages"),
    org_header_size: 90,
    org_select_size: 53,
    org_action_size: 80,
    org_closer_size: 60,
    activeE: 0,
    altOpen: false,
    orgTimeStart: null,
    init: function () {
        // Images
        this.tutImg01.addEventListener("click", this.nextSlide);
        this.tutImg02.addEventListener("click", this.nextSlide);
        this.tutImg03.addEventListener("click", this.nextSlide);
        // Text
        this.tutTxt1.addEventListener("click", this.nextSlide);
        this.tutTxt2.addEventListener("click", this.nextSlide);
        this.tutTxt3.addEventListener("click", this.nextSlide);
        // Pagination
        $("#tutorialPages a:nth-child(1)").on("click", function () { game.tutorialOverlay.pagesUpdate(0); });
        $("#tutorialPages a:nth-child(2)").on("click", function () { game.tutorialOverlay.pagesUpdate(1); });
        $("#tutorialPages a:nth-child(3)").on("click", function () { game.tutorialOverlay.pagesUpdate(2); });
        // Close Button
        this.closeButton.addEventListener("click", this.close);
    },
    // Open the tutorial overlay
    open: function () {
        // Reset the height
        this.div.style.height = "0%";
        game.tutorialOverlay.div.style.display = "block";
        game.tutorialOverlay.divContent.style.display = "block";
        game.tutorialOverlay.div.style.height = "100%";

        for (var i = 0; i < game.tutorialOverlay.img01.length; i++) {
            game.tutorialOverlay.img01[i].style.display = "block";
        }
        for (var i = 0; i < game.tutorialOverlay.img02.length; i++) {
            game.tutorialOverlay.img02[i].style.display = "none";
        }
        for (var i = 0; i < game.tutorialOverlay.img03.length; i++) {
            game.tutorialOverlay.img03[i].style.display = "none";
        }

        $("#tutorialPages").css("display", "inline-block");

        // console.log("<Game:Tutorial> Open");
    },
    openAlternate: function () {
        // Reset the overlay
        game.tutorialOverlay.tutorialPages.childNodes[1].classList.add("active");
        game.tutorialOverlay.tutorialPages.childNodes[3].classList.remove("active");
        game.tutorialOverlay.tutorialPages.childNodes[5].classList.remove("active");
        // Reset the counter
        game.tutorialOverlay.activeE = 0;
        // Open the overlay
        game.tutorialOverlay.open();
        // console.log("<Game:Tutorial> Open Alternate");
        // Notify of alternate opening
        game.tutorialOverlay.altOpen = true;
        // Get the player's current play time
        // game.tutorialOverlay.orgTimeStart = Date.now() - game.playTimerBox.timeStart;
        game.playTimer.timer.pauseTimer();
        game.playTimer.playTime.pauseTimer();
    },
    // Close the tutorial overlay
    close: function () {
        game.tutorialOverlay.div.style.height = "0%";
        // console.log("<Game:Tutorial> Close");
        game.tutorialOverlay.startGame();
    },  
    resize: function () {
        this.divContent.style.fontSize = this.org_select_size * engine.preserveAspectRatio + "px";
        this.closeButton.style.fontSize = this.org_closer_size * engine.preserveAspectRatio + "px";
    },
    pagesUpdate: (key) => {
        game.tutorialOverlay.activeE = key - 1;
        game.tutorialOverlay.nextSlide();
    },
    nextSlide: function () {
        // Refresh the timeout timer
        game.timeoutOverlay.refreshTimer();
        // Get the active slide
        game.tutorialOverlay.activeE += 1;
        // Update the slide
        switch (game.tutorialOverlay.activeE) {
            case 0:
                game.tutorialOverlay.tutorialPages.childNodes[1].classList.add("active");
                game.tutorialOverlay.tutorialPages.childNodes[3].classList.remove("active");
                game.tutorialOverlay.tutorialPages.childNodes[5].classList.remove("active");
                for (var i = 0; i < game.tutorialOverlay.img01.length; i++) {
                    game.tutorialOverlay.img01[i].style.display = "block";
                }
                for (var i = 0; i < game.tutorialOverlay.img02.length; i++) {
                    game.tutorialOverlay.img02[i].style.display = "none";
                }
                for (var i = 0; i < game.tutorialOverlay.img03.length; i++) {
                    game.tutorialOverlay.img03[i].style.display = "none";
                }
                break;
            case 1:
                game.tutorialOverlay.tutorialPages.childNodes[1].classList.remove("active");
                game.tutorialOverlay.tutorialPages.childNodes[3].classList.add("active");
                game.tutorialOverlay.tutorialPages.childNodes[5].classList.remove("active");
                for (var i = 0; i < game.tutorialOverlay.img01.length; i++) {
                    game.tutorialOverlay.img01[i].style.display = "none";
                }
                for (var i = 0; i < game.tutorialOverlay.img02.length; i++) {
                    game.tutorialOverlay.img02[i].style.display = "block";
                }
                for (var i = 0; i < game.tutorialOverlay.img03.length; i++) {
                    game.tutorialOverlay.img03[i].style.display = "none";
                }
                break;
            case 2:
                game.tutorialOverlay.tutorialPages.childNodes[1].classList.remove("active");
                game.tutorialOverlay.tutorialPages.childNodes[3].classList.remove("active");
                game.tutorialOverlay.tutorialPages.childNodes[5].classList.add("active");
                for (var i = 0; i < game.tutorialOverlay.img01.length; i++) {
                    game.tutorialOverlay.img01[i].style.display = "none";
                }
                for (var i = 0; i < game.tutorialOverlay.img02.length; i++) {
                    game.tutorialOverlay.img02[i].style.display = "none";
                }
                for (var i = 0; i < game.tutorialOverlay.img03.length; i++) {
                    game.tutorialOverlay.img03[i].style.display = "block";
                }
                break;
            default:
                // Exit tutorial (aka start game)
                game.tutorialOverlay.close();
                // Start the game
                // game.tutorialOverlay.startGame();
                // Reset the overlay
                game.tutorialOverlay.tutorialPages.childNodes[1].classList.add("active");
                game.tutorialOverlay.tutorialPages.childNodes[3].classList.remove("active");
                game.tutorialOverlay.tutorialPages.childNodes[5].classList.remove("active");
                break;
        }
    },
    clickMe: () => {
        // console.log("Clicked!");
    },
    sceneTransition: function () {
        // console.log("<Game:TutorialOverlay> Transition Scenes");
        // Display the tutorial overlay if this is the first playthrough
        if (game.firstPlayThrough) {
            // Open tutorial overlay
            game.tutorialOverlay.open();
        } else {
            // Start the game
            this.startGame();
            // Activate tutorial helper
            game.playTutorial.play();
        }
    },
    startGame: function() {
        // If tutorial opened from the play scene
        if (game.tutorialOverlay.altOpen) {
            // Set the new end time based on time within the tutorial
            // game.playTimerBox.startTimerAlternate(Date.now() + (game.playTime - game.tutorialOverlay.orgTimeStart));
            // Start the game's timers
            game.playTimer.timer.unpauseTimer();
            game.playTimer.playTime.unpauseTimer();
            // Reset altOpen
            game.tutorialOverlay.altOpen = false;
            // Refresh the timeout timer
            game.timeoutOverlay.refreshTimer();
            // Redraw all elements
            // game.drawOnce();
        } else {
            // Otherwise, start the game
            // No longer the first play through
            game.firstPlayThrough = false;
            // Inform Google the user started playing a game
            game.google.start();
            // Clear the initials on the End Scene
            game.endPlayerInitials.clearInitials();
            // Reset the player object
            game.player.reset();
            // Reset the game manager
            game.manager.resetGame();
            // Refresh the timeout timer
            game.timeoutOverlay.refreshTimer();
            // Set the new game state to Play Scene
            game.currState = game.gameState[1];
            // Hide all elements
            game.hideElements.hideAll();
            // Start the game's timers
            game.playTimer.timer.unpauseTimer();
            game.playTimer.playTime.unpauseTimer();
            // Redraw all elements
            game.drawOnce();
        }
    },
    tester: (key) => {
        // console.log(`Key: ${key}`);
    }
};
game.tutorialOverlay.init();  //Force initialize all event listeners

// Sponsor control
game.sponsors = {
    sponsorArray: ['ARGO TEA', 'AUNTIE ANNES', 'BROOKSTONE', 'BSMOOTH', 'BURRITO BEACH', 'CHICAGO SPORTS', 'CNN', 'COACH', 'DUNKIN DONUTS', 'DUTY FREE STORE', 'FIELD', 'HUDSON', 'MAC COSMETICS', 'NUTS ON CLARK', 'ROCKY MOUNTAIN CHOCOLATE', 'SARAHS CANDIES', 'SHOE HOSPITAL', 'SPIRIT OF THE RED HORSE', 'TALIE'],
    sponsor: '',
    sponsorId: '',
    update: function() {
        this.sponsor = this.sponsorArray[Math.floor(Math.random() * (this.sponsorArray.length-1))];
        game.sponsor = this.sponsor;
    },
    // Get the sponsor
    getSponsor: function() {
        this.update();
        switch (this.sponsor) {
            case "ARGO TEA":
                this.sponsorId = "sponsorArgo";
                break;
            case "AUNTIE ANNES":
                this.sponsorId = "sponsorAuntieAnnes";
                break;
            case "BROOKSTONE":
                this.sponsorId = "sponsorBrookstone";
                break;
            case "BSMOOTH":
                this.sponsorId = "sponsorBSmooth";
                break;
            case "BURRITO BEACH":
                this.sponsorId = "sponsorBurritoBeach";
                break;
            case "CHICAGO SPORTS":
                this.sponsorId = "sponsorChicagoSports";
                break;
            case "CNN":
                this.sponsorId = "sponsorCNN";
                break;
            case "COACH":
                this.sponsorId = "sponsorCoach";
                break;
            case "DUNKIN DONUTS":
                this.sponsorId = "sponsorDunkinDonuts";
                break;
            case "DUTY FREE STORE":
                this.sponsorId = "sponsorDutyFreeStore";
                break;
            case "FIELD":
                this.sponsorId = "sponsorField";
                break;
            case "HUDSON":
                this.sponsorId = "sponsorHudson";
                break;
            case "MAC COSMETICS":
                this.sponsorId = "sponsorMacCosmetics";
                break;
            case "NUTS ON CLARK":
                this.sponsorId = "sponsorNutsOnClark";
                break;
            case "ROCKY MOUNTAIN CHOCOLATE":
                this.sponsorId = "sponsorRockyMountainChocolate";
                break;
            case "SARAHS CANDIES":
                this.sponsorId = "sponsorSarahsCandies";
                break;
            case "SHOE HOSPITAL":
                this.sponsorId = "sponsorShoeHospital";
                break;
            case "SPIRIT OF THE RED HORSE":
                this.sponsorId = "sponsorSpiritOfTheRedHorse";
                break;
            case "TALIE":
                this.sponsorId = "sponsorTalie";
                break;
            default:
                this.sponsorId = "__INVALID__";
                break;
        }
        // Update the game's sponsor
        game.sponsorId = this.sponsorId;
        
        // Return the sponsor ID
        return this.sponsorId;
    }
};

// Load dependency scripts
async function loadScripts() {
    // Load scripts synchronously
    const scr1 = await $.cachedScript("scripts/scene_start.js?v=0.1.0").done((script, textStatus) => {
        // console.log(`<Game>[Start:Cache] ${textStatus}`);
    });
    const scr2 = await $.cachedScript("scripts/scene_play.js?v=0.1.0").done((script, textStatus) => {
        // console.log(`<Game>[Play:Cache] ${textStatus}`);
    });
    const scr3 = await $.cachedScript("scripts/scene_end.js?v=0.1.0").done((script, textStatus) => {
        // console.log(`<Game>[End:Cache] ${textStatus}`);
    });
    const scr4 = await $.cachedScript("scripts/scene_leaderboard.js?v=0.1.0").done((script, textStatus) => {
        // console.log(`<Game>[Leaderboard:Cache] ${textStatus}`);
    });
    const scr5 = await $.cachedScript("scripts/game_manager.js?v=0.1.0").done((script, textStatus) => {
        // console.log(`<Game>[Game Manager:Cache] ${textStatus}`);
    });
};
loadScripts();