class Character extends MovableObject {

    height = 370;
    width = 600;
    x = -100;
    y = 150;
    offset = {
        top: 120,
        bottom: 90,
        left: 270,
        right: 270
    };
    speed = 5;
    world;
    demon = false;
    sound_walking = new Audio('audio/character_walking.mp4');
    sound_dying = new Audio('audio/character_dying.wav');
    sound_hurt = new Audio('audio/character_hurt.wav');
    PATHS_IDLE = [
        'img/character/Fairy_03__IDLE_000.png',
        'img/character/Fairy_03__IDLE_001.png',
        'img/character/Fairy_03__IDLE_002.png',
        'img/character/Fairy_03__IDLE_003.png',
        'img/character/Fairy_03__IDLE_004.png',
        'img/character/Fairy_03__IDLE_005.png',
        'img/character/Fairy_03__IDLE_006.png',
        'img/character/Fairy_03__IDLE_007.png',
        'img/character/Fairy_03__IDLE_008.png',
        'img/character/Fairy_03__IDLE_009.png'
    ];
    PATHS_WALK = [
        'img/character/Fairy_03__WALK_000.png',
        'img/character/Fairy_03__WALK_001.png',
        'img/character/Fairy_03__WALK_002.png',
        'img/character/Fairy_03__WALK_003.png',
        'img/character/Fairy_03__WALK_004.png',
        'img/character/Fairy_03__WALK_005.png',
        'img/character/Fairy_03__WALK_006.png',
        'img/character/Fairy_03__WALK_007.png',
        'img/character/Fairy_03__WALK_008.png',
        'img/character/Fairy_03__WALK_009.png'
    ];
    PATHS_FLY = [
        'img/character/Fairy_03__FLY_000.png',
        'img/character/Fairy_03__FLY_001.png',
        'img/character/Fairy_03__FLY_002.png',
        'img/character/Fairy_03__FLY_003.png',
        'img/character/Fairy_03__FLY_004.png',
        'img/character/Fairy_03__FLY_005.png',
        'img/character/Fairy_03__FLY_006.png'
    ];
    PATHS_DIE = [
        'img/character/Fairy_03__DIE_000.png',
        'img/character/Fairy_03__DIE_001.png',
        'img/character/Fairy_03__DIE_002.png',
        'img/character/Fairy_03__DIE_003.png',
        'img/character/Fairy_03__DIE_004.png',
        'img/character/Fairy_03__DIE_005.png',
        'img/character/Fairy_03__DIE_006.png',
        'img/character/Fairy_03__DIE_007.png',
        'img/character/Fairy_03__DIE_008.png',
        'img/character/Fairy_03__DIE_009.png'
    ];
    PATHS_HURT = [
        'img/character/Fairy_03__HURT_000.png',
        'img/character/Fairy_03__HURT_001.png',
        'img/character/Fairy_03__HURT_002.png',
        'img/character/Fairy_03__HURT_003.png',
        'img/character/Fairy_03__HURT_004.png',
        'img/character/Fairy_03__HURT_005.png',
        'img/character/Fairy_03__HURT_006.png',
        'img/character/Fairy_03__HURT_007.png',
        'img/character/Fairy_03__HURT_008.png',
        'img/character/Fairy_03__HURT_009.png'        
    ];
    paths_index = 0; // Zähler für die Bildfolge
    paths_die_total = this.PATHS_DIE.length;

    constructor() {
        super().loadImage(this.PATHS_IDLE[0]);
        this.loadImages(this.PATHS_IDLE);
        this.loadImages(this.PATHS_WALK);
        this.loadImages(this.PATHS_FLY);
        this.loadImages(this.PATHS_DIE);
        this.loadImages(this.PATHS_HURT);
        this.characterDies();
        this.setStoppableIntervals();
        this.applyGravity();
    }

    characterDies() { 
        const intervalIdDie = setInterval(() => {
            this.sound_dying.pause();
            if (this.isDead()) {
                this.sound_dying.play();
                if (this.paths_index < this.paths_die_total) {
                    this.loadImage(this.PATHS_DIE[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDie);
                    this.loadImage(this.PATHS_DIE[this.paths_die_total - 1]);                    
                    this.youLoseAction();
                }                
            }
        }, 300);
    }

    setStoppableIntervals() {
        this.setStoppableInterval(this.characterIdle, 170);
        this.setStoppableInterval(this.characterWalking, 50);
        this.setStoppableInterval(this.characterFly, 40);
        this.setStoppableInterval(this.characterHurt, 400);
        this.setStoppableInterval(this.characterMove, 15);
    }    

    characterIdle() {
        if (!this.isDead() && this.world.keyboard.UP == false && this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false) {
            this.changePictures(this.PATHS_IDLE);
        }
    }

    characterWalking() {
        if (!this.isDead() && this.world.keyboard.RIGHT && !this.isAboveGround() || !this.isDead() && this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.changePictures(this.PATHS_WALK);
        }
    }

    characterFly() {
        if (!this.isDead() && this.world.keyboard.UP && !this.isAboveGround()) {
            this.fly();
        } else if (!this.isDead() && this.isAboveGround()) {
            this.changePictures(this.PATHS_FLY);
        }    
    }

    characterHurt() {
        this.sound_hurt.pause();
        if (!this.isDead() && this.isHurt()) {
            this.sound_hurt.play();
            this.changePictures(this.PATHS_HURT);
        }
    }

    characterMove() {
        this.sound_walking.pause();
        if (!this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.sound_walking.play();
        }
        if (!this.isDead() && this.world.keyboard.LEFT && this.x > -670) {
            this.moveLeft();                
            this.sound_walking.play();
        }
        if (this.isAboveGround()) {
            this.sound_walking.pause();
        }
        this.world.camera_x = -this.x -100; // Gegenteil der x-Achse des Characters, damit sich Camera genau gegengleich bewegt
    }

}