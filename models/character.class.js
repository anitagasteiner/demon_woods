class Character extends MovableObject {

    interval_idle = 170;
    interval_walk = 50; // 50 ms = 20 mal pro Sekunde
    speed = 5;
    world;
    PATHS_IDLE = ['../img/character/Fairy_03__IDLE_000.png', '../img/character/Fairy_03__IDLE_001.png', '../img/character/Fairy_03__IDLE_002.png', '../img/character/Fairy_03__IDLE_003.png', '../img/character/Fairy_03__IDLE_004.png', '../img/character/Fairy_03__IDLE_005.png', '../img/character/Fairy_03__IDLE_006.png', '../img/character/Fairy_03__IDLE_007.png', '../img/character/Fairy_03__IDLE_008.png', '../img/character/Fairy_03__IDLE_009.png'];
    PATHS_WALK = ['img/character/Fairy_03__WALK_000.png', 'img/character/Fairy_03__WALK_001.png', 'img/character/Fairy_03__WALK_002.png', 'img/character/Fairy_03__WALK_003.png', 'img/character/Fairy_03__WALK_004.png', 'img/character/Fairy_03__WALK_005.png', 'img/character/Fairy_03__WALK_006.png', 'img/character/Fairy_03__WALK_007.png', 'img/character/Fairy_03__WALK_008.png', 'img/character/Fairy_03__WALK_009.png'];

    constructor() {
        super().loadImage('../img/character/Fairy_03__IDLE_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.animate();
        this.walkRight();
        this.walkLeft();
    }

    animate() {        
        setInterval(() => { // idle
            if(this.world.keyboard.SPACE == false && this.world.keyboard.DOWN == false && this.world.keyboard.UP == false && this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false) {
                let i = this.currentImage % this.PATHS_IDLE.length;
                let path = this.PATHS_IDLE[i];
                this.img = this.imageCache[path]; // Wir greifen auf den Eintrag "path" in unserem Array zu.
                this.currentImage++;
            }
        }, this.interval_idle);   
        setInterval(() => { // walk
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.loadImages(this.PATHS_WALK);
                let i = this.currentImage % this.PATHS_WALK.length;
                let path = this.PATHS_WALK[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, this.interval_walk);
    }

    walkRight() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
        }, 1000 / 60); // 60 mal pro Sekunde
    }

    walkLeft() {
        setInterval(() => {
            if(this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60); // 60 mal pro Sekunde   
    }

    jump() {

    }

}