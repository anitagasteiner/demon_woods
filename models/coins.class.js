class Coin extends MovableObject {
    
    y = 320;
    x = 300 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; 300 fix, damit Startpunkt nicht weiter links
    height = 100;
    width = 100;

    constructor() {
        super().loadImage('../img/coin/coin.png');
    }
    
}