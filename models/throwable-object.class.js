class ThrowableObject extends MovableObject {

    speedY = 0; // Geschwindigkeit auf der y-Achse
    speedX = 20; // konstant
    //acceleration = 2.5; // Beschleunigung
    height = 65;
    width = 65;

    constructor() {
        super().loadImage('../img/crystal/crystal.png');
        this.x = 250;
        this.y = 300;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        setInterval(() => {
            if (this.world.keyboard.T) {
                console.log('THROW!');
                // this.insertCrystal();
            }
        }, 300); // 25 mal pro Sekunde
    }

    // insertCrystal() {
    //     this.world.addToMap(this.world.throwableObject);
    // }

    // applyGravity() { // Die y-Achse wird regelmäßig verringert.
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration; // negative Geschwindigkeit, damit das Objekt nach unten fällt
    //         }
    //         if (this.y > 205) { // Damit Objekt nicht weiter unten landet als es ursprünglich war.
    //             this.y = 205;
    //         }
    //     }, 1000 / 25); // 25-mal pro Sekunde
    // }

}