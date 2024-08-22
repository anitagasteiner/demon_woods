class Wraith extends MovableObject {
    x = 100 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten; 100 fix, damit enemy nicht weiter links startet als unser character steht
    y = 370;
    height = 100;
    width = 200;

    constructor() {
        super().loadImage('../img/wraith/png/Walking/Wraith_02_Moving Forward_000_left.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
    }

    jump() {

    }
}