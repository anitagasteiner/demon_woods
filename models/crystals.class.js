class Crystal extends MovableObject {
    
    y = 400;
    x = -400 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; -400 fix, damit Startpunkt nicht weiter links
    height = 50;
    width = 75;

    constructor() {
        super().loadImage('../img/crystal/crystal.png');
    }
    
}