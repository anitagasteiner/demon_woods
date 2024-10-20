class Demon extends MovableObject {

    x = 2600;
    y = 20;
    height = 600;
    width = 670;
    offset = {
        top: 90,
        bottom: 190,
        left: 210,
        right: 280
    };
    interval_hurt = 200;
    speed = 0.7;
    demon = true;
    sound_demon_dead = new Audio('audio/demon_dead.wav');
    sound_demon_hit = new Audio('audio/demon_hit.wav');
    sound_demon_attack = new Audio('audio/demon_attack.wav');
    PATHS_ATTACK = [
        'img/demon/attacking/wraith_03_attacking_000.png',
        'img/demon/attacking/wraith_03_attacking_001.png',
        'img/demon/attacking/wraith_03_attacking_002.png',
        'img/demon/attacking/wraith_03_attacking_003.png',
        'img/demon/attacking/wraith_03_attacking_004.png',
        'img/demon/attacking/wraith_03_attacking_005.png',
        'img/demon/attacking/wraith_03_attacking_006.png',
        'img/demon/attacking/wraith_03_attacking_007.png',
        'img/demon/attacking/wraith_03_attacking_008.png',
        'img/demon/attacking/wraith_03_attacking_009.png',
        'img/demon/attacking/wraith_03_attacking_010.png',
        'img/demon/attacking/wraith_03_attacking_011.png'
    ];
    PATHS_IDLE = [
        'img/demon/walking/wraith_03_moving_forward_000.png',
        'img/demon/walking/wraith_03_moving_forward_001.png',
        'img/demon/walking/wraith_03_moving_forward_002.png',
        'img/demon/walking/wraith_03_moving_forward_003.png',
        'img/demon/walking/wraith_03_moving_forward_004.png',
        'img/demon/walking/wraith_03_moving_forward_005.png',
        'img/demon/walking/wraith_03_moving_forward_006.png',
        'img/demon/walking/wraith_03_moving_forward_007.png',
        'img/demon/walking/wraith_03_moving_forward_008.png',
        'img/demon/walking/wraith_03_moving_forward_009.png',
        'img/demon/walking/wraith_03_moving_forward_010.png',
        'img/demon/walking/wraith_03_moving_forward_011.png'
    ];
    PATHS_HURT = [
        'img/demon/hurt/wraith_03_hurt_000.png',
        'img/demon/hurt/wraith_03_hurt_001.png',
        'img/demon/hurt/wraith_03_hurt_002.png',
        'img/demon/hurt/wraith_03_hurt_003.png',
        'img/demon/hurt/wraith_03_hurt_004.png',
        'img/demon/hurt/wraith_03_hurt_005.png',
        'img/demon/hurt/wraith_03_hurt_006.png',
        'img/demon/hurt/wraith_03_hurt_007.png',
        'img/demon/hurt/wraith_03_hurt_008.png',
        'img/demon/hurt/wraith_03_hurt_009.png',
        'img/demon/hurt/wraith_03_hurt_010.png',
        'img/demon/hurt/wraith_03_hurt_011.png'
    ];
    PATHS_EXPLOSION = [
        'img/demon/explosion/1/Explosion_1.png',
        'img/demon/explosion/1/Explosion_2.png',
        'img/demon/explosion/1/Explosion_3.png',
        'img/demon/explosion/1/Explosion_4.png',
        'img/demon/explosion/1/Explosion_5.png',
        'img/demon/explosion/1/Explosion_6.png',
        'img/demon/explosion/2/Explosion_1_1.png',
        'img/demon/explosion/2/Explosion_1_2.png',
        'img/demon/explosion/2/Explosion_1_3.png',
        'img/demon/explosion/2/Explosion_1_4.png',
        'img/demon/explosion/2/Explosion_1_5.png',
        'img/demon/explosion/2/Explosion_1_6.png'
    ];
    paths_index = 0; // Zähler für die Bildfolge
    paths_hurt_total = this.PATHS_HURT.length;
    paths_explosion_total = this.PATHS_EXPLOSION.length * 4;
    death_sound_index = 20;
    hit_sound_index = 1;

    constructor() {
        super().loadImage(this.PATHS_IDLE[0]);
        this.loadImages(this.PATHS_ATTACK);        
        this.loadImages(this.PATHS_IDLE);
        this.loadImages(this.PATHS_HURT);
        this.loadImages(this.PATHS_EXPLOSION);
        this.demonDead();
        this.demonHurt();
        this.setStoppableIntervals();
    }

    setStoppableIntervals() {
        this.setStoppableInterval(this.demonMove, 20);
        this.setStoppableInterval(this.demonIdle, 500);
    }

    demonDead() {
        const intervalIdDemonDead = setInterval(() => {
            if (this.isDead()) {
                this.playSoundDemonDead();
                setTimeout(() => {
                    if (this.paths_index < this.paths_explosion_total) {
                        this.showExplosion();                        
                        this.paths_index++;
                    } else {
                        clearInterval(intervalIdDemonDead);
                        this.deleteDemon();
                        this.paths_index = 0;
                        this.youWinAction();
                    }
                }, 500);                
            }
        }, 100);
    }

    playSoundDemonDead() {
        if (this.death_sound_index > 0) {
            this.sound_demon_dead.play();
            this.death_sound_index--;
        }
    }

    showExplosion() {
        this.changePictures(this.PATHS_EXPLOSION);
        this.y = 65;
        this.x += 40;
        this.height = 420;
        this.width = 250;
        this.offset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };        
    }

    deleteDemon() {
        for (let i = 0; i < world.character.world.level.enemies.length; i++) {
            if (world.character.world.level.enemies[i].demon == true) {
                world.character.world.level.enemies.splice(i, 1);
            }
        }
    }

    demonIdle() {
        if (!this.isDead()) {
            if (this.x - world.character.x + world.character.width - world.character.offset.right < 600) {
                this.changePictures(this.PATHS_ATTACK);
                this.sound_demon_attack.play();
            } else {
                this.changePictures(this.PATHS_IDLE);
            }            
        }
    }

    demonMove() {
        if (!this.isDead() && this.x - world.character.x + world.character.width - world.character.offset.right < 1000) {
            this.moveLeft();
        }
    }

    demonHurt() {
        this.demonHurtFirstTime();
        this.demonHurtSecondTime();
        this.demonHurtThirdTime();
    }

    demonHurtFirstTime() {
        const intervalIdDemonHurt1 = setInterval(() => {
            if (!this.isDead() && this.energy == 75) {
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt1);
                    this.paths_index = 0;
                    this.hit_sound_index = 1;
                    this.demonShrinksFirstTime();
                }                
            }
        }, this.interval_hurt);
    }

    demonShrinksFirstTime() {
        this.y = 60;
        this.height = 540;
        this.width = 603;
        this.offset = {
            top: 81,
            bottom: 171,
            left: 189,
            right: 252
        };
    }

    demonHurtSecondTime() {
        const intervalIdDemonHurt2 = setInterval(() => {
            if (!this.isDead() && this.energy == 50) {
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt2);
                    this.paths_index = 0;
                    this.hit_sound_index = 1;
                    this.demonShrinksSecondTime();
                }                
            }
        }, this.interval_hurt);
    }

    demonShrinksSecondTime() {
        this.y = 80;
        this.height = 486;
        this.width = 542.7;
        this.offset = {
            top: 72.9,
            bottom: 153.9,
            left: 170.1,
            right: 226.8
        };
    }

    demonHurtThirdTime() {
        const intervalIdDemonHurt3 = setInterval(() => {
            if (!this.isDead() && this.energy == 25) {
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt3);
                    this.paths_index = 0;
                    this.hit_sound_index = 1;
                    this.demonShrinksThirdTime();
                }                
            }
        }, this.interval_hurt);
    }

    demonShrinksThirdTime() {
        this.y = 100;
        this.height = 437.4;
        this.width = 488.4;
        this.offset = {
            top: 65.6,
            bottom: 138.5,
            left: 153.1,
            right: 204.1
        };
    }

    playSoundDemonHurt() {
        if (this.hit_sound_index > 0) {
            this.sound_demon_hit.play();
            this.hit_sound_index--;
        }
    }
    
}