class MovableObject {
    canvasHeight = 480;
    x = -150;
    y = 215;
    img;
    height = 300;
    width = 500;
    imageCache = {}; // kein Array, sondern ein JSON -> daher geschwungene Klammern statt eckige

    // constructor() {

    // }

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

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        console.log('moving left');
    }
}