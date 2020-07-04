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
game.lastTimeSized = new Date();        // Used to track window resizing without window events
game.timers = [];                       // Array for all timers

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
    const scr1 = await $.cachedScript("scripts/scene_start.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Game>[Start:Cache] ${textStatus}`);
    });
    const scr2 = await $.cachedScript("scripts/scene_play.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Game>[Play:Cache] ${textStatus}`);
    });
    const scr3 = await $.cachedScript("scripts/scene_end.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Game>[End:Cache] ${textStatus}`);
    });
    const scr4 = await $.cachedScript("scripts/scene_leaderboard.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Game>[Leaderboard:Cache] ${textStatus}`);
    });
    const scr5 = await $.cachedScript("scripts/game_manager.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Game>[Game Manager:Cache] ${textStatus}`);
    });
};
loadScripts();