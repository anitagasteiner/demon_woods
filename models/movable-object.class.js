class MovableObject extends DrawableObject {

    canvasHeight = 480;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit auf der y-Achse
    acceleration = 2.5; // Beschleunigung
    energy = 100;
    lastHit = 0;

    moveLeft() {
        this.x -= this.speed;  // Von der x-Koordinate werden soviel px abgezogen, wie in der Variable "speed" angegeben.
        this.otherDirection = true;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    animate(paths, interval) {
        setInterval(() => {
            this.changePictures(paths);            
        }, interval);
    }

    fly() {
        this.speedY = 30;        
    }

    applyGravity() { // Die y-Achse wird regelmäßig verringert.
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; // negative Geschwindigkeit, damit das Objekt nach unten fällt
            }
            if (this.y > 205) { // Damit Objekt nicht weiter unten landet als es ursprünglich war.
                this.y = 205;
            }
        }, 1000 / 25); // 25-mal pro Sekunde
    }

    isAboveGround() { // returnt, ob das Objekt in der Luft ist
        return this.y < 205;
    }

    // character.isColliding(wraith);
    isColliding(movableObject) { // Kollisionsberechnung
        return  this.x + this.width > movableObject.x && this.y + this.height > movableObject.y && this.x < movableObject.x && this.y < movableObject.y + movableObject.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // So kann Zeit in Zahlenform gespeichert werden. -> Millisekunden, die seit dem 1.1.1970 vergangen sind
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