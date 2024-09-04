class Demon extends MovableObject {

    x = 2700;
    y = 165;
    width = 130;
    interval = 1000;
    PATHS_IDLE = ['../img/demon/Character7_face4_left.png', '../img/demon/Character7_face2_left.png'];

    constructor() {
        super().loadImage('../img/demon/Character7_face4_left.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.changePicture(this.PATHS_IDLE, this.interval);
    }
    
}