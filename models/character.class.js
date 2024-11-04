/**
 * Represents the character object.
 */
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
    sound_snoring = new Audio('audio/character_snore.wav');
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
    PATH_WAIT = 'img/character/Fairy_03__HURT_005.png';
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
    paths_die_total = this.PATHS_DIE.length;

    /**
     * Creates a new Character instance.
     * Loads its images for different actions (idle, walk, fly, die, being hurt).
     * Sets up the functions to handle the death of the character.
     * Sets up the function "setStoppableIntervals" to handle the different actions of the character that have to be stopped when the game is restarted.
     * Sets up the function to apply gravity.
     */
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

    /**
     * Handles the character's death animation and sound effects.
     * Periodically checks if the character is dead. If the character is dead, it plays the death sound, and cycles through death animation frames.
     * Once the animation is complete, the interval is cleared, and the "you lose" action is triggered.
     */
    characterDies() { 
        const intervalIdDie = setInterval(() => {
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

    /**
     * Cycles through character's hurt animation frames.
     * Cycles through corresponding wraith's attacking animation frames.
     * Resets the variable "hurt_sound_index" to its default value.
     */
    characterHurt(enemy) {
        this.changePictures(this.PATHS_HURT);
        if (enemy.demon == false) {
            enemy.changePictures(enemy.PATHS_ATTACKING);
        }
        setTimeout(() => this.hurt_sound_index = 1, 1500);
    }

    /**
     * Pauses the character's snoring sound.
     * Plays the sound corresponding to the situation that the character is hurt once.
     */
    playSoundCharacterHurt() {
        this.sound_snoring.pause();
        if (this.hurt_sound_index > 0) {
            this.sound_hurt.play();
            this.hurt_sound_index--;
        }
    }

    /**
     * Sets stoppable intervals to handle the different actions of the character (idle, walking, fly, move).
     */
    setStoppableIntervals() {
        this.setStoppableInterval(this.characterIdle, 170);
        this.setStoppableInterval(this.characterWalking, 50);
        this.setStoppableInterval(this.characterFly, 40);
        this.setStoppableInterval(this.characterMove, 15);
    }

    /**
     * Checks if the character is not dead, not waiting and not hurt, and if no key or button to move is klicked/touched, and cycles through idle animation frames.
     * If the character is waiting for action since more than 10 seconds, it shows the waiting image and plays the snoring sound.
     */
    characterIdle() {
        if (!this.isDead() && !this.world.checkCharacterWaiting() && !this.isHurt() && this.world.keyboard.UP == false && this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false) {
            this.changePictures(this.PATHS_IDLE);
        } else if (!this.isDead() && !this.isHurt() && this.world.checkCharacterWaiting()) {
            this.sound_snoring.play();
            this.loadImage(this.PATH_WAIT);
        }
    }

    /**
     * Checks if the character is not dead and if either the button/key to move right or the button/key to move left is klicked/touched and if the character is not above ground, and cycles through walk animation frames.
     */
    characterWalking() {
        if (!this.isDead() && this.world.keyboard.RIGHT && !this.isAboveGround() || !this.isDead() && this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.changePictures(this.PATHS_WALK);
        }
    }

    /**
     * Checks if the character is not dead and if the button/key to move up is klicked/touched and if the character is not above ground, and triggers the fly action. If the caracter is above ground, it cycles through fly animation frames.
     */
    characterFly() {
        if (!this.isDead() && this.world.keyboard.UP && !this.isAboveGround()) {
            this.fly();
        } else if (!this.isDead() && this.isAboveGround()) {
            this.changePictures(this.PATHS_FLY);
        }    
    }

    /**
     * Checks if the character is not dead and if either the button/key to move right or the button/key to move left is klicked/touched, and triggers either the move right or the move left action and plays the walking sound.
     * Compares the x value of the character to the x values of beginning and end of game area to define where the character has to stop.
     * Checks if the character is above ground, and pauses playing the walking sound.
     * Adjusts the camera position in the world to follow the character's x-coordinate (in opposite direction). The camera is shifted by 100 pixels to the left of the character's position.
     */
    characterMove() {
        this.sound_walking.pause();
        if (!this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.sound_walking.play();
        }
        if (!this.isDead() && this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
            this.moveLeft();                
            this.sound_walking.play();
        }
        if (this.isAboveGround()) {
            this.sound_walking.pause();
        }
        this.world.camera_x = -this.x -100;
    }

}