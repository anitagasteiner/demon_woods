/**
 * Represents a throwable object.
 */
class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 20;
    acceleration = 2.5;
    height = 65;
    width = 65;
    sound_throwing = new Audio('audio/throw.wav');
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Creates a new ThrowableObject instance. Loads its image and assigns its x value and its y value.
     * Triggers the function to throw it.
     * @param {number} x - x value of the throwable object
     * @param {number} y - y value of the throwable object
     * @param {boolean} otherDirection - value containing information if the throwing object (character) is directed forwards or backwards
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/crystal/crystal.png');
        this.x = x;
        this.y = y;
        this.throw(otherDirection);
    }

    /**
     * Plays the throwing sound and sets the speedY value of the throwable object to 30.
     * Triggers the "applyGravity" function so that the throwable object falls down.
     * Sets an interval to constantly change the x value of the throwable object so that it makes a curve while falling.
     * Checks the "otherDirection" value so that the throwable object is thrown into the right direction. If the throwing object (character) is headed backwards, the x value is reduced, otherwise it is increased.
     * @param {boolean} otherDirection - value containing information if the throwing object (character) is directed forwards or backwards
     */
    throw(otherDirection) {
        this.sound_throwing.play();
        this.speedY = 30;
        this.applyGravity();
        const intervalIdThrow = setInterval(() => {
            if (otherDirection == true) {
                this.x -= 6;
            } else {
                this.x += 6;
            }
        }, 25);
    }

}