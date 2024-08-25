class Clouds extends MovableObject {

    y = 0;
    height = 400;
    width = 700;
    speed = 0.03;

    constructor(imagePath) {
        super().loadImage(imagePath); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.x = -200 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}