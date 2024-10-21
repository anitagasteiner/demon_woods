class BgObject extends MovableObject {

    x;
    y;
    height = 480;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.canvasHeight - this.height;
    }
    
}