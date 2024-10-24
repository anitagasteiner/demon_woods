/**
 * Represents the game world, managing all elements such as the character, level, and interactive objects.
 */
class World {

    character = new Character();
    level = level1;
    canvas;
    ctx; // Context
    keyboard;
    camera_x = -100;
    statusBars = newStatusBars;
    buttons = newButtons;
    throwableObjects = [];
    intervalIds = [];
    wraiths_defeated = 0;
    apples_collected = 0;
    sound_pickup_apple = new Audio('audio/apple-pickup.flac');
    sound_pickup_crystal = new Audio('audio/crystal_pickup.wav');
    sound_wraith_hit = new Audio('audio/wraith_hit.mp3');
    sound_background = new Audio('audio/morningbirds.wav');

    /**
     * Creates a new World instance, initializing canvas, keyboard controls, and various game elements.
     * @param {HTMLCanvasElement} canvas - the canvas element where the game will be drawn
     * @param {object} keyboard - the keyboard input handler for controlling the character
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Wir können nicht direkt in unser Canvas malen, sondern brauchen dafür "Context"!
        this.canvas = canvas;
        this.keyboard = keyboard;        
        this.draw();
        this.setWorld();
        // this.run();
        this.setStoppableIntervals();
    }

    /**
     * Draws the entire game world onto the canvas, including background objects, the character, enemies, and various interactive elements.
     * Handles camera movement by translating the canvas context and ensures that objects are rendered in the correct order.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Dadurch wird das Bild gelöscht, bevor ein neues gezeichnet wird.

        this.ctx.translate(this.camera_x, 0); // Bildausschnitt wird nach links verschoben.
        this.addObjectsToMap(this.level.bgObjects);
        this.addObjectsToMap(this.level.grounds);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Bildausschnitt wird wieder nach rechts verschoben. -> SPACE FOR FIXED OBJECTS:
        this.addObjectsToMap(this.statusBars);
        this.addObjectsToMap(this.buttons);
        this.ctx.translate(this.camera_x, 0); // Bildausschnitt wird nach links verschoben.

        this.addObjectsToMap(this.level.crystals);
        this.addObjectsToMap(this.level.apples);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.plants);        

        this.ctx.translate(-this.camera_x, 0); // Bildausschnitt wird wieder nach rechts verschoben.

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        }); // -> In dieser Methode wird die "draw"-Methode so oft aufgerufen, wie es die Grafikkarte hergibt. Die Funktion in "requestAnimationFrame" wird ausgeführt, sobald das darüber alles fertig gezeichnet wurde, also asynchron, ein wenig später. Das Wort "this" ist innerhalb dieser Funktion nicht mehr bekannt, daher brauchen wir eine Variable (hier: "self").
    }

    /**
     * Sets the current game world reference for the character, allowing the character to interact with the world objects.
     * This establishes a link between the character and the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Sets an interval that can be stopped later by storing its ID. 
     * The provided function is repeatedly called at the specified time interval.
     * The ID is pushed to the array "intervalIds".
     * @param {function} fn - the function to be executed at each interval
     * @param {number} time - the interval time between the function executions (in milliseconds)
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(() => fn.call(this), time);
        this.intervalIds.push(id);
    }

    /**
     * Sets stoppable intervals to run the game and to check if the character is jumping on a wraith.
     */
    setStoppableIntervals() {
        this.setStoppableInterval(this.run, 200);
        this.setStoppableInterval(this.checkJumpingOn, 20);
    }

    /**
     * Initiates the main game loop by playing background sound and checking various game states (detecting collisions, handling thrown objects, checking for bonus life conditions).
     */
    run() {
        this.sound_background.play();
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkBonusLife();      
    }

    /**
     * Iterates through a list of objects and adds each object to the map by calling the "addToMap()" function. All objects in the provided array are drawn onto the canvas.
     * @param {array<object>} objects - array of objects to be added to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a movable object to the canvas, flipping its image horizontally if necessary, and then draws it on the canvas.
     * If the object was flipped, the image is restored to its original orientation after drawing.
     * [If needed to work on the game: Triggers a function to draw a rectangle around the movable object.]
     * @param {object} movableObject - object to be added to the map
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawRectangle(this.ctx);
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the given movable object's image horizontally by modifying the canvas' context. This is used when the object is facing the opposite direction.
     * @param {object} movableObject - object whose image needs to be flipped
     */
    flipImage(movableObject) {
        this.ctx.save(); // Aktuelle Einstellungen vom ctx werden gespeichert, denn später sollen die Bilder wieder gerade eingefügt werden.
        this.ctx.translate(movableObject.width, 0); // Damit das Bild nicht einen Sprung nach links macht, muss das Canvas um die Breite des "movableObject" nach rechts geschoben werden.
        this.ctx.scale(-1, 1); // Spiegelung an der y-Achse. Dadurch beginnt die x-Achse jetzt rechts, nicht mehr links.
        movableObject.x = movableObject.x * -1; // Die x-Koordinate wird umgedreht. -> Bild wird an der richtigen Stelle eingefügt.
    }

    /**
     * Restores the movable object's x-coordinate and the canvas context to their original state after an image flip. This method ensures that any subsequent objects are drawn without the horizontal flip applied.
     * @param {object} movableObject - object whose image was previously flipped; its x-coordinate is reverted back.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**
     * // TODO - hier weiter!!!
     */
    checkThrowObjects() {
        let positionX = this.character.x + 300;
        if (this.character.otherDirection == true) {
            positionX -= 100;
        }
        if (!this.character.isDead() && this.keyboard.SPACE && this.statusBars[2].percentage > 0) {
            let crystal = new ThrowableObject(positionX, this.character.y + 200, this.character.otherDirection);
            this.throwableObjects.push(crystal);
            this.statusBars[2].percentage -= 20;
            this.statusBars[2].setPercentage(this.statusBars[2].paths, this.statusBars[2].percentage);
            this.checkHitEnemy(crystal);
        }
    }

    checkHitEnemy(crystal) {
        const intervalIdHitEnemy = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (crystal.isColliding(enemy)) {
                    if (!enemy.demon) {
                        this.sound_wraith_hit.play();
                        enemy.energy = 0;
                    } else if (enemy.demon) {
                        enemy.hit();
                    }                    
                };
            });
        }, 500);
    }

    checkCollisions() {
        this.collidingEnemy();
        this.collidingApple();
        this.collidingCrystal();
    }

    collidingEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumpingOn(enemy)) {
                this.character.hit();
                this.statusBars[0].setPercentage(this.statusBars[0].paths, this.character.energy);
            };
        });
    }

    collidingApple() {
        this.level.apples.forEach((apple) => {
            if (this.character.isColliding(apple) && this.statusBars[1].percentage < 100) {
                this.statusBars[1].percentage += 20;
                this.statusBars[1].setPercentage(this.statusBars[1].paths, this.statusBars[1].percentage);
                this.sound_pickup_apple.play();
                this.countCollectedApples();                
                setTimeout(() => {
                    this.deleteApple(apple);                    
                }, 100);
            };
        });
    }

    countCollectedApples() {
        this.apples_collected += 1;
        document.getElementById('applesCollected').innerHTML = this.apples_collected;
    }

    deleteApple(apple) {
        for (let i = 0; i < this.level.apples.length; i++) {
            if (this.level.apples[i].appleIndex === apple.appleIndex) {
                this.level.apples.splice(i, 1);
            }
        }
    }

    collidingCrystal() {
        this.level.crystals.forEach((crystal) => {
            if (this.character.isColliding(crystal) && this.statusBars[2].percentage < 100) {
                this.statusBars[2].percentage += 20;
                this.statusBars[2].setPercentage(this.statusBars[2].paths, this.statusBars[2].percentage);
                this.sound_pickup_crystal.play();
                setTimeout(() => {
                    this.deleteCrystal(crystal);
                }, 100);
            };
        });
    }

    deleteCrystal(crystal) {
        for (let i = 0; i < this.level.crystals.length; i++) {
            if (this.level.crystals[i].crystalIndex === crystal.crystalIndex) {
                this.level.crystals.splice(i, 1);
            }
        }
    }

    checkJumpingOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy) && !enemy.demon) {
                this.sound_wraith_hit.play();
                for (let i = 0; i < this.level.enemies.length; i++) {
                    if (this.level.enemies[i].wraithIndex === enemy.wraithIndex) {                        
                        enemy.energy = 0;
                    }
                }
                this.character.fly();
            };
        });
    }
    
    checkBonusLife() {
        if (this.statusBars[1].percentage == 100 && this.statusBars[0].percentage < 100) {
            this.character.energy += 20;
            this.statusBars[0].setPercentage(this.statusBars[0].paths, this.character.energy);
            this.statusBars[1].percentage = 0;
            this.statusBars[1].setPercentage(this.statusBars[1].paths, this.statusBars[1].percentage);
            this.statusBars[0].height = 70;
            this.statusBars[0].width = 230;
            setTimeout(() => {
                this.statusBars[0].height = 50;
                this.statusBars[0].width = 190;
            }, 250);
        }
    }
    
}