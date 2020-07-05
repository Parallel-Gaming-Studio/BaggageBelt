// JavaScript Document

class POINT {
    // Overloaded constructor
    constructor(x, y) {
        if (typeof x !== "undefined" && typeof y !== "undefined") {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0.0;
            this.y = 0.0;
        }
        const $this = this;
    }
}

class POINTS {
    // Overloaded constructor
    constructor(x, y) {
        if (typeof x !== "undefined" && typeof y !== "undefined") {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0;
            this.y = 0;
        }
        const $this = this;
    }
}