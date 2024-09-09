class Clouds extends MovableObject {

    y = 0;
    x = -500 + Math.random() * 3500; // -> Zufallszahl mal 3500, damit Verteilung passt; -500 fix, damit Startpunkt nicht weiter links
    height = 400;
    width = 700;
    speed = 0.03;

    constructor(imagePath) {
        super().loadImage(imagePath); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.animate();
    }

    animate() {        
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // -> wird 60 mal pro Sekunde ausgeführt -> Daher stocken die Wolken nicht, wenn sie sich bewegen.
    }

}