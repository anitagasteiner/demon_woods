class Plant extends MovableObject {
    x = 250;
    y = -25;
    height = 500;
    width = 750;

    constructor() {
        super().loadImage('../img/bg/layers/plant.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
    }
}