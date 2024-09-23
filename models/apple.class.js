class Apple extends MovableObject {
    
    y = 350;
    x = 300 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; 300 fix, damit Startpunkt nicht weiter links
    height = 50;
    width = 50;

    constructor() {
        super().loadImage('../img/apple/apple.png');
    }
    
}