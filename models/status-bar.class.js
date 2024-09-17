class StatusBar extends DrawableObject {

    // y_status_coins = 5;
    y_status_health = 45;
    // y_status_bottles = 85;
    percentage = 100;
    percentage_health = 100;
    // percentage_coins = 0;
    // percentage_bottles = 0;
    // PATHS_STATUS_COINS = [
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png', 
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png', 
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png', 
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png', 
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    //     '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'        
    // ];
    PATHS_STATUS_HEALTH = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    // PATHS_STATUS_BOTTLES = [
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png', 
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png', 
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png', 
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png', 
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png', 
    //     '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    // ];

    constructor() {
        super(); // -> muss aufgerufen werden, damit die Methoden vom übergeordneten Objekt initialisiert werden.
        this.loadImages(this.PATHS_STATUS_HEALTH);
        this.y = this.y_status_health;
        this.height = 50;
        this.width = 190;
        this.setPercentage(this.percentage_health);
    }

    setPercentage(percentage) { // Man kann damit von außen zB angeben "setPercentage(50);", dann wird die Percentage auf 50 gesetzt.
        this.percentage = percentage; // Zahl zw. 0 und 5, um zu wissen, welches Bild aus dem Array angezeigt werden soll
        let path = this.PATHS_STATUS_HEALTH[this.resolveImageIndex()];
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