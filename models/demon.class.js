/**
 * Represents the demon object.
 */
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
    interval_hurt = 100;
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
    paths_hurt_total = this.PATHS_HURT.length;
    paths_explosion_total = this.PATHS_EXPLOSION.length * 4;
    death_sound_index = 20;
    demon_hurt = false;

    /**
     * Creates a new Demon instance.
     * Loads its images for different actions (idle, attack, being hurt, explosion).
     * Sets up the function to handle the death of the demon.
     * Sets up the function to handle the actions of the demon being hurt.
     * Sets up the function "setStoppableIntervals" to handle the different actions of the demon that have to be stopped when the game is restarted.
     */
    constructor() {
        super().loadImage(this.PATHS_IDLE[0]);
        this.loadImages(this.PATHS_IDLE);
        this.loadImages(this.PATHS_ATTACK);
        this.loadImages(this.PATHS_HURT);
        this.loadImages(this.PATHS_EXPLOSION);
        this.demonDead();
        this.demonHurt();
        this.setStoppableIntervals();
    }

    /**
     * Sets stoppable intervals to handle the different actions of the demon (move, idle).
     */
    setStoppableIntervals() {
        this.setStoppableInterval(this.demonMove, 20);
        this.setStoppableInterval(this.demonIdle, 100);
    }

    /**
     * Sets an interval to constantly check if the demon is dead.
     * If the demon is dead, it plays the corresponding sound.
     * After 0.5 seconds, an explosion is shown. When this animation is finished, the interval is cleared, the demon is deleted and the function to refresh the demon's healt status bar is triggered.
     * If the character is not dead himself, the you win action is triggered.
     */
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
                        if (!world.character.isDead())
                            this.youWinAction();
                    }
                }, 500);                
            }
        }, 100);
    }

    /**
     * Plays the sound corresponding to the death of the demon as long as the "death_sound_index" value is above 0.
     */
    playSoundDemonDead() {
        if (this.death_sound_index > 0) {
            this.sound_demon_dead.play();
            this.death_sound_index--;
        }
    }

    /**
     * Cycles through the explosion animation frames.
     * Changes the demons values y, x, height, width and offset regarding to the dimensions of the explosion.
     */
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

    /**
     * Cycles through the enemies array to find the demon's position and deletes it.
     */
    deleteDemon() {
        for (let i = 0; i < world.character.world.level.enemies.length; i++) {
            if (world.character.world.level.enemies[i].demon == true)
                world.character.world.level.enemies.splice(i, 1);
        }
    }

    /**
     * Checks if the demon is not dead and cycles through either attack or idle animation frames.
     * If the character is near the demon, it cycles through the attack animation frames and plays the attack sound, otherwise it cycles through the idle animation frames.
     */
    demonIdle() {
        if (!this.isDead() && !this.demon_hurt) {
            if (this.x - world.character.x + world.character.width - world.character.offset.right < 600) {
                this.changePictures(this.PATHS_ATTACK);
                this.sound_demon_attack.play();
            } else
                this.changePictures(this.PATHS_IDLE);
        }
    }

    /**
     * Checks if the demon is not dead and if the character is so nearby that the demon is seen on the canvas.
     * Triggers the "moveLeft" function to move the demon towards the character.
     * Triggers the function to change the demon status bar position depending on the demon's position.
     */
    demonMove() {
        if (!this.isDead() && this.x - world.character.x + world.character.width - world.character.offset.right < 1000) {
            this.moveLeft();
            this.changeDemonStatusBarPosition();
        }
    }

    /**
     * Triggers the functions to start the right sound and animation if the demon is hurt for the first, second and third time.
     */
    demonHurt() {
        this.demonHurt1();
        this.demonHurt2();
        this.demonHurt3();
    }

    /**
     * Sets an interval to constantly check if the demon is not dead and if its energy value is 75.
     * Sets the variable "demon_hurt" to "true".
     * Plays the demon hurt sound.
     * Cycles through hurt animation frames once and then clears the interval to stop the animation.
     * Triggers a function to reset the variables "demon_hurt", "paths_index" and "hurt_sound_index" to their default values.  .
     * Triggers the "demonShrink" function to reduce the size of the demon.
     */
    demonHurt1() {
        const intervalIdDemonHurt1 = setInterval(() => {
            if (!this.isDead() && this.energy == 75) {
                this.demon_hurt = true;
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt1);
                    this.resetVariables();
                    this.demonShrink();
                }
            }
        }, this.interval_hurt);
    }

    /**
     * Sets an interval to constantly check if the demon is not dead and if its energy value is 50.
     * Sets the variable "demon_hurt" to "true".
     * Plays the demon hurt sound.
     * Cycles through hurt animation frames once and then clears the interval to stop the animation.
     * Triggers a function to reset the variables "demon_hurt", "paths_index" and "hurt_sound_index" to their default values.
     * Triggers the "demonShrink" function to reduce the size of the demon.
     */
    demonHurt2() {
        const intervalIdDemonHurt2 = setInterval(() => {
            if (!this.isDead() && this.energy == 50) {
                this.demon_hurt = true;
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt2);
                    this.resetVariables();
                    this.demonShrink();
                }
            }
        }, this.interval_hurt);
    }

    /**
     * Sets an interval to constantly check if the demon is not dead and if its energy value is 25.
     * Sets the variable "demon_hurt" to "true".
     * Plays the demon hurt sound.
     * Cycles through hurt animation frames once and then clears the interval to stop the animation.
     * Triggers a function to reset the variables "demon_hurt", "paths_index" and "hurt_sound_index" to their default values.
     * Triggers the "demonShrink" function to reduce the size of the demon.
     */
    demonHurt3() {
        const intervalIdDemonHurt3 = setInterval(() => {
            if (!this.isDead() && this.energy == 25) {
                this.demon_hurt = true;
                this.playSoundDemonHurt();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdDemonHurt3);
                    this.resetVariables();
                    this.demonShrink();
                }
            }
        }, this.interval_hurt);
    }

    /**
     * Resets the variables "demon_hurt", "paths_index" and "hurt_sound_index" to their default values.
     */
    resetVariables() {
        this.demon_hurt = false;
        this.paths_index = 0;
        this.hurt_sound_index = 1;
    }

    /**
     * Reduces the size of the demon by reducing his height and width values (multiplier 0.85).
     * Increases its y value to not make it jump upwards too much.
     * Reduces its offset values to continue precise collision detection (multiplier 0.85).
     */
    demonShrink() {
        this.y = this.y + 30;
        this.height = this.height * 0.85;
        this.width = this.width * 0.85;
        this.offset = {
            top: this.offset.top * 0.85,
            bottom: this.offset.bottom * 0.85,
            left: this.offset.left * 0.85,
            right: this.offset.right * 0.85
        };
    }

    /**
     * Plays the sound corresponding to the situation that the demon is hurt once.
     */
    playSoundDemonHurt() {
        if (this.hurt_sound_index > 0) {
            this.sound_demon_hit.play();
            this.hurt_sound_index--;
        }
    }

    /**
     * Changes the demon's status bar position depending on the position of the demon.
     */
    changeDemonStatusBarPosition() {
        world.demonStatusBar.x = this.x + 200;
    }
    
}