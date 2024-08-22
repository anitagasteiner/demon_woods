class Clouds extends MovableObject {
    x = -200 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten
    y = 0;
    height = 400;
    width = 700;

    constructor(imagePath) {
        super().loadImage(imagePath); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
    }
}