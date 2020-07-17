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
    drawEntities: function () {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    },

    // Remove entity
    removeEntity: function (delEntity) {
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
    removePlane: function (delPlane) {
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
    drawDropZones: function () {
        // Planes
        for (var i = 0; i < this.planes.length; i++) {
            this.planes[i].drawDropZone();
        }
        // Carts
        switch (this.level) {
            case 0:
                if (this.level1Cart != null) this.level1Cart.drawDropZone();
                break;
            case 1:
                if (this.level2Cart != null) this.level2Cart.drawDropZone();
                break;
            case 2:
                if (this.level3Cart != null) this.level3Cart.drawDropZone();
                break;
            default:
                if (this.level4Cart != null) this.level4Cart.drawDropZone();
                break;
        }
    },

    // Generate a random shape
    generatePlaneShape: function () {
        var newShape;
        var getShape = randInt(0, (game.shapesList.length - 1));
        switch (game.shapesList[getShape]) {
            case "Circle":
                this.swapShapesToUsed("Circle");
                newShape = new circle();
                break;
            case "Heart":
                this.swapShapesToUsed("Heart");
                newShape = new heart();
                break;
            case "Pentagon":
                this.swapShapesToUsed("Pentagon");
                newShape = new pentagon();
                break;
            case "Rectangle":
                this.swapShapesToUsed("Rectangle");
                newShape = new rectangle();
                break;
            case "Square":
                this.swapShapesToUsed("Square");
                newShape = new square();
                break;
            case "Star":
                this.swapShapesToUsed("Star");
                newShape = new star();
                break;
            case "Triangle":
                this.swapShapesToUsed("Triangle");
                newShape = new triangle();
                break;
        }
        // console.log(`Shape Arrays Update:\nList: ${game.shapesList}\nUsed: ${game.shapesUsed}`);
        return newShape;
    },

    // Get the number of bags left in each plane
    getBagsLeft: function () {
        // Reset luggage counts
        this.lugCount = { "Circle": 0, "Heart": 0, "Pentagon": 0, "Rectangle": 0, "Square": 0, "Star": 0, "Triangle": 0 };

        let count = 0;
        for (var i = 0; i < this.planes.length; i++) {
            // Add to the total number of baggage slots available
            count += this.planes[i].bagsLeft;

            // Store the baggage counts by shape
            switch (getNameOfType(this.planes[i].shape.type)) {
                case "Circle":
                    this.lugCount.Circle += this.planes[i].bagsLeft;
                    break;
                case "Heart":
                    this.lugCount.Heart += this.planes[i].bagsLeft;
                    break;
                case "Pentagon":
                    this.lugCount.Pentagon += this.planes[i].bagsLeft;
                    break;
                case "Rectangle":
                    this.lugCount.Rectangle += this.planes[i].bagsLeft;
                    break;
                case "Square":
                    this.lugCount.Square += this.planes[i].bagsLeft;
                    break;
                case "Star":
                    this.lugCount.Star += this.planes[i].bagsLeft;
                    break;
                case "Triangle":
                    this.lugCount.Triangle += this.planes[i].bagsLeft;
                    break;
            }
        }
        return count;
    },

    // Container for all luggage
    luggage: [],
    lugCount: { "Circle": 0, "Heart": 0, "Pentagon": 0, "Rectangle": 0, "Square": 0, "Star": 0, "Triangle": 0 },
    // Remove luggage
    removeLuggage: function (delLuggage) {
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
    compareLuggageWithPlane: function (bag) {
        // console.log(`Compare luggage with each plane...`);
        // Ignore the action if no luggage is passed
        if (bag == null) return;

        // Use the location of this luggage's parent
        let tempParent = null;
        switch (this.level) {
            case 0:
                tempParent = this.level1Cart;
                break;
            case 1:
                tempParent = this.level2Cart;
                break;
            case 2:
                tempParent = this.level3Cart;
                break;
            default:
                tempParent = this.level4Cart;
                break;
        }

        // Ensure a cart is selected before continuing
        // - Necessary to prevent errors when the game finishes
        if (tempParent == null) {
            // Ensure the bag still exists
            if (bag == null) return;
            bag.forceMoveToLocation(bag.lastPosition);
            return;
        }

        // Convert this luggage's local space position (within the parent) to a world space position
        // console.log(`Comparing Luggage Positions:\nParent: ${tempParent.position}\nLuggage: ${bag.center}`);
        let tempCenter = vecAdd(tempParent.position, bag.center);
        // Adjust the center for the luggage's center offset
        tempCenter = vecSubtract(tempCenter, bag.toCenter);

        let foundMatch = false;
        for (var i = 0; i < this.planes.length; i++) {
            // Ensure the plane still exists before continuing
            if (this.planes[i] == null) continue;

            // Convert the drop zone's local space to world space
            let dzWorld = vecAdd(this.planes[i].position, this.planes[i].dropZone);
            // console.log(`Comparing ${getNameOfType(bag.type)} ${bag.ID()}\n@ ${tempCenter}\nWith ${getNameOfType(this.planes[i].type)}\n@ ${dzWorld}\nRadius: ${this.planes[i].dropZoneRadius}\nDist: ${vec2DDistance(dzWorld, tempCenter)}`);

            // Check if the shape is within the drop zone's radius
            if (vec2DDistance(dzWorld, tempCenter) <= this.planes[i].dropZoneRadius) {
                // console.log(`Comparing:\nBag: ${getNameOfType(bag.shape.type)}\nPlane: ${getNameOfType(this.planes[i].shape.type)}`)
                if (bag.shape.type == this.planes[i].shape.type) {
                    foundMatch = true;
                    // Convert the dzWorld position to the luggage's local space
                    let dzWorldCenter = vecSubtract(dzWorld, tempParent.position);
                    dzWorldCenter = vecSubtract(dzWorldCenter, bag.toCenter);

                    // console.log(`Shape and plane match!\ndzWorldCenter:\n${dzWorldCenter}\ndzWorld:\n${dzWorld}`);

                    bag.popShape(dzWorldCenter);
                    this.planes[i].bagsLeft--;
                    tempParent.bagsLeft--;
                    // console.log(`${this.planes[i].type} has ${this.planes[i].bagsLeft} left.\nCart has ${tempParent.bagsLeft} left.`);
                    break;
                }
            }
        }

        // Return the luggage to its original position on the cart
        if (!foundMatch) {
            bag.forceMoveToLocation(bag.lastPosition);
            bag.ready = true;
        }

        // Clear the selected luggage
        this.selectedLuggage = null;
    },

    // Generate a random piece of luggage
    generateLuggage: function () {
        var newLuggage;
        var getLuggage = randInt(0, (game.luggageList.length - 1));
        switch (game.luggageList[getLuggage]) {
            case "Blue":
                newLuggage = new luggage_blue();
                break;
            case "Green":
                newLuggage = new luggage_green();
                break;
            case "Purple":
                newLuggage = new luggage_purple();
                break;
            case "Red":
                newLuggage = new luggage_red();
                break;
            case "Yellow":
                newLuggage = new luggage_yellow();
                break;
        }
        // console.log(`Generating Luggage:\n${newLuggage}`);
        return newLuggage;
    },

    // Generate a random luggage shape
    generateLuggageShape: function () {
        // Ensure any old luggage is removed
        this.luggageControl();
        
        // Update the baggage slot counts
        this.getBagsLeft();

        // Temporary luggage count object
        let luggageCounts = [];

        // Store all the available shapes currently available
        for (x in this.lugCount) {
            if (this.lugCount[x] > 0) {
                luggageCounts.push(x);
            }
        }

        var newShape;
        var getShape = randInt(0, (luggageCounts.length - 1));
        // console.log(`Luggage Selecting Shape:\nList: ${tempPlanes}\nIndex: ${getShape}\nShape: ${tempPlanes[getShape]}`);
        switch (luggageCounts[getShape]) {
            case "Circle":
                newShape = new circle();
                this.lugCount["Circle"]--;
                break;
            case "Heart":
                newShape = new heart();
                this.lugCount["Heart"]--;
                break;
            case "Pentagon":
                newShape = new pentagon();
                this.lugCount["Pentagon"]--;
                break;
            case "Rectangle":
                newShape = new rectangle();
                this.lugCount["Rectangle"]--;
                break;
            case "Square":
                newShape = new square();
                this.lugCount["Square"]--;
                break;
            case "Star":
                newShape = new star();
                this.lugCount["Star"]--;
                break;
            case "Triangle":
                newShape = new triangle();
                this.lugCount["Triangle"]--;
                break;
        }
        // console.log(`Luggage Shape Update:\nList: ${tempPlanes}\nUsed: ${newShape}`);
        return newShape;
    },

    // Manage luggage items
    luggageControl: function () {
        let removeList = [];
        for (var i = 0; i < this.luggage.length; i++) {
            try {
                if (this.luggage[i].removeMe) {
                    removeList.push(this.luggage[i]);
                }
            } catch (e) { }
        }
        while (removeList.length > 0) {
            this.removeLuggage(removeList.pop());
        }
    },

    // Select a piece of luggage at the given position
    selectedLuggage: null,
    selectLuggage: function (pos) {
        // console.log(`Looking for luggage @ ${pos}...`);
        try {
            this.selectedLuggage = this.getLuggageAtCursor(pos);
            // Set this luggage's "lastPosition"
            this.selectedLuggage.lastPosition = this.selectedLuggage.position;
            // console.log(`Luggage found:\n${this.selectedLuggage}`);
            return true;
        } catch (e) {
            this.selectedLuggage = null;
            // console.log(`No luggage found!`);
            return false;
        }
    },

    // Drop the selected piece of luggage
    dropLuggage: function (pos) {
        // console.log(`Dropping luggage at...\n${pos}`);
        // Ignore the action if no luggage is selected
        if (this.selectedLuggage == null) return;

        // Get a new pointer for the luggage
        let bag = this.selectedLuggage;

        // Remove the luggage's ready state
        bag.ready = false;

        // Convert the cursor location to local space
        let tempParent = null;
        switch (this.level) {
            case 0:
                tempParent = this.level1Cart;
                break;
            case 1:
                tempParent = this.level2Cart;
                break;
            case 2:
                tempParent = this.level3Cart;
                break;
            default:
                tempParent = this.level4Cart;
                break;
        }

        // Ensure a cart is selected before continuing
        // - Necessary to prevent errors when the game finishes
        if (tempParent == null) {
            // Ensure the bag still exists
            if (bag == null) return;
            bag.forceMoveToLocation(bag.lastPosition);
            return;
        }

        // Convert the click to local space
        tempCenter = vecSubtract(pos, tempParent.position);
        // Offset the location by the luggage's center
        let localPos = vecSubtract(tempCenter, bag.toCenter);

        // Move luggage to location for its comparison test
        // console.log(`Moving ${this.selectedLuggage.type} to:\nWorld: ${pos}\nLocal: ${localPos}`);
        bag.forceMoveToLocation(localPos);
    },

    // Find luggage at the provided position
    getLuggageAtCursor: function (pos) {
        var returnLuggage = null;
        for (var i = 0; i < this.luggage.length; i++) {
            // Store this piece of luggage
            let testLuggage = this.luggage[i];
            // Continue to the next piece of luggage if this one is not ready
            if (!testLuggage.ready) continue;
            // Use the location of this luggage's parent
            let tempParent;
            switch (this.level) {
                case 0:
                    tempParent = this.level1Cart;
                    break;
                case 1:
                    tempParent = this.level2Cart;
                    break;
                case 2:
                    tempParent = this.level3Cart;
                    break;
                default:
                    tempParent = this.level4Cart;
                    break;
            }
            // Convert this luggage's local space position (within the parent) to a world space position
            // console.log(`Luggage Positions:\nParent: ${tempParent.position}\nLuggage: ${testLuggage.center}`);
            let tempCenter = vecAdd(tempParent.position, testLuggage.center);
            // console.log(`${testLuggage.type} ${testLuggage.ID()} @ ${tempCenter} | W: ${testLuggage.width / 2}\nDist: ${vec2DDistance(tempCenter, pos)}`);
            if (vec2DDistance(tempCenter, pos) < testLuggage.width / 2) {
                // this.selectedLuggage = testLuggage;
                // console.log(`Selected Luggage:\n${testLuggage}`);
                if (returnLuggage == null) {
                    this.luggage[i].lastPosition = this.luggage[i].position;
                    returnLuggage = testLuggage;
                } else {
                    if (returnLuggage.domElement.style.getPropertyValue("z-index") < testLuggage.domElement.style.getPropertyValue("z-index")) {
                        returnLuggage = testLuggage;
                    }
                }


            }
        }
        return returnLuggage;
    },

    // Move shapes to the used lists
    swapShapesToUsed: function (val) {
        var tempArray = [];
        for (var i = 0; i < game.shapesList.length; i++) {
            if (game.shapesList[i] != val) { tempArray.push(game.shapesList[i]); } else {
                game.shapesUsed.push(game.shapesList[i]);
                // console.log(`<TO USED>\nVal: ${game.shapesList[i]}`);
            }
        }
        game.shapesList = tempArray;
    },

    // Move shapes to the available lists
    swapShapesToList: function (val) {
        var tempArray = [];
        for (var i = 0; i < game.shapesUsed.length; i++) {
            if (game.shapesUsed[i] != val) { tempArray.push(game.shapesUsed[i]); } else {
                game.shapesList.push(game.shapesUsed[i]);
                // console.log(`<TO LIST>\nVal: ${game.shapesUsed[i]}`);
            }
        }
        game.shapesUsed = tempArray;
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
    timeBetweenUpdates: 0.1,
    evalReady: function (dt) {
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
    resetGame: function () {
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

        // Restore Shapes Lists
        game.shapesList = ["Circle", "Heart", "Pentagon", "Rectangle", "Square", "Star", "Triangle"];
        game.shapesUsed = [];
    },

    // Check the level thresholds
    checkLevel: function () {
        // Cancel check if max level is reached
        if (this.level > this.pointsGoal.length) return;

        // Increase the current level after reaching its threshold
        if (game.player.score >= this.pointsGoal[this.level]) {
            // Restore Shapes Lists
            game.shapesList = ["Circle", "Heart", "Pentagon", "Rectangle", "Square", "Star", "Triangle"];
            game.shapesUsed = [];
            // Remove Plane(s)
            for (var i = 0; i < this.planes.length; i++) {
                // Clear the plane's shape from the used list
                game.manager.swapShapesToList(getNameOfType(this.planes[i].shape.type));
                this.planes[i].bagsLeft = 0;
                this.planes[i].exit();
            }
            this.planes = [];
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
            // Remove luggage
            for (var i = 0; i < this.luggage.length; i++) {
                this.luggage[i].exit();
            }
            this.luggage = [];
            // Activate the next level
            setTimeout(this.nextLevel(), 2000);

            console.log(`\n\nLevel: ${this.level}\n\n`);
        }
    },

    // Increase the level
    nextLevel: function () {
        // Remove Plane(s)
        for (var i = 0; i < this.planes.length; i++) {
            // Clear the plane's shape from the used list
            game.manager.swapShapesToList(getNameOfType(this.planes[i].shape.type));
        }
        // Clear the current luggage
        this.luggage = [];
        // Increase level
        this.level++;
        // Wait before drawing
        setTimeout(game.drawOnce(), 2000);
    },

    // Increase the player's score
    addPoints: function (val) {
        // Add points
        game.player.score += val * Math.max(1, (this.level * this.levelPointsMultiplier));
        // Update the scoreboard
        game.playScore.updateScore();
    },

    // Check planes' capacity
    checkPlaneCapacity: function () {
        for (var i = 0; i < this.planes.length; i++) {
            if (this.planes[i].bagsLeft <= 0 && this.planes[i].ready) this.planes[i].exit();
        }
    },

    // Manage Carts
    cartControl: function () {
        // Perform actions based on the current level
        switch (this.level) {
            case 0:
                if (this.level1Cart == null) {
                    this.level1Cart = new cart1();
                } else if (this.level1Cart.bagsLeft <= 0 && !this.level1Cart.ready) {
                    this.level1Cart = null;
                } else if (vec2DDistanceSq(this.level1Cart.position, this.level1Cart.level1ExitPosition) < 10) {
                    let myCart = this.level1Cart;
                    if (myCart != null) {
                        myCart.ready = false;
                        myCart.removeMe = true;
                        if (myCart.leftTheBuilding == true) {
                            setTimeout(myCart.destroyDiv(), 750);
                            this.level1Cart = null;
                        }
                    }
                } else if (this.luggage.length <= 0) {
                    this.level1Cart.exit();
                } 
                break;
            case 1:
                if (this.level2Cart == null) {
                    this.level2Cart = new cart2();
                } else if (this.level2Cart.bagsLeft <= 0 && !this.level2Cart.ready) {
                    this.level2Cart = null;
                } else if (vec2DDistanceSq(this.level2Cart.position, this.level2Cart.level2ExitPosition) < 10) {
                    let myCart = this.level2Cart;
                    if (myCart != null) {
                        myCart.ready = false;
                        myCart.removeMe = true;
                        if (myCart.leftTheBuilding == true) {
                            setTimeout(myCart.destroyDiv(), 750);
                            this.level2Cart = null;
                        }
                    }
                } else if (this.luggage.length <= 0) {
                    this.level2Cart.exit();
                } 
                break;
            case 2:
                if (this.level3Cart == null) {
                    this.level3Cart = new cart3();
                } else if (this.level3Cart.bagsLeft <= 0 && !this.level3Cart.ready) {
                    this.level3Cart = null;
                } else if (vec2DDistanceSq(this.level3Cart.position, this.level3Cart.level3ExitPosition) < 10) {
                    let myCart = this.level3Cart;
                    if (myCart != null) {
                        myCart.ready = false;
                        myCart.removeMe = true;
                        if (myCart.leftTheBuilding == true) {
                            setTimeout(myCart.destroyDiv(), 750);
                            this.level3Cart = null;
                        }
                    }
                } else if (this.luggage.length <= 0) {
                    this.level3Cart.exit();
                }
                break;
            default:
                if (this.level4Cart == null) {
                    this.level4Cart = new cart4();
                } else if (this.level4Cart.bagsLeft <= 0 && !this.level4Cart.ready) {
                    this.level4Cart = null;
                } else if (vec2DDistanceSq(this.level4Cart.position, this.level4Cart.level4ExitPosition) < 10) {
                    let myCart = this.level4Cart;
                    if (myCart != null) {
                        myCart.ready = false;
                        myCart.removeMe = true;
                        if (myCart.leftTheBuilding == true) {
                            setTimeout(myCart.destroyDiv(), 750);
                            this.level4Cart = null;
                        }
                    }
                } else if (this.luggage.length <= 0) {
                    this.level4Cart.exit();
                } 
                break;
        }
        // DOM Cleanup
        let badDoms = document.getElementsByClassName('cart');
        for (var i = 0; i < badDoms.length; i++) {
            if (badDoms[i].style.getPropertyValue("left") >= engine.width * 0.98) {
                badDoms[i].remove();
            }
        }
    },

    // Check the cart's capacity
    checkCartCapacity: function () {
        // Perform actions based on the current level
        switch (this.level) {
            case 0:
                if (this.level1Cart != null) {
                    if (this.level1Cart.bagsLeft <= 0) {
                        this.level1Cart.exit();
                    }
                }
                break;
            case 1:
                if (this.level2Cart != null) {
                    if (this.level2Cart.bagsLeft <= 0) {
                        this.level2Cart.exit();
                    }
                    if (this.level1Cart != null) delete this.level1Cart;
                }
                break;
            case 2:
                if (this.level3Cart != null) {
                    if (this.level3Cart.bagsLeft <= 0) {
                        this.level3Cart.exit();
                    }
                    if (this.level2Cart != null) delete this.level2Cart;
                }
                break;
            default:
                if (this.level4Cart != null) {
                    if (this.level4Cart.bagsLeft <= 0) {
                        this.level4Cart.exit();
                    }
                    if (this.level3Cart != null) delete this.level3Cart;
                }
                break;
        }
    },

    // Manage Planes
    planeControl: function () {
        let tempLuggage = [];
        // Perform actions based on the current level
        switch (this.level) {
            case 0:
                if (this.level1Plane == null) {
                    this.level1Plane = new plane_left_top();
                } else if (this.level1Plane.bagsLeft <= 0 && !this.level1Plane.ready) {
                    // Ensure the cart is available
                    if (this.level1Cart == null) break;
                    for (var i = 0; i < this.level1Cart.luggagePieces.length; i++) {
                        if (this.level1Cart.luggagePieces[i].shape.type == this.level1Plane.shape.type) {
                            this.level1Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level1Cart.luggagePieces[i]);
                        }
                    }
                    this.level1Cart.luggagePieces = [...tempLuggage];
                    this.level1Cart.bagsLeft = this.level1Cart.luggagePieces.length;
                    this.level1Plane = null;
                }
                break;
            case 1:
                if (this.level2PlaneLeft == null) {
                    this.level2PlaneLeft = new plane_left_top();
                } else if (this.level2PlaneLeft.bagsLeft <= 0 && !this.level2PlaneLeft.ready) {
                    // Ensure the cart is available
                    if (this.level2Cart == null) break;
                    for (var i = 0; i < this.level2Cart.luggagePieces.length; i++) {
                        if (this.level2Cart.luggagePieces[i].shape.type == this.level2PlaneLeft.shape.type) {
                            this.level2Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level2Cart.luggagePieces[i]);
                        }
                    }
                    this.level2Cart.luggagePieces = [...tempLuggage];
                    this.level2Cart.bagsLeft = this.level2Cart.luggagePieces.length;
                    this.level2PlaneLeft = null;
                }
                if (this.level2PlaneRight == null) {
                    this.level2PlaneRight = new plane_right_top();
                } else if (this.level2PlaneRight.bagsLeft <= 0 && !this.level2PlaneRight.ready) {
                    // Ensure the cart is available
                    if (this.level2Cart == null) break;
                    for (var i = 0; i < this.level2Cart.luggagePieces.length; i++) {
                        if (this.level2Cart.luggagePieces[i].shape.type == this.level2PlaneRight.shape.type) {
                            this.level2Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level2Cart.luggagePieces[i]);
                        }
                    }
                    this.level2Cart.luggagePieces = [...tempLuggage];
                    this.level2Cart.bagsLeft = this.level2Cart.luggagePieces.length;
                    this.level2PlaneRight = null;
                }
                break;
            case 2:
                if (this.level3PlaneLeft == null) {
                    this.level3PlaneLeft = new plane_left_top();
                } else if (this.level3PlaneLeft.bagsLeft <= 0 && !this.level3PlaneLeft.ready) {
                    // Ensure the cart is available
                    if (this.level3Cart == null) break;
                    for (var i = 0; i < this.level3Cart.luggagePieces.length; i++) {
                        if (this.level3Cart.luggagePieces[i].shape.type == this.level3PlaneLeft.shape.type) {
                            this.level3Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level3Cart.luggagePieces[i]);
                        }
                    }
                    this.level3Cart.luggagePieces = [...tempLuggage];
                    this.level3Cart.bagsLeft = this.level3Cart.luggagePieces.length;
                    this.level3PlaneLeft = null;
                }
                if (this.level3PlaneRight == null) {
                    this.level3PlaneRight = new plane_right_top();
                } else if (this.level3PlaneRight.bagsLeft <= 0 && !this.level3PlaneRight.ready) {
                    // Ensure the cart is available
                    if (this.level3Cart == null) break;
                    for (var i = 0; i < this.level3Cart.luggagePieces.length; i++) {
                        if (this.level3Cart.luggagePieces[i].shape.type == this.level3PlaneRight.shape.type) {
                            this.level3Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level3Cart.luggagePieces[i]);
                        }
                    }
                    this.level3Cart.luggagePieces = [...tempLuggage];
                    this.level3Cart.bagsLeft = this.level3Cart.luggagePieces.length;
                    this.level3PlaneRight = null;
                }
                if (this.level3PlaneBottom == null) {
                    this.level3PlaneBottom = new plane_left_bottom();
                } else if (this.level3PlaneBottom.bagsLeft <= 0 && !this.level3PlaneBottom.ready) {
                    // Ensure the cart is available
                    if (this.level3Cart == null) break;
                    for (var i = 0; i < this.level3Cart.luggagePieces.length; i++) {
                        if (this.level3Cart.luggagePieces[i].shape.type == this.level3PlaneBottom.shape.type) {
                            this.level3Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level3Cart.luggagePieces[i]);
                        }
                    }
                    this.level3Cart.luggagePieces = [...tempLuggage];
                    this.level3Cart.bagsLeft = this.level3Cart.luggagePieces.length;
                    this.level3PlaneBottom = null;
                }
                break;
            default:
                if (this.level4PlaneLeftTop == null) {
                    this.level4PlaneLeftTop = new plane_left_top();
                } else if (this.level4PlaneLeftTop.bagsLeft <= 0 && !this.level4PlaneLeftTop.ready) {
                    // Ensure the cart is available
                    if (this.level4Cart == null) break;
                    for (var i = 0; i < this.level4Cart.luggagePieces.length; i++) {
                        if (this.level4Cart.luggagePieces[i].shape.type == this.level4PlaneLeftTop.shape.type) {
                            this.level4Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level4Cart.luggagePieces[i]);
                        }
                    }
                    this.level4Cart.luggagePieces = [...tempLuggage];
                    this.level4Cart.bagsLeft = this.level4Cart.luggagePieces.length;
                    this.level4PlaneLeftTop = null;
                }
                if (this.level4PlaneRightTop == null) {
                    this.level4PlaneRightTop = new plane_right_top();
                } else if (this.level4PlaneRightTop.bagsLeft <= 0 && !this.level4PlaneRightTop.ready) {
                    // Ensure the cart is available
                    if (this.level4Cart == null) break;
                    for (var i = 0; i < this.level4Cart.luggagePieces.length; i++) {
                        if (this.level4Cart.luggagePieces[i].shape.type == this.level4PlaneRightTop.shape.type) {
                            this.level4Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level4Cart.luggagePieces[i]);
                        }
                    }
                    this.level4Cart.luggagePieces = [...tempLuggage];
                    this.level4Cart.bagsLeft = this.level4Cart.luggagePieces.length;
                    this.level4PlaneRightTop = null;
                }
                if (this.level4PlaneLeftBottom == null) {
                    this.level4PlaneLeftBottom = new plane_left_bottom();
                } else if (this.level4PlaneLeftBottom.bagsLeft <= 0 && !this.level4PlaneLeftBottom.ready) {
                    // Ensure the cart is available
                    if (this.level4Cart == null) break;
                    for (var i = 0; i < this.level4Cart.luggagePieces.length; i++) {
                        if (this.level4Cart.luggagePieces[i].shape.type == this.level4PlaneLeftBottom.shape.type) {
                            this.level4Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level4Cart.luggagePieces[i]);
                        }
                    }
                    this.level4Cart.luggagePieces = [...tempLuggage];
                    this.level4Cart.bagsLeft = this.level4Cart.luggagePieces.length;
                    this.level4PlaneLeftBottom = null;
                }
                if (this.level4PlaneRightBottom == null) {
                    this.level4PlaneRightBottom = new plane_right_bottom();
                } else if (this.level4PlaneRightBottom.bagsLeft <= 0 && !this.level4PlaneRightBottom.ready) {
                    // Ensure the cart is available
                    if (this.level4Cart == null) break;
                    for (var i = 0; i < this.level4Cart.luggagePieces.length; i++) {
                        if (this.level4Cart.luggagePieces[i].shape.type == this.level4PlaneRightBottom.shape.type) {
                            this.level4Cart.luggagePieces[i].exit();
                        } else {
                            tempLuggage.push(this.level4Cart.luggagePieces[i]);
                        }
                    }
                    this.level4Cart.luggagePieces = [...tempLuggage];
                    this.level4Cart.bagsLeft = this.level4Cart.luggagePieces.length;
                    this.level4PlaneRightBottom = null;
                }
                break;
        }
    },

    // Update Game Manager
    update: function () {
        // Validate the game's current level
        this.checkLevel();

        // Manage the planes
        this.planeControl();

        // Check each plane's capacity
        this.checkPlaneCapacity();

        // Manage the carts
        this.cartControl();

        // Check cart capacity
        this.checkCartCapacity();

        // Manage the luggage
        this.luggageControl();

        // Draw Entities
        this.drawDropZones();
    }
};

game.playLoop = function (dt) {
    // Limit the update attempts to reduce device overhead
    if (!game.manager.evalReady(dt)) return;

    // Perform Game Manager Updates
    game.manager.update();
};