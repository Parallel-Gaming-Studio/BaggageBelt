class shape_stand extends Shape {
    constructor(pos, _parentPlane) {
        // Position
        var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
        // Type
        var _type = typeEnum.type_shape_stand;
        // Luggage Reference
        var _targetReference = game.shapeStand;
        // Image
        var _image = _targetReference.image;
        // Width
        var _width = _targetReference.width;
        // Height
        var _height = _targetReference.height;
        // Points
        var _points = 0;

        // Initialize parent
        super(_position, _type, _width, _height, _points);

        // Define circle's attributes
        this.reference = _targetReference;
        this.image = _image;
        this.type = _type;
        this.points = _points;

        // Reference to this DOM element
        this.domElement;
		
		// Plane Reference (string)
        this.parentPlane = _parentPlane;

        console.log(`Parent Plane\n${getNameOfType(this.parentPlane.type)}`);

        // $(`#${this.shape.domElement.id}`).after(`#${this.domElement.id}`);
		// this.setDOM(this.domElement);
		this.setOrigin(_targetReference);
        // this.adjustStyles();

        // Update all positions
        // this.adjustStyles();
        // this.shape.adjustStyles();
    }

    /*---------------------adjustStyles-----------------------------------\
    | - Adjust the styles to match the target's
    \--------------------------------------------------------------------*/
	adjustStyles() {
		this.domElement.style.display = "block";
		this.domElement.style.width = this.width + "px";
		this.domElement.style.height = this.height + "px";
        this.domElement.style.top = this.position.y + "px";
        this.domElement.style.left = this.position.x + "px";

        // this.shape.adjustStyles();
        // this.updateAttributes();
		// console.log(`Width: ${this.domElement.style.width} | Height: ${this.domElement.style.height} | Src: ${this.image.src}`);
    }
    
	/*---------------------draw-------------------------------------------\
	| /\ Inherited from baseGameEntity /\
    | - Override the draw function.
	| - Note: Not all entity classes or subclasses require a draw.
    \--------------------------------------------------------------------*/
    draw() {
		this.adjustStyles();
        // console.log(`<ShapeStand>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
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