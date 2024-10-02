class DrawableObject {

    img;
    imageCache = {}; // kein Array, sondern ein JSON -> daher geschwungene Klammern statt eckige
    currentImage = 0;
    x = 15;
    y;
    height;
    width;

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

    changePictures(paths) {
        let i = this.currentImage % paths.length; // % -> Modulo-Operator -> let i = 0 % 12 // Modulo ist der mathematische Rest. -> Wenn ich 0 durch 12 teile, ist das Ergebnis 0, Rest 0. Wenn ich 1 durch 12 teile, ist das Ergebnis 0, Rest 12. ... Wenn ich 11 durch 12 teile, ist das Ergebnis 0, Rest 11. Bei 12 ist das Ergebnis 1, Rest 0. Im nächsten Schritt hat "currentImage" den Wert 13. Das Ergebnis ist dann 1, Rest 1. -> Modulo hebt nur diesen Rest auf. Dadurch hat i jetzt den Wert 1.
        let path = paths[i];
        this.img = this.imageCache[path]; // Wir greifen auf den Eintrag "path" in unserem Array zu.
        this.currentImage++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRectangle(ctx) {
        if (this instanceof Character || this instanceof Crystal || this instanceof Apple || this instanceof Wraith || this instanceof Demon) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "grey";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

}