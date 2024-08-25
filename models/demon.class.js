class Demon extends MovableObject {

    x = 550;
    y = 145;
    width = 130;

    constructor() {
        super().loadImage('../img/demon/Character7_face2_left.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
    }
    
}