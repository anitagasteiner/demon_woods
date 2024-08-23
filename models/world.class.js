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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d'); // Wir können nicht direkt in unser Canvas malen, sondern brauchen dafür "Context"!
        this.canvas = canvas; // Das "canvas", das in den Constructor übergeben wurde, wird hierdurch an die Variable "canvas" oben übergeben und ist somit zB auch für die Funktion "draw" unten verfügbar.
        this.draw();
    }    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Dadurch wird das Bild gelöscht, bevor ein neues gezeichnet wird.

        this.addObjectsToMap(this.bgObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.grounds);
        // this.addToMap(this.demon);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        this.addToMap(this.plant);

        self = this;
        requestAnimationFrame(function() {
            self.draw();
        }); // -> In dieser Methode wird die "draw"-Methode so oft aufgerufen, wie es die Grafikkarte hergibt. Die Funktion in "requestAnimationFrame" wird ausgeführt, sobald das darüber alles fertig gezeichnet wurde, also asynchron, ein wenig später. Das Wort "this" ist innerhalb dieser Funktion nicht mehr bekannt, daher brauchen wir eine Variable (hier: "self").
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }
}