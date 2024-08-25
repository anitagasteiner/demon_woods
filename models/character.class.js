class Character extends MovableObject {

    interval = 170;
    world;
    PATHS_IDLE = ['../img/character/Fairy_03__IDLE_000.png', '../img/character/Fairy_03__IDLE_001.png', '../img/character/Fairy_03__IDLE_002.png', '../img/character/Fairy_03__IDLE_003.png', '../img/character/Fairy_03__IDLE_004.png', '../img/character/Fairy_03__IDLE_005.png', '../img/character/Fairy_03__IDLE_006.png', '../img/character/Fairy_03__IDLE_007.png', '../img/character/Fairy_03__IDLE_008.png', '../img/character/Fairy_03__IDLE_009.png'];

    constructor() {
        super().loadImage('../img/character/Fairy_03__IDLE_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.animate();
        this.moveRight();
        this.moveLeftTest();
    }

    animate() {
        this.changePicture(this.PATHS_IDLE, this.interval);
    }

    moveRight() {        
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {            
                this.x += 5;
            };
        }, 1000 / 60);
    }

    moveLeftTest() {        
        setInterval(() => {
            if(this.world.keyboard.LEFT) {            
                this.x -= 5;
            };
        }, 1000 / 60);
    }

    jump() {

    }

}