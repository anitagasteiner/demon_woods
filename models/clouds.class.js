/**
 * Represents a clouds object.
 */
class Clouds extends MovableObject {

    y = 0;
    x = -500 + Math.random() * 3500;
    height = 400;
    width = 700;
    speed = 0.03;


    /**
     * Creates a new Clouds instance. Loads its image and triggers the animation action.
     * @param {string} imagePath - path of the clouds
     */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.animate();
    }

    /**
     * Animates the clouds by moving them to the left at a constant speed. Sets an interval to update the clouds' position 60 times per second.
     */
    animate() {        
        const intervalIdClouds = setInterval(() => this.moveLeft(), 1000 / 60);
    }

}