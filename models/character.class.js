class Character extends MovableObject {

    interval_idle = 170;
    interval_walk = 50; // 50 ms = 20 mal pro Sekunde
    speed = 5;
    world;
    PATHS_IDLE = ['../img/character/Fairy_03__IDLE_000.png', '../img/character/Fairy_03__IDLE_001.png', '../img/character/Fairy_03__IDLE_002.png', '../img/character/Fairy_03__IDLE_003.png', '../img/character/Fairy_03__IDLE_004.png', '../img/character/Fairy_03__IDLE_005.png', '../img/character/Fairy_03__IDLE_006.png', '../img/character/Fairy_03__IDLE_007.png', '../img/character/Fairy_03__IDLE_008.png', '../img/character/Fairy_03__IDLE_009.png'];
    PATHS_WALK = ['img/character/Fairy_03__WALK_000.png', 'img/character/Fairy_03__WALK_001.png', 'img/character/Fairy_03__WALK_002.png', 'img/character/Fairy_03__WALK_003.png', 'img/character/Fairy_03__WALK_004.png', 'img/character/Fairy_03__WALK_005.png', 'img/character/Fairy_03__WALK_006.png', 'img/character/Fairy_03__WALK_007.png', 'img/character/Fairy_03__WALK_008.png', 'img/character/Fairy_03__WALK_009.png'];
    PATHS_WALK_LEFT = ['img/character/Fairy_03__WALK_left_000.png', 'img/character/Fairy_03__WALK_left_001.png', 'img/character/Fairy_03__WALK_left_002.png', 'img/character/Fairy_03__WALK_left_003.png', 'img/character/Fairy_03__WALK_left_004.png', 'img/character/Fairy_03__WALK_left_005.png', 'img/character/Fairy_03__WALK_left_006.png', 'img/character/Fairy_03__WALK_left_007.png', 'img/character/Fairy_03__WALK_left_008.png', 'img/character/Fairy_03__WALK_left_009.png', ];

    constructor() {
        super().loadImage('../img/character/Fairy_03__IDLE_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.animate();
        this.walkRight();
        this.walkLeft();
    }

    animate() {
        this.changePicture(this.PATHS_IDLE, this.interval_idle);
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.loadImages(this.PATHS_WALK);
                let i = this.currentImage % this.PATHS_WALK.length;
                let path = this.PATHS_WALK[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, this.interval_walk);
        setInterval(() => {
            if(this.world.keyboard.LEFT) {
                this.loadImages(this.PATHS_WALK_LEFT);
                let i = this.currentImage % this.PATHS_WALK.length;
                let path = this.PATHS_WALK_LEFT[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, this.interval_walk); 
    }



    walkRight() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT) {
                this.x += this.speed;
            }
        }, 1000 / 60); // 60 mal pro Sekunde
    }

    walkLeft() {
        setInterval(() => {
            if(this.world.keyboard.LEFT) {
                this.x -= this.speed;
            }
        }, 1000 / 60); // 60 mal pro Sekunde   
    }







    jump() {

    }

}