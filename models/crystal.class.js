class Crystal extends MovableObject {
    
    y = 400;
    x = 300 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; 300 fix, damit Startpunkt nicht weiter links
    height = 65;
    width = 65;

    constructor() {
        super().loadImage('../img/crystal/crystal.png');
    }
    
}