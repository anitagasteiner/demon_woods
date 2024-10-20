class Wraith extends MovableObject {

    wraithIndex;
    x = 430 + Math.random() * 1000; // -> Zufallszahl mal 1000, damit sie hoch genug ist, um ausreichend px zu erhalten; 430 fix -> Startpunkt nicht weiter links
    y = Math.floor(Math.random() * (380 - 330)) + 330; // -> Zufallszahl zwischen 330 (inkl.) und 380 (exkl.)
    height = 100;
    width = 200;
    offset = {
        top: 10,
        bottom: 35,
        left: 65,
        right: 60
    };
    speed = 0.15 + Math.random() * 1.5; // Mindestgeschwindigkeit 0.15, max. 0.25; "Math.random" ist immer eine zufällige Zahl zw. 0 und 1.
    demon = false;
    sound_disappearing = new Audio('audio/wraith_disappearing.mp3');
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
    PATHS_DYING = [
        'img/wraith/png/Dying/Wraith_02_Dying_000.png',
        'img/wraith/png/Dying/Wraith_02_Dying_001.png',
        'img/wraith/png/Dying/Wraith_02_Dying_002.png',
        'img/wraith/png/Dying/Wraith_02_Dying_003.png',
        'img/wraith/png/Dying/Wraith_02_Dying_004.png',
        'img/wraith/png/Dying/Wraith_02_Dying_005.png',
        'img/wraith/png/Dying/Wraith_02_Dying_006.png',
        'img/wraith/png/Dying/Wraith_02_Dying_007.png',
        'img/wraith/png/Dying/Wraith_02_Dying_008.png',
        'img/wraith/png/Dying/Wraith_02_Dying_009.png',
        'img/wraith/png/Dying/Wraith_02_Dying_010.png',
        'img/wraith/png/Dying/Wraith_02_Dying_011.png',
        'img/wraith/png/Dying/Wraith_02_Dying_012.png',
        'img/wraith/png/Dying/Wraith_02_Dying_013.png',
        'img/wraith/png/Dying/Wraith_02_Dying_014.png'
    ];
    paths_index = 0; // Zähler für die Bildfolge
    paths_defeated_total = this.PATHS_DYING.length;
    
    constructor(i) {
        super().loadImage(this.PATHS_MOVING_FORWARD[0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_MOVING_FORWARD);
        this.loadImages(this.PATHS_DYING);
        this.wraithDefeated();
        this.setStoppableIntervals();
        this.wraithIndex = i;
    }

    wraithDefeated() {
        const intervalIdWraithDefeated = setInterval(() => {
            if (this.isDead()) {
                if (this.paths_index < this.paths_defeated_total) {
                    this.loadImage(this.PATHS_DYING[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdWraithDefeated);
                    this.loadImage(this.PATHS_DYING[this.paths_defeated_total - 1]);
                    setTimeout(() => {
                        this.sound_disappearing.play();
                        world.wraiths_defeated += 1;
                        document.getElementById('wraithsDefeated').innerHTML = world.wraiths_defeated;
                        for (let i = 0; i < world.level.enemies.length; i++) {
                            if (world.level.enemies[i].wraithIndex === this.wraithIndex) {
                                world.level.enemies.splice(i, 1);
                            }
                        }
                    }, 500);
                }
            }            
        }, 80);
    }

    setStoppableIntervals() {
        this.setStoppableInterval(this.wraithMoving, 100);
        this.setStoppableInterval(this.wraithMove, 30);
    }

    wraithMoving() {
        if (!this.isDead()) {
            this.changePictures(this.PATHS_MOVING_FORWARD);
        }
    }

    wraithMove() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

}