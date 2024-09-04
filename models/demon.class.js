class Demon extends MovableObject {

    x = 2700;
    y = 155;
    height = 310;
    width = 130;
    interval = 1000;
    speed = 0.15;
    PATHS_IDLE = ['../img/demon/Character7_face4_left.png', '../img/demon/Character7_face2_left.png'];

    constructor() {
        super().loadImage(this.PATHS_IDLE[0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.animate(this.PATHS_IDLE, this.interval);
        this.moveLeft();
    }
    
}