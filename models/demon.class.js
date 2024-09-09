class Demon extends MovableObject {

    x = 2700;
    y = 155;
    height = 310;
    width = 130;
    interval = 1000;
    interval_move = 40;
    speed = 0.15;
    PATHS_IDLE = [
        '../img/demon/Character7_face4.png',
        '../img/demon/Character7_face2.png'
    ];

    constructor() {
        super().loadImage(this.PATHS_IDLE[0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.animate(this.PATHS_IDLE, this.interval);
        this.move();
    }

    move() {
        setInterval(() => {
            this.moveLeft();            
        }, this.interval_move);
    }
    
}