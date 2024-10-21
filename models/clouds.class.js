class Clouds extends MovableObject {

    y = 0;
    x = -500 + Math.random() * 3500;
    height = 400;
    width = 700;
    speed = 0.03;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.animate();
    }

    animate() {        
        const intervalIdClouds = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}