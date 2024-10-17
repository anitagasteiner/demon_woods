class MovableObject extends DrawableObject {

    canvasHeight = 480;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit auf der y-Achse
    acceleration = 2.5; // Beschleunigung
    energy = 100;
    lastHit = 0;
    intervalIds = [];

    setStoppableInterval(fn, time) {
        let id = setInterval(() => fn.call(this), time);
        this.intervalIds.push(id);
    }

    moveLeft() {
        this.x -= this.speed;  // Von der x-Koordinate werden soviel px abgezogen, wie in der Variable "speed" angegeben.
        this.otherDirection = true;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    // animate(paths, interval) {
    //     const intervalIdAnimate = setInterval(() => {
    //         this.changePictures(paths);            
    //     }, interval);
    // }

    fly() {
        this.speedY = 30;        
    }

    applyGravity() { // Die y-Achse wird regelmäßig verringert.
        const intervalIdAboveGround = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; // negative Geschwindigkeit, damit das Objekt nach unten fällt
            }
        }, 1000 / 25); // 25-mal pro Sekunde
    }

    isAboveGround() { // returnt, ob das Objekt in der Luft ist
        if (this instanceof ThrowableObject) { // -> damit die ThrowableObjects immer ganz nach unten fallen
            return true;
        } else {
            return this.y < 150;
        }
    }

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
        && this.y + this.height - this.offset.bottom < wraith.y + wraith.offset.top + 10;
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
        let timePassed = new Date().getTime() - this.lastHit; // Welche Zeitspanne ist vergangen? -> in Millisekunden
        timePassed = timePassed / 1000; // -> in Sekunden
        return timePassed < 0.5; // Wenn die vergangene Zeit unter 1/2 Sekunde liegt, wir also innerhalb der letzten 1/2 Sekunde getroffen wurden, dann returnt diese Funktion den Wert "true".
    }

    isDead() {
        return this.energy == 0; // Wenn die "energy" "0" ist, dann kommt aus dieser Funktion der Wert "0" raus. (true/false)
    }

}