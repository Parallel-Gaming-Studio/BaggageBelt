//========================================================================
// DeVry University - New Development
// PROJECT TITLE:	Word Flight
// PROJECT DATE:	03/02/2020
// PROGRAMMERS:		Chris Medeiros
//					Samantha Harvey
//					Joanna Blackwell
//					James Powell
//					Sumeira Zehra
// FILE NAME:		engine.js
// DESCRIPTION:		Based on the atom.js game engine, but with some tweaks
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
// LAST UPDATE:		03/24/2020 - Created main engine.js file to work from
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
    // Append an array of arguments to function fn after me
    __bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    };

// Access the current browser's framerate for maximum control over animation
_requestAnimationFrame = // Multibrowser support options:
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

// Setup user input control, bindings, and handling
engine.input = {
    _bindings: {},
    _down: {},
    _pressed: {},
    _released: [],

    mouse: {
        x: 0,
        y: 0
    },

    bind: function (key, event) {
        return this._bindings[key] = event;
    },

    onkeydown: function (e) {
        var event;

        event = this._bindings[eventCode(e)];

        if (!event) {
            return;
        }

        if (!this._down[event]) {
            this._pressed[event] = true;
        }

        this._down[event] = true;
        // Prevent this event from propagation (being called multiple times)
        e.stopPropagation();
        // Cancel the event if it's cancelable
        return e.preventDefault();
    },

    onkeyup: function (e) {
        var event;

        event = this._bindings[eventCode(e)];

        if (!event) {
            return;
        }

        this._released.push(event);

        e.stopPropagation();

        return e.preventDefault();
    },

    clearPressed: function () {
        var event, _i, _len, _ref;

        _ref = this._released;

        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            event = _ref[_i];
            this._down[event] = false;
        }

        this._released = [];

        return this._pressed = {};
    },

    pressed: function (event) {
        return this._pressed[event];
    },

    down: function (event) {
        return this._down[event];
    },

    released: function (event) {
        return __indexOf.call(this._released, event) >= 0;
    },

    onmousemove: function (e) {
        this.mouse.x = e.pageX;
        return this.mouse.y = e.pageY;
    },

    onmousedown: function (e) {
        return this.onkeydown(e);
    },

    onmouseup: function (e) {
        return this.onkeyup(e);
    },

    onmousewheel: function (e) {
        this.onkeydown(e);
        return this.onkeyup(e);
    },

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
    if (e.type === 'keydown' || e.type === 'keyup') {
        return e.keyCode;
    } else if (e.type === 'mousedown' || e.type === 'mouseup') {
        switch (e.button) {
            case 0:
                return engine.button.LEFT;
            case 1:
                return engine.button.MIDDLE;
            case 2:
                return engine.button.RIGHT;
        }
    } else if (e.type === 'mousewheel') {
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
// Get canvas context
engine.context = engine.canvas.getContext("2d");

// Bind the engine's mouse events to the canvas
engine.canvas.onmousemove = engine.input.onmousemove.bind(engine.input);
engine.canvas.onmousedown = engine.input.onmousedown.bind(engine.input);
engine.canvas.onmouseup = engine.input.onmouseup.bind(engine.input);
engine.canvas.onmousewheel = engine.input.onmousewheel.bind(engine.input);
// engine.canvas.oncontextmenu = engine.input.oncontextmenu.bind(engine.input);

// React proportions
engine.widthProportion = (Math.abs(1920 - window.innerWidth) / 1920).toPrecision(4);
engine.heightProportion = (Math.abs(1080 - window.innerHeight) / 1080).toPrecision(4);

window.onload = function () {
    console.log("(w: " + (engine.widthProportion * 100).toPrecision(4) + "%, h: " + (engine.heightProportion * 100).toPrecision(4) + "%)");
    console.log("(w: " + engine.canvas.width + ", h: " + engine.canvas.height + ")");
};

// Handle window resizing events
window.onresize = function (e) {
    // Set canvas dimensions to the inner browser dimensions
    engine.canvas.width = window.innerWidth;
    engine.canvas.height = window.innerHeight;
	
    // Find the dimension differences
    engine.widthDifference = 1920 - window.innerWidth;
    engine.heightDifference = 1080 - window.innerHeight;

    // Aspect ratios
    engine.targetRatio = 1920 / 1080;
    engine.aspectRatio = window.innerWidth / window.innerHeight;

    // Find the dimensional proportion ratios
    engine.widthProportion = ((engine.widthDifference) / 1920).toPrecision(4);
    engine.heightProportion = ((engine.heightDifference) / 1080).toPrecision(4);
    engine.dimensionProportion = engine.widthProportion > engine.heightProportion ? engine.widthProportion : engine.heightProportion;
    engine.width = engine.canvas.width;

	// DEBUG
    console.log("<ENGINE> (w: " + engine.canvas.width + ", h: " + engine.canvas.height + ")");
	
    return engine.height = engine.canvas.height;
};
window.onresize();

// Primary game loop
GameObject = (function () {
    function GameObject() {};
    GameObject.prototype.update = function (dt) {};
    GameObject.prototype.draw = function () {};
    GameObject.prototype.run = function () {
        var s;
        if (this.running) {
            return;
        }

        this.running = true;

        s = __bind(function () {
            if (!this.running) {
                return;
            }

            this.step();

            return _requestAnimationFrame(s);
        }, this);

        this.lastStep = Date.now();

        return _requestAnimationFrame(s);
    };

    GameObject.prototype.stop = function () {
        return this.running = false;
    }

    GameObject.prototype.step = function () {
        var dt, now;
        now = Date.now();
        dt = (now - this.lastStep) / 1000;
        this.lastStep = now;
        this.update(dt);
        this.draw();
        return engine.input.clearPressed();
    }

    return GameObject;
})();
engine.GameObject = GameObject;
