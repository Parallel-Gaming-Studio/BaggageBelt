class star extends Shape {
    constructor(pos) {
        // Position
        var _position = (typeof pos !== "undefined") ? pos : new Vector2D();
        // Type
        var _type = typeEnum.type_gem_star;
        // Shape Reference
        var _targetShape = game.gemStar;
        // Image
        var _image = _targetShape.image;
        // Width
        var _width = _targetShape.width;
        // Height
        var _height = _targetShape.height;
        // Points
        var _points = 0;

        // Initialize parent
        super(_position, _type, _width, _height, _points);

        // Define circle's attributes
        this.reference = _targetShape;
        this.image = _image;
        this.type = _type;
        this.points = _points;
		
		// Shape Div Builder
		// var _divOpen = `<div id="${this.type}_${this.ID()}" class="gems" style="top:${this.position.y}px;left:${this.position.x}px;width:${this.width}px;height:${this.height}px;background-image: url('${this.image.src}');">`;
		// $("#baseCanvas").after(_divOpen);
		this.domElement; // = document.getElementById(`${this.type}_${this.ID()}`);
		// this.setDOM(this.domElement);
		this.setOrigin(_targetShape);
		// this.adjustStyles();
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
        // console.log(`<Star>[Draw] Image: ${this.image.id}\nX: ${this.center.x} | Y: ${this.center.y}\nW: ${this.width} | H: ${this.height}`);
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