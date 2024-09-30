class Wraith extends MovableObject {

    x = 430 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten; 430 fix -> Startpunkt nicht weiter links
    y = 370;
    height = 100;
    width = 200;
    speed = 0.15 + Math.random() * 0.25; // Mindestgeschwindigkeit 0.15, max. 0.25; "Math.random" ist immer eine zufällige Zahl zw. 0 und 1.
    interval = 100;
    interval_move = 30;
    PATHS_MOVING_FORWARD = [
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_000.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_001.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_002.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_003.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_004.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_005.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_006.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_007.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_008.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_009.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_010.png',
        'img/wraith/png/Walking/Wraith_02_Moving_Forward_011.png'
    ];
    
    constructor() {
        super().loadImage(this.PATHS_MOVING_FORWARD[0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_MOVING_FORWARD);        
        this.animate(this.PATHS_MOVING_FORWARD, this.interval);
        this.move();
    }

    move() {
        setInterval(() => {
            this.moveLeft();            
        }, this.interval_move);
    }

}