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
        this.bagsLeft = 10;

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
        var _divOpen = `<div id="${this.type}_${this.ID()}" class="cart" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');">`;
        $("#baseCanvas").after(_divOpen);
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
        // console.log(`<Cart2>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
        // engine.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        // super.draw();
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
        var dropX = pos.x + 19 * engine.preserveAspectRatio;
        var dropY = pos.y + 5 * engine.preserveAspectRatio;
        var dropWidth = this.width - 590 * engine.preserveAspectRatio;
        var dropHeight = this.height - 70 * engine.preserveAspectRatio;
        // - Cart 2
        var dropX2 = pos.x + 310 * engine.preserveAspectRatio;
        var dropY2 = pos.y + 5 * engine.preserveAspectRatio;
        var dropWidth2 = this.width - 590 * engine.preserveAspectRatio;
        var dropHeight2 = this.height - 70 * engine.preserveAspectRatio;

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