class Wraith extends MovableObject {

    x = 430 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten; 430 fix -> Startpunkt nicht weiter links
    y = 370;
    height = 100;
    width = 200;
    speed = 0.15 + Math.random() * 0.25; // Mindestgeschwindigkeit 0.15, max. 0.25; "Math.random" ist immer eine zufällige Zahl zw. 0 und 1.
    interval = 100;
    PATHS_WALKING = ['../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_000.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_001.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_002.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_003.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_004.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_005.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_006.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_007.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_008.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_009.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_010.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_011.png'];
    
    constructor() {
        super().loadImage('../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.        
        this.animate();
        this.loadImages(this.PATHS_WALKING);
    }

    animate() {
        this.moveLeft();
        this.changePicture(this.PATHS_WALKING, this.interval);
    }

}