class luggage_red extends Shape {
    constructor(pos) {
        // Position
        var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
        // Type
        var _type = typeEnum.type_luggage_red;
        // Luggage Reference
        var _targetLuggage = game.playLuggageRed;
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

        // Luggage Div Builder
        var _divOpen = `<div id="${this.type}_${this.ID()}" class="luggage" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');">`;
		$("#baseCanvas").after(_divOpen);
		this.domElement = document.getElementById(`${this.type}_${this.ID()}`);
		this.setDOM(this.domElement);
		this.setOrigin(_targetShape);
		this.adjustStyles();
    }

	/*---------------------draw-------------------------------------------\
	| /\ Inherited from baseGameEntity /\
    | - Override the draw function.
	| - Note: Not all entity classes or subclasses require a draw.
    \--------------------------------------------------------------------*/
    draw() {
		this.adjustStyles();
        // console.log(`<LuggageRed>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
        // engine.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
		// super.draw();
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
}