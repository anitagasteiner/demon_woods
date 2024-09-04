class Character extends MovableObject {

    height = 300;
    width = 500;
    // y = 80;
    interval_idle = 170;
    interval_walk = 50; // 50 ms = 20 mal pro Sekunde
    interval_fly = 10;
    speed = 5;
    world;
    PATHS_IDLE = ['../img/character/Fairy_03__IDLE_000.png', '../img/character/Fairy_03__IDLE_001.png', '../img/character/Fairy_03__IDLE_002.png', '../img/character/Fairy_03__IDLE_003.png', '../img/character/Fairy_03__IDLE_004.png', '../img/character/Fairy_03__IDLE_005.png', '../img/character/Fairy_03__IDLE_006.png', '../img/character/Fairy_03__IDLE_007.png', '../img/character/Fairy_03__IDLE_008.png', '../img/character/Fairy_03__IDLE_009.png'];
    PATHS_WALK = ['img/character/Fairy_03__WALK_000.png', 'img/character/Fairy_03__WALK_001.png', 'img/character/Fairy_03__WALK_002.png', 'img/character/Fairy_03__WALK_003.png', 'img/character/Fairy_03__WALK_004.png', 'img/character/Fairy_03__WALK_005.png', 'img/character/Fairy_03__WALK_006.png', 'img/character/Fairy_03__WALK_007.png', 'img/character/Fairy_03__WALK_008.png', 'img/character/Fairy_03__WALK_009.png'];
    PATHS_FLY = ['img/character/Fairy_03__FLY_000.png', 'img/character/Fairy_03__FLY_001.png', 'img/character/Fairy_03__FLY_002.png', 'img/character/Fairy_03__FLY_003.png', 'img/character/Fairy_03__FLY_004.png', 'img/character/Fairy_03__FLY_005.png', 'img/character/Fairy_03__FLY_006.png'];
    sound_walking = new Audio('audio/character_walking.mp4');

    constructor() {
        super().loadImage(this.PATHS_IDLE [0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.loadImages(this.PATHS_WALK);
        this.loadImages(this.PATHS_FLY);
        this.animate();
        this.walk();
        this.fly();
        this.applyGravity();
    }

    animate() {
        setInterval(() => { // idle
            if(this.world.keyboard.SPACE == false && this.world.keyboard.DOWN == false && this.world.keyboard.UP == false && this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false) {
                this.changePicture(this.PATHS_IDLE);
            }
        }, this.interval_idle);   
        setInterval(() => { // while walking
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.changePicture(this.PATHS_WALK);
            }
        }, this.interval_walk);
        setInterval(() => { // while flying
            if(this.isAboveGround()) {
                this.changePicture(this.PATHS_FLY);
            }
        }, this.interval_fly);
    }

    walk() {
        setInterval(() => {
            this.sound_walking.pause();            
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.sound_walking.play();
            }
            if(this.world.keyboard.LEFT && this.x > -820) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.sound_walking.play();
            }
            this.world.camera_x = -this.x - 100; // Gegenteil der x-Achse des Characters, damit sich Camera genau gegengleich bewegt.
        }, 1000 / 60); // 60 mal pro Sekunde
    }

    fly() {
        setInterval(() => {
            if(this.world.keyboard.UP) {
                this.speedY = -20;
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }            
        }, 1000 / 25); // 25 mal pro Sekunde        
    }

}