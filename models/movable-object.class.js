class MovableObject {

    canvasHeight = 480;
    x = -150;
    y = 215;
    img;
    height;
    width;
    imageCache = {}; // kein Array, sondern ein JSON -> daher geschwungene Klammern statt eckige
    currentImage = 0;
    otherDirection = false;
    speedY = 0; // Geschwindigkeit auf der y-Achse
    acceleration = 2.5; // Beschleunigung

    loadImage(path) {
        this.img = new Image(); // Das Objekt "Image" existiert bereits in JavaScript. -> this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path; // Das Bild wird in das Image-Objekt hineingeladen.
            this.imageCache[path] = img; // Wir können "path" als Schlüssel benutzen, weil "imageCache" ein JSON ist. -> An der Stelle [path] wird "path" eingefügt. Später können wir mit diesem Schlüssel das Bild wieder herausladen.
        });
    }

    moveLeft() {
        this.x -= this.speed;  // Von der x-Koordinate werden soviel px abgezogen, wie in der Variable "speed" angegeben.
        this.otherDirection = true;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    animate(paths, interval) {
        setInterval(() => {
            this.changePictures(paths);            
        }, interval);
    }

    changePictures(paths) {
        let i = this.currentImage % paths.length; // % -> Modulo-Operator -> let i = 0 % 12 // Modulo ist der mathematische Rest. -> Wenn ich 0 durch 12 teile, ist das Ergebnis 0, Rest 0. Wenn ich 1 durch 12 teile, ist das Ergebnis 0, Rest 12. ... Wenn ich 11 durch 12 teile, ist das Ergebnis 0, Rest 11. Bei 12 ist das Ergebnis 1, Rest 0. Im nächsten Schritt hat "currentImage" den Wert 13. Das Ergebnis ist dann 1, Rest 1. -> Modulo hebt nur diesen Rest auf. Dadurch hat i jetzt den Wert 1.
        let path = paths[i];
        this.img = this.imageCache[path]; // Wir greifen auf den Eintrag "path" in unserem Array zu.
        this.currentImage++;
    }

    fly() {
        this.speedY = 30;        
    }

    applyGravity() { // Die y-Achse wird regelmäßig verringert.
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; // negative Geschwindigkeit, damit das Objekt nach unten fällt
            }
            if (this.y > 215) { // Damit Objekt nicht weiter unten landet als es ursprünglich war.
                this.y = 215;
            }
        }, 1000 / 25); // 25-mal pro Sekunde
    }

    isAboveGround() { // returnt, ob das Objekt in der Luft ist
        return this.y < 215;
    }

}