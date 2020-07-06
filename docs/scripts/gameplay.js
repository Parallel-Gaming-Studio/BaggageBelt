// JavaScript Document

game.manager = {
    // Current Level
    level: 0,
    levelPointsMultiplier: 1.2,
    // Lug Count: 10  | 15  | 20
    pointsGoal: [1200, 3360, 9120],

    // Container for all entities
    entities: [],

    // Draw all entitites
    drawEntities: function() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    },

    // Remove entity
    removeEntity: function(delEntity) {
        let tempList = [];
        for (var i = 0; i < this.entities.length; i++) {
            if (delEntity != this.entities[i]) {
                tempList.push(this.entities[i]);
            } else {
                this.entities[i].destroyDiv();
            }
        }
        this.entities = [...tempList];
    },

    // Container for all planes
    planes: [],
    // Remove plane
    removePlane: function(delPlane) {
        let tempList = [];
        for (var i = 0; i < this.planes.length; i++) {
            if (delPlane != this.planes[i]) {
                tempList.push(this.planes[i]);
            }
        }
        this.removeEntity(delPlane);
        this.planes = [...tempList];
    },

    // Draw all entitites' drop zones
    drawDropZones: function() {
        // Planes
        for (var i = 0; i < this.planes.length; i++) {
            this.planes[i].drawDropZone();
        }
        // Carts
        switch (this.level) {
            case 0:
                this.level1Cart.drawDropZone();
                break;
            case 1:
                this.level2Cart.drawDropZone();
                break;
            case 2:
                this.level3Cart.drawDropZone();
                break;
            default:
                this.level4Cart.drawDropZone();
                break;
        }
    },

    // Container for all luggage
    luggage: [],
    // Remove luggage
    removeLuggage: function(delLuggage) {
        let tempList = [];
        for (var i = 0; i < this.luggage.length; i++) {
            if (delLuggage != this.luggage[i]) {
                tempList.push(this.luggage[i]);
            }
        }
        this.removeEntity(delLuggage);
        this.luggage = [...tempList];
    },

    // Compare Luggage With Plane
    compareLuggageWithPlane: function(bag, plane) {

    },

    // Generate a random shape
    generatePlaneShape: function() {
        var newShape;
        var getShape = randInt(0, (game.shapesList.length -1));
        switch (getShape) {
            case 0:
                newShape = new circle(pos);
                break;
            case 1:
                newShape = new heart(pos);
                break;
            case 2:
                newShape = new pentagon(pos);
                break;
            case 3:
                newShape = new rectangle(pos);
                break;
            case 4:
                newShape = new square(pos);
                break;
            case 5:
                newShape = new star(pos);
                break;
            case 6:
                newShape = new triangle(pos);
                break;
        }
        return newShape;
    },

    // Level-Dependent Items
    // - Level 1
    level1Plane: null,
    level1Cart: null,
    level1Luggage: [],
    // - Level 2
    level2PlaneLeft: null,
    level2PlaneRight: null,
    level2Cart: null,
    level2Luggage1: [],
    level2Luggage2: [],
    // - Level 3
    level3PlaneLeft: null,
    level3PlaneRight: null,
    level3PlaneBottom: null,
    level3Cart: null,
    level3Luggage1: [],
    level3Luggage2: [],
    level3Luggage3: [],
    // - Level 4
    level4PlaneLeftTop: null,
    level4PlaneLeftBottom: null,
    level4PlaneRightTop: null,
    level4PlaneRightBottom: null,
    level4Cart: null,
    level4Luggage1: [],
    level4Luggage2: [],
    level4Luggage3: [],
    level4Luggage4: [],

    // Limit Game Updates / Refreshes
    timeSinceUpdate: 0.0,
    timeBetweenUpdates: 0.01,
    evalReady: function(dt) {
        // Update by time since last frame (dt)
        this.timeSinceUpdate += dt;

        // If the time is greater than the update wait time
        if (this.timeSinceUpdate >= this.timeBetweenUpdates) {
            // Reset the update time
            this.timeSinceUpdate = 0.0;
            // Return ready
            return true;
        }

        // Return not ready
        return false;
    },

    // Reset All Necessary Game Variables
    resetGame: function() {
        // Game Manager Attributes
        // - Level
        this.level = 0;
        // - Entities
        this.entities = [];
        // - Planes
        this.planes = [];
        // - Luggage
        this.luggage = [];
        // - Level 1
        this.level1Plane = null;
        this.level1Cart = null;
        this.level1Luggage = [];
        // - Level 2
        this.level2PlaneLeft = null;
        this.level2PlaneRight = null;
        this.level2Cart = null;
        this.level2Luggage1 = [];
        this.level2Luggage2 = [];
        // - Level 3
        this.level3PlaneLeft = null;
        this.level3PlaneRight = null;
        this.level3PlaneBottom = null;
        this.level3Cart = null;
        this.level3Luggage1 = [];
        this.level3Luggage2 = [];
        this.level3Luggage3 = [];
        // - Level 4
        this.level4PlaneLeftTop = null;
        this.level4PlaneLeftBottom = null;
        this.level4PlaneRightTop = null;
        this.level4PlaneRightBottom = null;
        this.level4Cart = null;
        this.level4Luggage1 = [];
        this.level4Luggage2 = [];
        this.level4Luggage3 = [];
        this.level4Luggage4 = [];

        // Clear any objects that escaped deletion
        var z = [];
        z.push(document.getElementsByClassName("planes"));
        z.push(document.getElementsByClassName("gems"));
        z.push(document.getElementsByClassName("shape-stand"));
        z.push(document.getElementsByClassName("gem-stand"));
        z.push(document.getElementsByClassName("cart"));
        z.push(document.getElementsByClassName("luggage"));
    },

    // Check the level thresholds
    checkLevel: function() {
        // Cancel check if max level is reached
        if (this.level > this.pointsGoal.length) return;

        // Increase the current level after reaching its threshold
        if (game.player.score >= this.pointsGoal[this.level]) {
            // Remove Plane(s)
            for (var i = 0; i < this.planes.length; i++) {
                this.planes[i].bagsLeft = 0;
                this.planes[i].exit();
            }
            // Remove Cart
            switch (this.level) {
                case 0:
                    this.level1Cart.bagsLeft = 0;
                    this.level1Cart.exit();
                    break;
                case 1:
                    this.level2Cart.bagsLeft = 0;
                    this.level2Cart.exit();
                    break;
                case 2:
                    this.level3Cart.bagsLeft = 0;
                    this.level3Cart.exit();
                    break;
                default:
                    this.level4Cart.bagsLeft = 0;
                    this.level4Cart.exit();
                    break;
            }
            // Activate the next level
            setTimeout(this.nextLevel(), 1800);
        }
    },

    // Increase the level
    nextLevel: function() {
        this.level++;
        setTimeout(game.drawOnce(), 200);
    },

    // Increase the player's score
    addPoints: function(val) {
        // Add points
        game.player.score += val * (this.level * this.levelPointsMultiplier);
        // Update the scoreboard
        game.playScore.updateScore();
    },

    // Check planes' capacity
    checkPlaneCapacity: function() {
        for (var i = 0; i < this.planes.length; i++) {
            if (this.planes[i].bagsLeft <= 0 && this.planes[i].ready) this.planes[i].exit();
        }
    },

    // Manage Carts
    cartControl: function() {
        // Perform actions based on the current level
        switch (this.level) {
            case 0:
                if (this.level1Cart == null) {
                    this.level1Cart = new cart1();
                } else if (this.level1Cart.bagsLeft <= 0 && !this.level1Cart.ready) {
                    this.level1Cart = null;
                }
                break;
            case 1:
                if (this.level2Cart == null) {
                    this.level2Cart = new cart2();
                } else if (this.level2Cart.bagsLeft <= 0 && !this.level2Cart.ready) {
                    this.level2Cart = null;
                }
                break;
            case 2:
                if (this.level3Cart == null) {
                    this.level3Cart = new cart3();
                } else if (this.level3Cart.bagsLeft <= 0 && !this.level3Cart.ready) {
                    this.level3Cart = null;
                }
                break;
            default:
                if (this.level4Cart == null) {
                    this.level4Cart = new cart4();
                } else if (this.level4Cart.bagsLeft <= 0 && !this.level4Cart.ready) {
                    this.level4Cart = null;
                }
                break;
        }
    },

    // Manage Planes
    planeControl: function() {
        // Perform actions based on the current level
        switch (this.level) {
            case 0:
                if (this.level1Plane == null) {
                    this.level1Plane = new plane_left_top();
                } else if (this.level1Plane.bagsLeft <= 0 && !this.level1Plane.ready) {
                    this.level1Plane = null;
                }
                break;
            case 1:
                if (this.level2PlaneLeft == null) {
                    this.level2PlaneLeft = new plane_left_top();
                } else if (this.level2PlaneLeft.bagsLeft <= 0 && !this.level2PlaneLeft.ready) {
                    this.level2PlaneLeft = null;
                }
                if (this.level2PlaneRight == null) {
                    this.level2PlaneRight = new plane_right_top();
                } else if (this.level2PlaneRight.bagsLeft <= 0 && !this.level2PlaneRight.ready) {
                    this.level2PlaneRight = null;
                }
                break;
            case 2:
                if (this.level3PlaneLeft == null) {
                    this.level3PlaneLeft = new plane_left_top();
                } else if (this.level3PlaneLeft.bagsLeft <= 0 && !this.level3PlaneLeft.ready) {
                    this.level3PlaneLeft = null;
                }
                if (this.level3PlaneRight == null) {
                    this.level3PlaneRight = new plane_right_top();
                } else if (this.level3PlaneRight.bagsLeft <= 0 && !this.level3PlaneRight.ready) {
                    this.level3PlaneRight = null;
                }
                if (this.level3PlaneBottom == null) {
                    this.level3PlaneBottom = new plane_left_bottom();
                } else if (this.level3PlaneBottom.bagsLeft <= 0 && !this.level3PlaneBottom.ready) {
                    this.level3PlaneBottom = null;
                }
                break;
            default:
                if (this.level4PlaneLeftTop == null) {
                    this.level4PlaneLeftTop = new plane_left_top();
                } else if (this.level4PlaneLeftTop.bagsLeft <= 0 && !this.level4PlaneLeftTop.ready) {
                    this.level4PlaneLeftTop = null;
                }
                if (this.level4PlaneRightTop == null) {
                    this.level4PlaneRightTop = new plane_right_top();
                } else if (this.level4PlaneRightTop.bagsLeft <= 0 && !this.level4PlaneRightTop.ready) {
                    this.level4PlaneRightTop = null;
                }
                if (this.level4PlaneLeftBottom == null) {
                    this.level4PlaneLeftBottom = new plane_left_bottom();
                } else if (this.level4PlaneLeftBottom.bagsLeft <= 0 && !this.level4PlaneLeftBottom.ready) {
                    this.level4PlaneLeftBottom = null;
                }
                if (this.level4PlaneRightBottom == null) {
                    this.level4PlaneRightBottom = new plane_right_bottom();
                } else if (this.level4PlaneRightBottom.bagsLeft <= 0 && !this.level4PlaneRightBottom.ready) {
                    this.level4PlaneRightBottom = null;
                }
                break;
        }
    },

    // Update Game Manager
    update: function() {
        // Validate the game's current level
        this.checkLevel();

        // Manage the planes
        this.planeControl();

        // Check each plane's capacity
        this.checkPlaneCapacity();

        // Manage the carts
        this.cartControl();

        // Draw Entities
        this.drawDropZones();
    }
};

game.playLoop = function(dt) {
    // Limit the update attempts to reduce device overhead
    if (!game.manager.evalReady(dt)) return;

    // Perform Game Manager Updates
    game.manager.update();
};