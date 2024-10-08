class ThrowableObject extends MovableObject {

    speedY = 0; // Geschwindigkeit auf der y-Achse
    speedX = 20; // konstant
    acceleration = 2.5; // Beschleunigung
    height = 65;
    width = 65;
    sound_throwing = new Audio('audio/throw.wav');
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    constructor(x, y, otherDirection) {
        super().loadImage('img/crystal/crystal.png');
        this.x = x;
        this.y = y;
        this.throw(otherDirection);
    }

    throw(otherDirection) {
        this.sound_throwing.play();
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (otherDirection == true) {
                this.x -= 6;
            } else {
                this.x += 6;
            }
        }, 25);
    }

}