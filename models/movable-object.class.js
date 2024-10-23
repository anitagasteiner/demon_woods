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
            } else {
                this.y = 150;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground by checking if its y value is below 150.
     * If the object is an instance of "ThrowableObject" it always returns true so that the throwable object does not stop at the ground but continues falling when the function "applyGravity()" is being executed.
     * @returns {boolean} true if the object is an instance of "ThrowableObject" or if its y value is lower than 150
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    // isBelowGround() {
    //     if (this instanceof ThrowableObject) {
    //         return false;
    //     } else {
    //         return this.y > 150;
    //     }
    // }


    // TODO - hier weiter!!!!!
    
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left
        && this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right
        && this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        && this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top;
    }

    isJumpingOn(wraith) {
        return this.x + this.width - this.offset.right > wraith.x + wraith.offset.left
        && this.x + this.offset.left < wraith.x + wraith.width - wraith.offset.right
        && this.y + this.height - this.offset.bottom > wraith.y + wraith.offset.top
        && this.y + this.height - this.offset.bottom < wraith.y + wraith.offset.top + 15;
    }

    hit() {
        this.looseEnergy();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // So kann Zeit in Zahlenform gespeichert werden. -> Millisekunden, die seit dem 1.1.1970 vergangen sind
        }
    }

    looseEnergy() {
        if (this.demon) {
            this.energy -= 25;
        } else if (!this.demon) {
            this.energy -= 20;
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // vergangene Zeitspanne in Millisekunden
        timePassed = timePassed / 1000; // -> in Sekunden
        return timePassed < 0.5; // Wenn die vergangene Zeit unter 1/2 Sekunde liegt, wir also innerhalb der letzten 1/2 Sekunde getroffen wurden, dann returnt diese Funktion den Wert "true".
    }

    isDead() {
        return this.energy == 0; // Wenn die "energy" "0" ist, dann kommt aus dieser Funktion der Wert "0" raus. (true/false)
    }

    youWinAction() {
        world.keyboard = 0;
        this.showBannerWin();
        this.handleBannerContainer();
        setTimeout(() => {
            this.handleBannerContainer();
            this.handleRestartContainer();
        }, 1500);
    }

    youLoseAction() {
        world.keyboard = 0;
        this.showBannerLose();
        this.handleBannerContainer();
        setTimeout(() => {
            this.handleBannerContainer();
            this.handleRestartContainer();
        }, 1500);
    }

}