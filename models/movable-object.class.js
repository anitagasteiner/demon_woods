/**
 * Represents a movable object.
 */
class MovableObject extends DrawableObject {

    canvasHeight = 480;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit auf der y-Achse
    acceleration = 2.5; // Beschleunigung
    energy = 100;
    lastHit = 0;
    intervalIds = [];
    paths_index = 0; // Zähler für die Bildfolge
    hurt_sound_index = 1;

    /**
     * Sets an interval that can be stopped later by storing its ID. 
     * The provided function is repeatedly called at the specified time interval.
     * The ID is pushed to the array "intervalIds".
     * @param {function} fn - the function to be executed at each interval
     * @param {number} time - the interval time between the function executions (in milliseconds)
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(() => fn.call(this), time);
        this.intervalIds.push(id);
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on the object's speed value.
     * Sets the object's direction to face left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on the object's speed value.
     * Sets the object's direction to face right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Sets the object's speedY value to 30.
     */
    fly() {
        this.speedY = 30;
    }

    /**
     * Sets an interval to repeatedly decrease the object's y value using the speedY value.
     * The speedY value is also repeatedly decreased using the acceleration value so that the object is falling down.
     * If the object is not above ground and its speedY is not higher than 0, its y value is set to 150 to ensure that it lands on the ground on the same y position as it was before.
     */
    applyGravity() {
        const intervalIdAboveGround = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            else
                this.y = 150;
        }, 1000 / 30);
    }

    /**
     * Checks if the object is above ground by checking if its y value is below 150.
     * If the object is an instance of "ThrowableObject" it always returns true so that the throwable object does not stop at the ground but continues falling when the function "applyGravity()" is being executed.
     * @returns {boolean} - true if the object is an instance of "ThrowableObject" or if its y value is lower than 150, otherwise false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.y < 150;
    }
    
    /**
     * Checks if this movable object is colliding with another movable object by comparing their positions and dimensions, including offsets to account for precise collision detection.
     * @param {object} movableObject - the other movable object to check for a collision with
     * @returns {boolean} - true if this object is colliding with the other object, otherwise false
     */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left
        && this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right
        && this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        && this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top;
    }

    /**
     * Checks if this movable object is jumping on another movable object (wraith) by comparing their positions and dimensions, including offsets to account for precise collision detection.
     * @param {object} wraith - the wraith to check for a collision with
     * @returns {boolean} - true if this object's bottom side is colliding with the top of the other object, otherwise false
     */
    isJumpingOn(wraith) {
        return this.x + this.width - this.offset.right > wraith.x + wraith.offset.left
        && this.x + this.offset.left < wraith.x + wraith.width - wraith.offset.right
        && this.y + this.height - this.offset.bottom > wraith.y + wraith.offset.top
        && this.y + this.height - this.offset.bottom < wraith.y + wraith.offset.top + 30;
    }

    /**
     * Evoces the function "looseEnergy()" to reduce the energy value of a hidden object.
     * If the energy value goes below 0, this value is set to 0. Otherwise, the timestamp of the last hit is recorded in the variable "lastHit".
     */
    hit() {
        this.looseEnergy();
        if (this.energy < 0)
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    /**
     * Reduces the energy value of an object. If it's a demon, the energy value is reduced by 25, if it's not a demon, the energy value is reduced by 20.
     */
    looseEnergy() {
        if (this.demon)
            this.energy -= 25;
        else if (!this.demon)
            this.energy -= 20;
    }

    /**
     * The time passed between the last hit (recorded in the variable "lastHit") and the actual time is recorded in the variable "timePassed" (in seconds).
     * @returns {boolean} - true if the passed time is below 2 seconds, otherwise false
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 2;
    }

    /**
     * Checks if the object's energy is 0.
     * @returns {boolean} - true if the object's energy is 0, otherwise false
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Toggles the function stop the Game.
     * Shows the you win banner.
     * After 1.3 seconds, this banner is hidden and a container with the game result is shown. The user can decide whether to play again or not.
     */
    youWinAction() {
        this.stopGame();
        this.showBannerWin();
        this.handleBannerContainer();
        setTimeout(() => {
            this.handleBannerContainer();
            this.handleRestartContainer();
        }, 1300);
    }

    /**
     * Toggles the function stop the Game.
     * Shows the you lose banner.
     * After 1.3 seconds, this banner is hidden and a container with the game result is shown. The user can decide whether to play again or not.
     */
    youLoseAction() {
        this.stopGame();
        this.showBannerLose();
        this.handleBannerContainer();
        setTimeout(() => {
            this.handleBannerContainer();
            this.handleRestartContainer();
        }, 1300);
    }

    /**
     * Toggles the function to reset the sounds.
     * Toggles the function to reset the intervals.
     * Resets the keyboard variable so that the character cannot be moved any more.
     * Empties the enemies array.
     */
    stopGame() {
        resetSounds();
        resetIntervals();
        world.keyboard = 0;
        world.level.enemies = [];        
    }

}