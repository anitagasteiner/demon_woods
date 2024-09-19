class Crystal extends MovableObject {
    
    y = 400;
    x = 100 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; 100 fix, damit Startpunkt nicht weiter links
    height = 65;
    width = 65;

    constructor() {
        super().loadImage('../img/crystal/crystal.png');
    }
    
}