class World {
    character = new Character();

    enemies = [
        new Wraith(),
        new Wraith(),
        new Wraith()
    ];
    // demon = new Demon();
    clouds = [
        new Clouds('../img/bg/layers/clouds_1.png'),
        new Clouds('../img/bg/layers/clouds_2.png')
    ];
    bgObjects = [
        new BgObject('../img/bg/layers/sky.png', 0),
        new BgObject('../img/bg/layers/rocks.png', 0)

    ];
    grounds = [
        new BgObject('../img/bg/layers/ground_1.png', 0),
        new BgObject('../img/bg/layers/ground_2.png', 0),
        new BgObject('../img/bg/layers/ground_3.png', 0)
    ];
    plant = new Plant();
    canvas;
    ctx; // Abkürzung für Context
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Wir können nicht direkt in unser Canvas malen, sondern brauchen dafür "Context"!
        this.canvas = canvas; // Das "canvas", das in den Constructor übergeben wurde, wird hierdurch an die Variable "canvas" oben übergeben und ist somit zB auch für die Funktion "draw" unten verfügbar.
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Dadurch wird das Bild gelöscht, bevor ein neues gezeichnet wird.

        this.addObjectsToMap(this.bgObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.grounds);
        // this.addToMap(this.demon);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);        
        this.addToMap(this.plant);

        self = this;
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
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
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

}