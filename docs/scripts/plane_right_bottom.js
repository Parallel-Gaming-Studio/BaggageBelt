class plane_right_bottom extends Shape {
    constructor() {
        // Plane Reference
        var _targetReference = game.playSmallPlaneRight;
        // Type
        var _type = typeEnum.type_plane_right_bottom;
        // Image
        var _image = _targetReference.image;
        // Width
        var _width = _targetReference.width;
        // Height
        var _height = _targetReference.height;
        // Position
        var _position;
        switch (game.manager.level) {
            default:
                _position = _targetReference.posSpawnLevel4;
                break;
        }
        // Points
        var _points = 0;

        // Initialize parent
        super(_position, _type, _width, _height, _points);

        // Define circle's attributes
        this.position = _position;
        this.width = _width;
        this.height = _height;
        this.image = _image;
        this.type = _type;
        this.points = _points;
        this.location = "BottomRight";
        this.bagsLeft = 5;
        
        // Special Purpose Flags
        this.ready = false;
        this.removeMe = false;

        // Level-Based Positions
        // - Level 4
        //   - Spawn
        this.level4SpawnPosition = _targetReference.posSpawnLevel4;
        //   - Loading
        this.level4LoadingPosition = _targetReference.posLoadLevel4;
        //   - Exit
        this.level4ExitPosition = _targetReference.posExitLevel4;

        // Drop Zone
        this.dropZone = new Vector2D(627, 294);
        this.dropZoneRadius = 120;
		
		// Shape
        this.shape = game.manager.generatePlaneShape();
        var tempArray = JSON.parse(this.shape.reference.getTransform(this));
        // console.log(`Shape ${getNameOfType(this.shape.type)}\nDimensions:\nH: ${tempArray.height}\nW: ${tempArray.width}\nX: ${tempArray.x}\nY: ${tempArray.y}`);
        this.shape.height = tempArray.height;
        this.shape.width = tempArray.width;
        this.shape.position = new Vector2D(tempArray.x, tempArray.y);

        // Shape Stand
        this.shapeStand = new shape_stand(new Vector2D(), this);
        var tempStand = JSON.parse(this.shapeStand.reference.getTransform(this));
        // console.log(`Shape Stand\nDimensions:\nH: ${tempStand.height}\nW: ${tempStand.width}\nX: ${tempStand.x}\nY: ${tempStand.y}`);
        this.shapeStand.height = tempStand.height;
        this.shapeStand.width = tempStand.width;
        this.shapeStand.position = new Vector2D(tempStand.x, tempStand.y);

        // Shape on Shape Stand
        this.shapeStandShape;
        switch(getNameOfType(this.shape.type)) {
            case "Circle":
                this.shapeStandShape = new circle();
                break;
            case "Heart":
                this.shapeStandShape = new heart();
                break;
            case "Pentagon":
                this.shapeStandShape = new pentagon();
                break;
            case "Rectangle":
                this.shapeStandShape = new rectangle();
                break;
            case "Square":
                this.shapeStandShape = new square();
                break;
            case "Star":
                this.shapeStandShape = new star();
                break;
            case "Triangle":
                this.shapeStandShape = new triangle();
                break;
        }
        var tempShape = JSON.parse(this.shapeStandShape.reference.getTransform(this.shapeStand, this.location));
        // console.log(`Shape Stand's Shape\n${getNameOfType(this.shapeStandShape.type)}\nDimensions:\nH: ${tempShape.height}\nW: ${tempShape.width}\nX: ${tempShape.x}\nY: ${tempShape.y}`);
        this.shapeStandShape.height = tempShape.height;
        this.shapeStandShape.width = tempShape.width;
        this.shapeStandShape.position = new Vector2D(tempShape.x, tempShape.y);

        // Shape Div Builder
        // Plane Div
        var _divOpen = `<div id="${this.type}_${this.ID()}" class="planes" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');z-index:19;">`;
        // Tail Shape Div
        var _shapeTail = `<div id="${this.shape.type}_${this.shape.ID()}" class="gems" style="position:relative;display:block;top:${tempArray.y}px;left:${tempArray.x}px;width:${tempArray.width}px;height:${tempArray.height}px;background-image: url('${this.shape.image.src}');">`;
        // Shape Stand Div
        var _shapeStand = `<div id="${this.shapeStand.type}_${this.shapeStand.ID()}" class="shape-stand" style="position:relative;display:block;top:${tempStand.y}px;left:${tempStand.x}px;width:${tempStand.width}px;height:${tempStand.height}px;background-image: url('${this.shapeStand.image.src}');">`;
        var _shapeStandTop = `<div id="${this.shapeStandShape.type}_${this.shapeStandShape.ID()}" class="gems" style="position:relative;display:block;top:${tempShape.y}px;left:${tempShape.x}px;width:${tempShape.width}px;height:${tempShape.height}px;background-image: url('${this.shapeStandShape.image.src}');">`;
        // Div closer
        var _divClose = `</div>`;
        // Div Builder
        var _divBuilder = _divOpen + _shapeTail + _divClose + _shapeStand + _shapeStandTop + _divClose + _divClose + _divClose;
        // Place the div stack after the canvas
        $("#baseCanvas").after(_divBuilder);

        // Update Shape DOM
        this.shape.domElement = document.getElementById(`${this.shape.type}_${this.shape.ID()}`);
        this.shape.setOrigin(this.shape.domElement);
        
        // Update Shape Stand DOM
        this.shapeStand.domElement = document.getElementById(`${this.shapeStand.type}_${this.shapeStand.ID()}`);
        this.shapeStand.setOrigin(this.shapeStand.domElement);

        // Update Shape Stand Shape DOM
        this.shapeStandShape.domElement = document.getElementById(`${this.shapeStandShape.type}_${this.shapeStandShape.ID()}`);
        this.shapeStandShape.setOrigin(this.shapeStandShape.domElement);
        
        // Update Plane DOM
		this.domElement = document.getElementById(`${this.type}_${this.ID()}`);
		this.setDOM(this.domElement);
        this.setOrigin(_targetReference);
        
        // Update all positions
        this.adjustPosition();
        
        
        // Spawn the plane
        this.spawn();

        // Add to planes list
        game.manager.planes.push(this);
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
        this.shapeStand.adjustStyles();
        this.shapeStandShape.adjustStyles();
        // console.log(`<Plane_Right_Bottom>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
        // engine.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
		// super.draw();
    }

    /*---------------------adjustPosition---------------------------------\
	| - Adjust the current position, based on game level
    \--------------------------------------------------------------------*/
    adjustPosition() {
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
        }

        // Tail Shape
        var tempArray = JSON.parse(this.shape.reference.getTransform(this));
        this.shape.height = tempArray.height;
        this.shape.width = tempArray.width;
        this.shape.position = new Vector2D(tempArray.x, tempArray.y);

        // Shape Stand
        var tempStand = JSON.parse(this.shapeStand.reference.getTransform(this));
        this.shapeStand.height = tempStand.height;
        this.shapeStand.width = tempStand.width;
        this.shapeStand.position = new Vector2D(tempStand.x, tempStand.y);
        

        // Shape Stand Shape
        var tempShape = JSON.parse(this.shapeStandShape.reference.getTransform(this.shapeStand, this.location));
        this.shapeStandShape.height = tempShape.height;
        this.shapeStandShape.width = tempShape.width;
        this.shapeStandShape.position = new Vector2D(tempShape.x, tempShape.y);

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

    /*---------------------drawDropZone-----------------------------------\
    | - Draw the drop zone
    \--------------------------------------------------------------------*/
    drawDropZone() {
        if (!this.ready) return;
        var ctx = engine.context;
        var pos;

        pos = this.level4LoadingPosition;

        // Drop Zone Attributes
        var dropX = pos.x + this.dropZone.x * engine.preserveAspectRatio;
        var dropY = pos.y + this.dropZone.y * engine.preserveAspectRatio;
        var dropRadius = this.dropZoneRadius * engine.preserveAspectRatio;
        var dropStart = 0;
        var dropEnd = 2 * Math.PI;

        // Drop Area
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.strokeStyle = "#555875";
        ctx.strokeStyle = "#555875b4";
        ctx.fillStyle = "#7f829d";
        ctx.fillStyle = "#7f829db4";
        ctx.arc(dropX, dropY, dropRadius, dropStart, dropEnd);
        ctx.stroke();
        ctx.fill();
    }
    
    /*---------------------remove-----------------------------------------\
    | - Removes this plane from the game
    \--------------------------------------------------------------------*/
    remove() {
        game.manager.removePlane(this);
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

    /*---------------------loadBag----------------------------------------\
    | - Loading a bag into the plane reduces the bags left count by 1
    \--------------------------------------------------------------------*/
    loadBag() {
        return (this.bagsLeft-- <= 0);
    }

    /*---------------------spawn------------------------------------------\
    | - Spawns the plane at the designated position, based on the level
    \--------------------------------------------------------------------*/
    spawn() {
        // Determine game level and set position
        switch (game.manager.level) {
            default:
                this.forceMoveToLocation(this.level4LoadingPosition);
                break;
        }
    }

    /*---------------------exit-------------------------------------------\
    | - Moves the cart to the designated position and removes it, based on
    |   the level
    \--------------------------------------------------------------------*/
    exit() {
        // Clear the plane's shape from the used list
        game.shapesList.push(game.shapesUsed.splice(game.shapesUsed.indexOf(getNameOfType(this.shape.type)), 1));

        // Determine game level and set position
        switch (game.manager.level) {
            default:
                this.forceMoveToLocation(this.level4ExitPosition);
                break;
        }
    }
}