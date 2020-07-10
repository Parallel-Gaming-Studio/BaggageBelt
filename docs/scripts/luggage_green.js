class luggage_green extends Shape {
    constructor(pos) {
        // Position
        var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
        // Type
        var _type = typeEnum.type_luggage_green;
        // Luggage Reference
        var _targetLuggage = game.playLuggageGreen;
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
        this.reference = _targetLuggage;
        this.image = _image;
        this.type = _type;
        this.points = _points;

        // Special Purpose Flags
        this.ready = true;
        this.removeMe = false;

        // Shape
        this.shape;

        // DOM reference
        this.domElement;

        // Add to the game manager
        game.manager.luggage.push(this);
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

        // Luggage Shape
        var tempArray = JSON.parse(this.shape.reference.getTransform(this));
        this.shape.height = tempArray.height;
        this.shape.width = tempArray.width;
        this.shape.position = new Vector2D(tempArray.x, tempArray.y);

        // Update Current Position
        return this.adjustDOM();
    }

    /*---------------------adjustDOM--------------------------------------\
	| - Move the DOM element based on the current position
    \--------------------------------------------------------------------*/
    adjustDOM() {
        this.updateAttributes();
        // this.domElement.style.display = "inline-flex !important";
        this.domElement.style.top = this.position.y + "px";
        this.domElement.style.left = this.position.x + "px";
    }

    /*---------------------remove-----------------------------------------\
    | - Removes this luggage from the game
    \--------------------------------------------------------------------*/
    remove() {
        game.manager.removeLuggage(this);
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
    exit(pos) {
        if (typeof pos !== "undefined") this.position = pos;
        this.ready = false;
        this.removeMe = true;
        this.forceMoveToLocation(this.position);
    }
}