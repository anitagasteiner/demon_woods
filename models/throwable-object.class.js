class ThrowableObject extends MovableObject {

    speedY = 0; // Geschwindigkeit auf der y-Achse
    speedX = 20; // konstant
    acceleration = 2.5; // Beschleunigung
    height = 65;
    width = 65;
    sound_throwing = new Audio('../audio/throw.wav');

    constructor(x, y) {
        super().loadImage('../img/crystal/crystal.png');
        this.x = x; // 150 + 90 = 240
        this.y = y; // 205 + 145 = 350
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.sound_throwing.play();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    // applyGravity() { // Die y-Achse wird regelmäßig verringert.
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {
    //             this.x += this.speedX;
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration;
    //         }
    //         if (this.y > 450) {
    //             this.y = 450;
    //         }      
    //     }, 1000 / 25); // 25-mal pro Sekunde
    // }

    // insertCrystal() {
    //     this.world.addToMap(this.world.throwableObject);
    // }

}