class ThrowableObject extends MovableObject {

    speedY = 0; // Geschwindigkeit auf der y-Achse
    speedX = 20; // konstant
    acceleration = 2.5; // Beschleunigung
    height = 65;
    width = 65;

    constructor() {
        super().loadImage('../img/crystal/crystal.png');
        this.x = 240;
        this.y = 350;
        this.throw();
        this.applyGravity();
    }

    throw() {
        setInterval(() => {
            if (this.world.keyboard.T && !this.isAboveGround()) {
                this.speedY = 30;
                // this.insertCrystal();
            }
        }, 300); // 25 mal pro Sekunde
    }

    applyGravity() { // Die y-Achse wird regelmäßig verringert.
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.x += this.speedX;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 350) {
                this.y = 350;
            }      
        }, 1000 / 25); // 25-mal pro Sekunde
    }

    isAboveGround() { // returnt, ob das Objekt in der Luft ist
        return this.y < 350;
    }








    // insertCrystal() {
    //     this.world.addToMap(this.world.throwableObject);
    // }

}