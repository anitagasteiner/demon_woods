/**
 * Represents a background object.
 */
class BgObject extends MovableObject {

    x;
    y;
    height = 480;
    width = 720;

    /**
     * Creates a new BgObject instance. Loads its image and assigns its x value and its y value.
     * @param {string} imagePath - path of the background object
     * @param {number} x - x value of the background object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.canvasHeight - this.height;
    }
    
}