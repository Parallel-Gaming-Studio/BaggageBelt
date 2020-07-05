class plane_right_top extends Shape {
    constructor() {
        // Plane Reference
        var _targetReference = game.playLargePlaneRight;
        // Type
        var _type = typeEnum.type_plane_right_top;
        // Image
        var _image = _targetReference.image;
        // Width
        var _width = _targetReference.width;
        // Height
        var _height = _targetReference.height;
        // Position
        var _position;
        switch (game.manager.level) {
            case 1:
                _position = _targetReference.posSpawnLevel2;
                break;
            case 2:
                _position = _targetReference.posSpawnLevel3;
                break;
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
        this.bagsLeft = 5;
        
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

        // - Level 3
        //   - Spawn
        this.level3SpawnPosition = _targetReference.posSpawnLevel3;
        //   - Loading
        this.level3LoadingPosition = _targetReference.posLoadLevel3;
        //   - Exit
        this.level3ExitPosition = _targetReference.posExitLevel3;

        // - Level 4
        //   - Spawn
        this.level4SpawnPosition = _targetReference.posSpawnLevel4;
        //   - Loading
        this.level4LoadingPosition = _targetReference.posLoadLevel4;
        //   - Exit
        this.level4ExitPosition = _targetReference.posExitLevel4;
		
		// Shape Div Builder
		var _divOpen = `<div id="${this.type}_${this.ID()}" class="planes" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');z-index:17;">`;
		$("#baseCanvas").after(_divOpen);
		this.domElement = document.getElementById(`${this.type}_${this.ID()}`);
		this.setDOM(this.domElement);
		this.setOrigin(_targetReference);
        
        // Update all positions
        this.adjustPosition();
        this.adjustStyles();
        
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
        // console.log(`<Plane_Right_Top>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
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

        // - Level 3
        //   - Spawn
        this.level3SpawnPosition = this.getOrigin().posSpawnLevel3;
        //   - Loading
        this.level3LoadingPosition = this.getOrigin().posLoadLevel3;
        //   - Exit
        this.level3ExitPosition = this.getOrigin().posExitLevel3;

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
            case 1:
                posSpawn = this.level2SpawnPosition;
                posLoad = this.level2LoadingPosition;
                posExit = this.level2ExitPosition;
                break;
            case 2:
                posSpawn = this.level3SpawnPosition;
                posLoad = this.level3LoadingPosition;
                posExit = this.level3ExitPosition;
                break;
            default:
                posSpawn = this.level4SpawnPosition;
                posLoad = this.level4LoadingPosition;
                posExit = this.level4ExitPosition;
                break;
        }

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

        switch (game.manager.level) {
            case 1:
                pos = this.level2LoadingPosition;
                break;
            case 2:
                pos = this.level3LoadingPosition;
                break;
            default:
                pos = this.level4LoadingPosition;
                break;
        }

        // Drop Zone Attributes
        var dropX = pos.x + 392 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        var dropY = pos.y + 320 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
        var dropRadius = 160 * (1 - Math.max(engine.widthProportion, engine.heightProportion));
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
            case 1:
                this.forceMoveToLocation(this.level2LoadingPosition);
                break;
            case 2:
                this.forceMoveToLocation(this.level3LoadingPosition);
                break;
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
        // Determine game level and set position
        switch (game.manager.level) {
            case 1:
                this.forceMoveToLocation(this.level2ExitPosition);
                break;
            case 2:
                this.forceMoveToLocation(this.level3ExitPosition);
                break;
            default:
                this.forceMoveToLocation(this.level4ExitPosition);
                break;
        }
    }
}