class World {

    character = new Character();
    level = level1;    
    canvas;
    ctx; // Abkürzung für Context
    keyboard;
    camera_x = -100;
    statusBars = newStatusBars;
    throwableObjects = [];
    apple;
    crystal;
    sound_pickup_apple = new Audio('audio/apple-pickup.flac');
    sound_pickup_crystal = new Audio('audio/crystal_pickup.wav');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Wir können nicht direkt in unser Canvas malen, sondern brauchen dafür "Context"!
        this.canvas = canvas; // Das "canvas", das in den Constructor übergeben wurde, wird hierdurch an die Variable "canvas" oben übergeben und ist somit zB auch für die Funktion "draw" unten verfügbar.
        this.keyboard = keyboard;        
        this.draw();
        this.setWorld();
        this.run();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Dadurch wird das Bild gelöscht, bevor ein neues gezeichnet wird.

        this.ctx.translate(this.camera_x, 0); // Bildausschnitt wird nach links verschoben.
        this.addObjectsToMap(this.level.bgObjects);
        this.addObjectsToMap(this.level.grounds);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Bildausschnitt wird wieder nach rechts verschoben. -> SPACE FOR FIXED OBJECTS:
        this.addObjectsToMap(this.statusBars);
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

    setWorld() { // Das Objekt "keyboard" (damit die Keyboard-Funktionen) wird durch diese Funktion an zB den Character übergeben.
        this.character.world = this; // Der "character" hat eine Variable "world", durch die nun auf die Variablen der "world" hier zugegriffen werden kann, u.a. auch auf "keyboard".
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawRectangle(this.ctx);
        if (movableObject.otherDirection) { // Wenn oben eine Änderung gemacht wurde, wird diese hier rückgängig gemacht.
            this.flipImageBack(movableObject);
        }        
    }

    flipImage(movableObject) {
        this.ctx.save(); // Aktuelle Einstellungen vom ctx werden gespeichert, denn später sollen die Bilder wieder gerade eingefügt werden.
        this.ctx.translate(movableObject.width, 0); // Damit das Bild nicht einen Sprung nach links macht, muss das Canvas um die Breite des "movableObject" nach rechts geschoben werden.
        this.ctx.scale(-1, 1); // Spiegelung an der y-Achse. Dadurch beginnt die x-Achse jetzt rechts, nicht mehr links.
        movableObject.x = movableObject.x * -1; // Die x-Koordinate wird umgedreht. -> Bild wird an der richtigen Stelle eingefügt.
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1; // Die x-Koordinate wird wieder umgedreht.
        this.ctx.restore(); // Reset zur gespeicherten Version. -> So können alle anderen Elemente, zB die Wolken, ohne Spiegeln eingefügt werden.
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfFull();
        }, 200);        
    }

    checkThrowObjects() {
        let positionX = this.character.x + 300;
        if (this.character.otherDirection == true) {
            positionX -= 100;
        }
        if (!this.character.isDead() && this.keyboard.T && this.statusBars[2].percentage > 0) {
            let crystal = new ThrowableObject(positionX, this.character.y + 200, this.character.otherDirection);
            this.throwableObjects.push(crystal);
            this.statusBars[2].percentage -= 20;
            this.statusBars[2].setPercentage(this.statusBars[2].paths, this.statusBars[2].percentage);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();                    
                this.statusBars[0].setPercentage(this.statusBars[0].paths, this.character.energy);
            };
        });
        this.level.apples.forEach((apple) => {
            if (this.character.isColliding(apple) && this.statusBars[1].percentage < 100) {
                this.statusBars[1].percentage += 20;
                this.statusBars[1].setPercentage(this.statusBars[1].paths, this.statusBars[1].percentage);
                this.sound_pickup_apple.play();
                setTimeout(() => {
                    this.apple = apple;
                    this.apple.y = -100;
                }, 100);
            };
        });
        this.level.crystals.forEach((crystal) => {
            if (this.character.isColliding(crystal) && this.statusBars[2].percentage < 100) {
                this.statusBars[2].percentage += 20;
                this.statusBars[2].setPercentage(this.statusBars[2].paths, this.statusBars[2].percentage);
                this.sound_pickup_crystal.play();
                setTimeout(() => {
                    this.crystal = crystal;
                    this.crystal.y = -100;
                }, 100);
            };
        });        
    }
    
    checkIfFull() {
        if (this.statusBars[1].percentage == 100 && this.statusBars[0].percentage < 100) {
            this.statusBars[0].percentage += 20;
            this.statusBars[1].percentage = 0;
        }
    }
    
}