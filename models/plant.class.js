/**
 * Represents a plant object.
 */
class Plant extends MovableObject {
    
    y = -20;
    x = -400 + Math.random() * 3000;
    width = 750;

    /**
     * Creates a new Plant instance and loads its image.
     */
    constructor() {
        super().loadImage('img/bg/layers/plant.png');
    }
    
}