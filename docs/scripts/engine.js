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
// FILE NAME:		engine.js
// DESCRIPTION:		Based on the atom.js game engine, but with many tweaks
//					specific to our purposes. The engine handles four
//					extremely important tasks: normalizes frame rates
//					across all browsers, provides key and mouse event
//					abstraction, handles window resizing, and provides
//					access to a game loop object called GameObject.
// REFERENCES:		The origin and initial author for atom.js is unknown, 
//					as the files came packed with our textbook for WBG370:
//					Burchard, E. (2013). The web game developer's
//					cookbook: Using JavaScript and HTML5 to develop games
//					(VitalSource Bookshelf version). New Jersey: Pearson
//					Education, Inc. Retrieved from vbk://9781269871464.
// LAST UPDATE:		05/07/2020 - Created main engine.js file to work from
//========================================================================

// Declare important engine variables
var engine, GameObject, c, eventCode, _requestAnimationFrame;

// Retrieve the index of an object prototype stored within the game
var __indexOf = Array.prototype.indexOf
    || function (item) {
        // Search for the item and return its index
        for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] === item) return i;
        }
        // No reference index found for the item
        return -1;
    },
    // Append an array of arguments to function fn after the previous function me
    __bind = function (fn, me) {
        return function () {
			// Return the function with its new attributes
            return fn.apply(me, arguments);
        };
    };

// Access the current browser's framerate for maximum control over animation
_requestAnimationFrame = 
	// Multibrowser support options:
    window.requestAnimationFrame
    || // - Generic
    window.webkitRequestAnimationFrame
    || // - Chrome, Safari, Opera
    window.mozRequestAnimationFrame
    || // - Firefox
    window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || // - Edge
    function (callback) {
        return window.setTimeout((function () {
            return callback(1000 / 60);
        }), 1000 / 60);
    };

// Initialize engine
window.engine = engine = {};

// Time of a resize event
engine.timeSizing = new Date();

// Setup user input control, bindings, and handling
engine.input = {
	// Initialize action types
    _bindings: {},
    _down: {},
    _pressed: {},
    _released: [],

	// Initialize the mouse coordinates to (0,0)
    mouse: {
        x: 0,
        y: 0
    },

	// Bind supplied key/button to the specified event
    bind: function (key, event) {
        return this._bindings[key] = event;
    },

	// Definte functions for when the key/button is pressed
    onkeydown: function (e) {
        var event;

		// Pull the binding event
        event = this._bindings[eventCode(e)];

		// Return if no event was previously defined
        if (!event) {
            return;
        }

		// If the key/button wasn't already identified as pressed, toggle it on
        if (!this._down[event]) {
            this._pressed[event] = true;
        }

		// Set the key/button into the down state
        this._down[event] = true;
        // Prevent this event from propagation (being called multiple times)
        e.stopPropagation();
        // Cancel the event if it's cancelable
        return e.preventDefault();
    },

	// Define functions for when the key/button is released
    onkeyup: function (e) {
        var event;

		// Pull the binding event
        event = this._bindings[eventCode(e)];

		// Return if no event was previously defined
        if (!event) {
            return;
        }

		// Set the key/button into the released state
        this._released.push(event);
		// Prevent this event from propagation (being called multiple times)
        e.stopPropagation();
		// Cancel the event if it's cancelable
        return e.preventDefault();
    },

	// Clear the pressed state
    clearPressed: function () {
        var event, _i, _len, _ref;

		// Define reference to action item(s)
        _ref = this._released;

		// Clear the down state from referenced item(s)
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            event = _ref[_i];
            this._down[event] = false;
        }

		// Clear the array of released items
        this._released = [];

		// Clear the object of pressed items
        return this._pressed = {};
    },

	// Return the event of the calling item when it's pressed
    pressed: function (event) {
        return this._pressed[event];
    },

	// Return the event of the calling item when it's down
    down: function (event) {
        return this._down[event];
    },

	// Return the index of the calling item(s) when released
    released: function (event) {
        return __indexOf.call(this._released, event) >= 0;
    },

	// When the mouse moves, update it's (x, y) coordinates and return
    onmousemove: function (e) {
        this.mouse.x = e.pageX;
        return this.mouse.y = e.pageY;
    },

	// When a mouse button is pressed, set it in a down state
    onmousedown: function (e) {
        return this.onkeydown(e);
    },

	// When a mouse button is released, set it to an up state
    onmouseup: function (e) {
        return this.onkeyup(e);
    },

	// When the mouse wheel is scrolled, toggle it's down/up state
    onmousewheel: function (e) {
        this.onkeydown(e);
        return this.onkeyup(e);
    },

	// (Firefox only) Return the context menu during a mouse right click
    oncontextmenu: function (e) {
        if (this._bindings[engine.button.RIGHT]) {
            e.stopPropagation();
            return e.preventDefault();
        }
    }
};

// Bind the engine's input handlers to the document's handlers
document.onkeydown = engine.input.onkeydown.bind(engine.input);
document.onkeyup = engine.input.onkeyup.bind(engine.input);
document.onmouseup = engine.input.onmouseup.bind(engine.input);

// Assign values to mouse buttons
engine.button = {
    LEFT: -1,
    MIDDLE: -2,
    RIGHT: -3,
    WHEELDOWN: -4,
    WHEELUP: -5
};

// Assign values to keyboard input for special keys
engine.key = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};

// Assign values to keyboard input for alpha keys
for (c = 65; c <= 90; c++) {
    engine.key[String.fromCharCode(c)] = c;
}

// Create an eventCode for mouse button clicks
eventCode = function (e) {
	// Return the event key code whether the key's state is up or down
    if (e.type === 'keydown' || e.type === 'keyup') {
        return e.keyCode;
    } else if (e.type === 'mousedown' || e.type === 'mouseup') {
		// During up/down mouse events, return the calling button
        switch (e.button) {
            case 0:
                return engine.button.LEFT;
            case 1:
                return engine.button.MIDDLE;
            case 2:
                return engine.button.RIGHT;
        }
    } else if (e.type === 'mousewheel') {
		// During mousewheel events, return the direction of the scroll
        if (e.wheel > 0) {
            return engine.button.WHEELUP;
        } else {
            return engine.button.WHEELDOWN;
        }
    }
};

// Initialize canvas hooks
engine.canvas = document.getElementsByTagName("canvas")[0];
// Set canvas size and position
engine.canvas.style.position = "absolute";
engine.canvas.style.top = "0px";
engine.canvas.style.left = "0px";
// Get canvas context (required for drawing)
engine.context = engine.canvas.getContext("2d");

// Bind the engine's mouse events to the canvas
engine.canvas.onmousemove = engine.input.onmousemove.bind(engine.input);
engine.canvas.onmousedown = engine.input.onmousedown.bind(engine.input);
engine.canvas.onmouseup = engine.input.onmouseup.bind(engine.input);
engine.canvas.onmousewheel = engine.input.onmousewheel.bind(engine.input);
// engine.canvas.oncontextmenu = engine.input.oncontextmenu.bind(engine.input); // (Firefox only)

// React proportions
engine.widthProportion = (Math.abs(1920 - window.innerWidth) / 1920).toPrecision(4);
engine.heightProportion = (Math.abs(1080 - window.innerHeight) / 1080).toPrecision(4);

// DEBUG
// Report viewport dimensions when the window loads
window.onload = function () {
    console.log("(w: " + (engine.widthProportion * 100).toPrecision(4) + "%, h: " + (engine.heightProportion * 100).toPrecision(4) + "%)");
    console.log("(w: " + engine.canvas.width + ", h: " + engine.canvas.height + ")");
};

engine.windowControl = {
    updateWindow: () => {
        engine.timeSizing = Date.now();
    
        // Set canvas dimensions to the inner browser dimensions
        engine.canvas.width = window.innerWidth;
        engine.canvas.height = window.innerHeight;

        // Find the dimension differences from a target dimension (1920x1080)
        engine.widthDifference = 1920 - window.innerWidth;
        engine.heightDifference = 1080 - window.innerHeight;

        // Aspect ratios
        engine.targetRatio = 1920 / 1080;
        engine.aspectRatio = window.innerWidth / window.innerHeight;

        // Find the dimensional proportion ratios
        engine.widthProportion = ((engine.widthDifference) / 1920).toPrecision(4);
        engine.heightProportion = ((engine.heightDifference) / 1080).toPrecision(4);
        engine.dimensionProportion = engine.widthProportion > engine.heightProportion ? engine.widthProportion : engine.heightProportion;

        // Set the engine's width to the canvas' width
        engine.width = engine.canvas.width;

        // DEBUG
        // Report the viewport dimensions when the window is resized
        console.log("<ENGINE> (w: " + engine.canvas.width + ", h: " + engine.canvas.height + ")");

        // Return and set the engine's height to the canvas' height
        return engine.height = engine.canvas.height;
    }
};

// Handle window resizing events
window.onresize = function (e) {
    return engine.windowControl.updateWindow();
};
window.onresize(); // Force a resize call as the script is loaded for the first time

// Handle mobile device reorientation
$(document).on('pagecreate', (event) => {
    $(window).on('orientationchange', () => {
        return engine.windowControl.updateWindow();
    });
});

// Primary game loop
GameObject = (function () {
	// Declare all prototype (abstract functions)
    function GameObject() {};
    GameObject.prototype.update = function (dt) {};
    GameObject.prototype.draw = function () {};
    GameObject.prototype.run = function () {
        var s;
		// Check if the game is running and return
        if (this.running) {
            return;
        }
		// Since the game is not running...
		// Set the game in a running state
        this.running = true;

		// Bind the running state
        s = __bind(function () {
            if (!this.running) {
                return;
            }
			// Perform a step (frame)
            this.step();
			// Return framerate performance data
            return _requestAnimationFrame(s);
        }, this);
		// Update the previous step with this step
        this.lastStep = Date.now();
		// Return framerate performance data
        return _requestAnimationFrame(s);
    };

    GameObject.prototype.stop = function () {
		// Set the game in a stopped/paused state
        return this.running = false;
    }

    GameObject.prototype.step = function () {
		// Step function executes every frame
        var dt, now;
		// Get the current time
        now = Date.now();
		// Delta-Time: time(seconds) since last step
        dt = (now - this.lastStep) / 1000;
		// Update last step to this step
        this.lastStep = now;
		// Perform a game update (every frame - high performance impact)
        this.update(dt);
		// Perform a new draw (every frame - high performance impact)
        this.draw();
		// Return and clear any released keys/buttons
        return engine.input.clearPressed();
    }

	// Return the GameObject (to itself) to complete the game loop
    return GameObject;
})();
engine.GameObject = GameObject; // Force the game to create the game object once the script loads