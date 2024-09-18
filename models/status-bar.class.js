class StatusBar extends DrawableObject {

    height = 50;
    width = 190;
    percentage;
    paths;

    constructor(paths, y, percentage) {
        super(); // -> muss aufgerufen werden, damit die Methoden vom übergeordneten Objekt initialisiert werden.
        this.loadImages(paths);
        this.paths = paths;
        this.y = y;
        this.setPercentage(paths, percentage);
    }

    setPercentage(paths, percentage) { // Man kann damit von außen zB angeben "setPercentage(50);", dann wird die Percentage auf 50 gesetzt.
        this.percentage = percentage; // Zahl zw. 0 und 5, um zu wissen, welches Bild aus dem Array angezeigt werden soll
        let path = paths[this.resolveImageIndex()];
        this.img = this.imageCache[path];      
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}