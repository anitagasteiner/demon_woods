class CollectableObject extends DrawableObject {
    
    x = 200 + Math.random() * 3000; // -> Zufallszahl mal 3000, damit Verteilung passt; 200 fix, damit Startpunkt nicht weiter links

    corrPlace() {
        if (this.x > 2000) {
            this.x = -750;
        }
    }
    
}