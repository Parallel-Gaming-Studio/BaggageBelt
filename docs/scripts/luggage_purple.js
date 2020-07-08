class luggage_purple extends Shape {
    constructor(pos) {
        // Position
        var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
        // Type
        var _type = typeEnum.type_luggage_purple;
        // Luggage Reference
        var _targetLuggage = game.playLuggagePurple;
        // Image
        var _image = _targetLuggage.image;
        // Width
        var _width = _targetLuggage.width;
        // Height
        var _height = _targetLuggage.height;
        // Points
        var _points = 120;

        // Initialize parent
        super(_position, _type, _width, _height, _points);

        // Define luggage attributes
        this.image = _image;
        this.type = _type;
        this.points = _points;

        // Special Purpose Flags
        this.ready = false;
        this.removeMe = false;

        // Shape
        this.shape = game.manager.generateLuggageShape();
        var tempArray = JSON.parse(this.shape.reference.getTransform(this));
        // console.log(`Shape ${getNameOfType(this.shape.type)}\nDimensions:\nH: ${tempArray.height}\nW: ${tempArray.width}\nX: ${tempArray.x}\nY: ${tempArray.y}`);
        this.shape.height = tempArray.height;
        this.shape.width = tempArray.width;
        this.shape.position = new Vector2D(tempArray.x, tempArray.y);

        // Luggage Div Builder
        var _divOpen = `<div id="${this.type}_${this.ID()}" class="luggage" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');">`;
        var _divShape = `<div id="${this.shape.type}_${this.shape.ID()}" class="gems" style="position:relative;display:block;top:${tempArray.y}px;left:${tempArray.x}px;width:${tempArray.width}px;height:${tempArray.height}px;background-image: url('${this.shape.image.src}');">`;
		// Div closer
        var _divClose = `</div>`;
        // Div Builder
        var _divBuilder = _divOpen + _divShape + _divClose + _divClose;
        // Place the div stack after the canvas
        $("#baseCanvas").after(_divBuilder);

        // Update Shape DOM
        this.shape.domElement = document.getElementById(`${this.shape.type}_${this.shape.ID()}`);
        this.shape.setOrigin(this.shape.domElement);

        // Update Luggage DOM
		this.domElement = document.getElementById(`${this.type}_${this.ID()}`);
		this.setDOM(this.domElement);
		this.setOrigin(_targetLuggage);
		this.adjustStyles();
    }

	/*---------------------draw-------------------------------------------\
	| /\ Inherited from baseGameEntity /\
    | - Override the draw function.
	| - Note: Not all entity classes or subclasses require a draw.
    \--------------------------------------------------------------------*/
    draw() {
        this.adjustPosition();
		this.adjustStyles();
        this.shape.adjustStyles();
    }
	
    /*---------------------adjustPosition---------------------------------\
	| - Adjust the current position, based on game level
    \--------------------------------------------------------------------*/
    adjustPosition() {
        /* 
        // Level-Based Positions
        // - Level 4
        //   - Spawn
        this.level4SpawnPosition = this.getOrigin().posSpawnLevel4;
        //   - Loading
        this.level4LoadingPosition = this.getOrigin().posLoadLevel4;
        //   - Exit
        this.level4ExitPosition = this.getOrigin().posExitLevel4;

        // Temporary Position States
        var posSpawn, posLoad, posExit;

        // Get the game level
        switch (game.manager.level) {
            default:
                posSpawn = this.level4SpawnPosition;
                posLoad = this.level4LoadingPosition;
                posExit = this.level4ExitPosition;
                break;
        } */

        // Luggage Shape
        var tempArray = JSON.parse(this.shape.reference.getTransform(this));
        this.shape.height = tempArray.height;
        this.shape.width = tempArray.width;
        this.shape.position = new Vector2D(tempArray.x, tempArray.y);

        // Update Current Position
        // - Exit State
        // if (this.bagsLeft <= 0) { this.setNewPosition(posExit); return this.adjustDOM(); }
        // - Spawn State
        // if (!this.ready) { this.setNewPosition(posSpawn); return this.adjustDOM(); }
        // - Loading State
        // this.setNewPosition(posLoad);
        return this.adjustDOM();
    }

    /*---------------------adjustDOM--------------------------------------\
	| - Move the DOM element based on the current position
    \--------------------------------------------------------------------*/
    adjustDOM() {
        this.domElement.style.top = this.position.y + "px";
        this.domElement.style.left = this.position.x + "px";
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

    /*---------------------exit-------------------------------------------\
    | - Fades the luggage out
    \--------------------------------------------------------------------*/
    exit() {
        this.ready = false;
        this.removeMe = true;
        this.forceMoveToLocation(this.position);
    }
}