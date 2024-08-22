class BgObject extends MovableObject {
    height = 480;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.canvasHeight - this.height; // Gesamthöhe vom Canvas: 480
    }
}