class cart2 extends Shape {
    constructor() {
        // Luggage Reference
        var _targetReference = game.playLuggageCartLvl2;
        // Type
        var _type = typeEnum.type_cart_2;
        // Image
        var _image = _targetReference.image;
        // Width
        var _width = _targetReference.width;
        // Height
        var _height = _targetReference.height;
        // Position
        var _position = _targetReference.posSpawnLevel2;
        // Points
        var _points = 0;

        // Initialize parent
        super(_position, _type, _width, _height, _points);

        // Define cart attributes
        this.position = _position;
        this.width = _width;
        this.height = _height;
        this.image = _image;
        this.type = _type;
        this.points = _points;
        this.numberOfCarts = 2;
        this.bagsLeft = randInt(this.numberOfCarts, this.numberOfCarts * 5);

        // Drop Zones
        // - Cart 1
        this.dropZonePos = new Vector2D(19, 5);
        this.dropZoneDim = new Vector2D(590, 70);
        // - Cart 2
        this.dropZonePos2 = new Vector2D(310, 5);
        this.dropZoneDim2 = new Vector2D(590, 70);

        // Special Purpose Flags
        this.ready = false;
        this.removeMe = false;

        // Level-Based Positions
        // - Level 2
        //   - Spawn
        this.level2SpawnPosition = _targetReference.posSpawnLevel2;
        //   - Loading
        this.level2LoadingPosition = _targetReference.posLoadLevel2;
        //   - Exit
        this.level2ExitPosition = _targetReference.posExitLevel2;

        // Cart Div Builder
        var _divOpen = `<div id="${this.type}_${this.ID()}" class="cart" style="display:block;top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');">`;

        // Div closer
        var _divClose = `</div>`;

        // Div Builder
        var _divBuilder = _divOpen;

        // Generate random luggage for each cart
        this.luggagePieces = [];
        this.luggageShapes = [];
        let totalBagsToFill = 0;
        for (var b = 0; b < game.manager.planes.length; b++) {
            totalBagsToFill += game.manager.planes[b].bagsLeft;
        }
        // - Carts
        // Loop through the carts
        for (var c = 0; c < this.numberOfCarts; c++) {
            let bagsLeftToFill = 0;
            console.log(`Cart 2 - Bags to Fill (Before):\n${bagsLeftToFill} of ${totalBagsToFill}`);
            if (totalBagsToFill > 5) {
                bagsLeftToFill = Math.round(totalBagsToFill / this.numberOfCarts);
                totalBagsToFill -= bagsLeftToFill;
            } else {
                bagsLeftToFill = totalBagsToFill;
                totalBagsToFill = 0;
            }
            console.log(`Cart 2 - Bags to Fill (After):\n${bagsLeftToFill} of ${totalBagsToFill}`);
            for (var i = 0; i < bagsLeftToFill; i++) {
                // Generate a random piece of luggage
                let tempLuggage = game.manager.generateLuggage();
                // Update the luggage dimensions
                tempLuggage.width = tempLuggage.reference.width;
                tempLuggage.height = tempLuggage.reference.height;

                // Set a random position within the cart for the piece of luggage
                switch (c) {
                    case 0:
                        tempLuggage.setNewPosition(new Vector2D(
                            // X
                            randInt(this.dropZonePos.x * engine.preserveAspectRatio, this.dropZonePos.x * engine.preserveAspectRatio + tempLuggage.width / 2),
                            // Y
                            this.dropZonePos.y * engine.preserveAspectRatio + (this.height - this.dropZoneDim.y) * engine.preserveAspectRatio - tempLuggage.height
                        ));
                        break;
                    case 1:
                        tempLuggage.setNewPosition(new Vector2D(
                            // X
                            randInt(this.dropZonePos2.x * engine.preserveAspectRatio, this.dropZonePos2.x * engine.preserveAspectRatio + tempLuggage.width / 2),
                            // Y
                            this.dropZonePos2.y * engine.preserveAspectRatio + (this.height - this.dropZoneDim2.y) * engine.preserveAspectRatio - tempLuggage.height
                        ));
                        break;
                }

                // Add to this truck's list of luggage pieces
                this.luggagePieces.push(tempLuggage);
                // Luggage Div
                var _luggageDiv = `<div id="${tempLuggage.type}_${tempLuggage.ID()}" class="luggage" style="top:${tempLuggage.position.y}px;left:${tempLuggage.position.x}px;width:${tempLuggage.width}px;height:${tempLuggage.height}px;background-image: url('${tempLuggage.image.src}');z-index:${25 + i};">`;

                // Generate a shape for the luggage
                tempLuggage.shape = game.manager.generateLuggageShape();
                // Store the luggage shape's transform
                let tempArray = JSON.parse(tempLuggage.shape.reference.getTransform(tempLuggage));
                tempLuggage.shape.height = tempArray.height;
                tempLuggage.shape.width = tempArray.width;
                tempLuggage.shape.position = new Vector2D(tempArray.x, tempArray.y);

                // Shape Div
                var _shapeDiv = `<div id="${tempLuggage.shape.type}_${tempLuggage.shape.ID()}" class="gems" style="position:relative;display:block;top:${tempArray.y}px;left:${tempArray.x}px;width:${tempArray.width}px;height:${tempArray.height}px;background-image: url('${tempLuggage.shape.image.src}');">`;

                // Add to div builder
                _divBuilder += _luggageDiv + _shapeDiv + _divClose + _divClose;
            }
        }

        // Close the cart's div
        _divBuilder += _divClose;
        $("#baseCanvas").after(_divBuilder);

        // Update the DOM for each piece of luggage and their respective shapes
        for (var i = 0; i < this.luggagePieces.length; i++) {
            // Define the luggage DOM
            this.luggagePieces[i].domElement = document.getElementById(`${this.luggagePieces[i].type}_${this.luggagePieces[i].ID()}`);
            // Register the luggage DOM
            this.luggagePieces[i].setDOM(this.luggagePieces[i].domElement);
            // Register the luggage reference
            this.luggagePieces[i].setOrigin(this.luggagePieces[i].reference);

            // Define the luggage shape's DOM
            this.luggagePieces[i].shape.domElement = document.getElementById(`${this.luggagePieces[i].shape.type}_${this.luggagePieces[i].shape.ID()}`);
            // Register the luggage shape's DOM
            this.luggagePieces[i].shape.setDOM(this.luggagePieces[i].shape.domElement);
            // Register the luggage shape's reference
            this.luggagePieces[i].shape.setOrigin(this.luggagePieces[i].shape.reference);

            // Update the luggage's position
            this.luggagePieces[i].adjustPosition();
        }

        // Update the cart's DOM
        this.domElement = document.getElementById(`${this.type}_${this.ID()}`);
        this.setDOM(this.domElement);
        this.setOrigin(_targetReference);

        // Update all positions
        this.adjustPosition();
        this.adjustStyles();

        // Spawn the cart
        this.spawn();
    }

	/*---------------------draw-------------------------------------------\
	| /\ Inherited from baseGameEntity /\
    | - Override the draw function.
	| - Note: Not all entity classes or subclasses require a draw.
    \--------------------------------------------------------------------*/
    draw() {
        this.adjustPosition();
        this.adjustStyles();
    }

    /*---------------------adjustPosition---------------------------------\
	| - Adjust the current position, based on game level
    \--------------------------------------------------------------------*/
    adjustPosition() {
        // Level-Based Positions
        // - Level 2
        //   - Spawn
        this.level2SpawnPosition = this.getOrigin().posSpawnLevel2;
        //   - Loading
        this.level2LoadingPosition = this.getOrigin().posLoadLevel2;
        //   - Exit
        this.level2ExitPosition = this.getOrigin().posExitLevel2;

        // Temporary Position States
        var posSpawn, posLoad, posExit;

        // Get the game level
        posSpawn = this.level2SpawnPosition;
        posLoad = this.level2LoadingPosition;
        posExit = this.level2ExitPosition;

        // Update Current Position
        // - Exit State
        if (this.bagsLeft <= 0) { this.setNewPosition(posExit); return this.adjustDOM(); }
        // - Spawn State
        if (!this.ready) { this.setNewPosition(posSpawn); return this.adjustDOM(); }
        // - Loading State
        this.setNewPosition(posLoad);
        return this.adjustDOM();
    }

    /*---------------------adjustDOM--------------------------------------\
	| - Move the DOM element based on the current position
    \--------------------------------------------------------------------*/
    adjustDOM() {
        this.domElement.style.top = this.position.y + "px";
        this.domElement.style.left = this.position.x + "px";
    }

    /*---------------------drawLuggageZone--------------------------------\
    | - Draw the luggage zone(s)
    \--------------------------------------------------------------------*/
    drawDropZone() {
        if (!this.ready) return;
        var ctx = engine.context;
        var pos = this.level2LoadingPosition;

        // Drop Zone Attributes
        // - Cart 1
        var dropX = pos.x + this.dropZonePos.x * engine.preserveAspectRatio;
        var dropY = pos.y + this.dropZonePos.y * engine.preserveAspectRatio;
        var dropWidth = this.width - this.dropZoneDim.x * engine.preserveAspectRatio;
        var dropHeight = this.height - this.dropZoneDim.y * engine.preserveAspectRatio;
        // - Cart 2
        var dropX2 = pos.x + this.dropZonePos2.x * engine.preserveAspectRatio;
        var dropY2 = pos.y + this.dropZonePos2.y * engine.preserveAspectRatio;
        var dropWidth2 = this.width - this.dropZoneDim2.x * engine.preserveAspectRatio;
        var dropHeight2 = this.height - this.dropZoneDim2.y * engine.preserveAspectRatio;

        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#555875";
        ctx.fillStyle = "#7f829d";
        ctx.rect(dropX, dropY, dropWidth, dropHeight);
        ctx.rect(dropX2, dropY2, dropWidth2, dropHeight2);
        ctx.stroke();
        ctx.fill();
    }

    /*---------------------remove-----------------------------------------\
    | - Removes this cart from the game
    \--------------------------------------------------------------------*/
    remove() {
        game.manager.removeEntity(this);
    }

	/*---------------------destroyDiv-------------------------------------\
    | - Removes this shape's div element from the page
    \--------------------------------------------------------------------*/
    destroyDiv() {
        this.domElement.remove();
    }

	/*---------------------getPoints--------------------------------------\
    | - Returns star's point value
    \--------------------------------------------------------------------*/
    getPoints() { return this.points; }

    /*---------------------spawn------------------------------------------\
    | - Spawns the cart at the designated position, based on the level
    \--------------------------------------------------------------------*/
    spawn() {
        this.forceMoveToLocation(this.level2LoadingPosition);
    }

    /*---------------------exit-------------------------------------------\
    | - Moves the cart to the designated position and removes it, based on
    |   the level
    \--------------------------------------------------------------------*/
    exit() {
        this.forceMoveToLocation(this.level2ExitPosition);
    }
}