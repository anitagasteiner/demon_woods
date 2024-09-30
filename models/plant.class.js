class Plant extends MovableObject {
    
    y = -25;
    x = -400 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; -400 fix, damit Startpunkt nicht weiter links
    height = 500;
    width = 750;

    constructor() {
        super().loadImage('img/bg/layers/plant.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
    }
    
}