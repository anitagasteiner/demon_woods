class MovableObject {
    canvasHeight = 480;
    x = -150;
    y = 215;
    img;
    height = 300;
    width = 500;

    // constructor() {

    // }

    loadImage(path) {
        this.img = new Image(); // Das Objekt "Image" existiert bereits in JavaScript. -> this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        console.log('moving left');
    }
}