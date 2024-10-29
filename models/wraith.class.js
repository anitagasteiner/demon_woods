/**
 * Represents a wraith object.
 */
class Wraith extends MovableObject {

    wraithIndex;
    x = 430 + Math.random() * 1000;
    y = Math.floor(Math.random() * (380 - 330)) + 330;
    height = 100;
    width = 200;
    offset = {
        top: 10,
        bottom: 35,
        left: 65,
        right: 60
    };
    speed = 0.15 + Math.random() * 1.5;
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
    PATHS_ATTACKING = [
        'img/wraith/png/Attacking/Wraith_02_Attack_001.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_002.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_003.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_004.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_005.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_006.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_007.png',
        'img/wraith/png/Attacking/Wraith_02_Attack_008.png'
    ];
    paths_defeated_total = this.PATHS_DYING.length;
    
    /**
     * Creates a new Wraith instance.
     * Loads its images for different actions (moving forward, attacking, dying).
     * Sets up the function to handle the death of the defeated wraith.
     * Sets up the function "setStoppableIntervals" to handle the movement and animation of the wraith that have to be stopped when the game is restarted.
     * Stores the index value to the variable "wraithIndex".
     * @param {number} i - index of the current wraith
     */
    constructor(i) {
        super().loadImage(this.PATHS_MOVING_FORWARD[0]);
        this.loadImages(this.PATHS_MOVING_FORWARD);
        this.loadImages(this.PATHS_ATTACKING);
        this.loadImages(this.PATHS_DYING);
        this.wraithDefeated();
        this.setStoppableIntervals();
        this.wraithIndex = i;
    }

    /**
     * Sets an interval to constantly check if the wraith is dead.
     * Loops throught the image paths for the dying wraith once and then clears the interval and displays the final image.
     * Triggers the "countDefeatedWraiths" function to add 1 to the number of defeated wraiths.
     * Sets a timeout to play the sound corresponding to the disappearing wraith and triggers the "deleteWraith" function to delete the defeated wraith.
     */
    wraithDefeated() {
        const intervalIdWraithDefeated = setInterval(() => {
            if (this.isDead()) {
                if (this.paths_index < this.paths_defeated_total) {
                    this.loadImage(this.PATHS_DYING[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdWraithDefeated);
                    this.loadImage(this.PATHS_DYING[this.paths_defeated_total - 1]);
                    this.countDefeatedWraiths();
                    setTimeout(() => {
                        this.sound_disappearing.play();                        
                        this.deleteWraith();
                    }, 500);
                }
            }            
        }, 80);
    }

    /**
     * Increases the amout of the defeated wraiths stored in the "wraiths_defeated" variable by adding 1.
     * Refreshes the HTML text to display the sum of defeated wraiths to the user as soon as the game will be finished.
     */
    countDefeatedWraiths() {
        world.wraiths_defeated += 1;
        document.getElementById('wraithsDefeated').innerHTML = world.wraiths_defeated;
    }

    /**
     * Deletes the defeated wraith from the enemies array.
     */
    deleteWraith() {
        for (let i = 0; i < world.level.enemies.length; i++) {
            if (world.level.enemies[i].wraithIndex === this.wraithIndex) {
                world.level.enemies.splice(i, 1);
            }
        }
    }

    /**
     * Sets stoppable intervals to move and to animate the wraith.
     */
    setStoppableIntervals() {
        this.setStoppableInterval(this.wraithMoving, 100);
        this.setStoppableInterval(this.wraithMove, 30);
    }

    /**
     * Checks if the wraith is not dead and cycles through moving forward animation frames.
     */
    wraithMoving() {
        if (!this.isDead()) {
            this.changePictures(this.PATHS_MOVING_FORWARD);
        }
    }

    /**
     * Checks if the wraith is not dead and triggers the "moveLeft" function.
     */
    wraithMove() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

}