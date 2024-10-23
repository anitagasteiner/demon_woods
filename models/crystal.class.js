/**
 * Represents a crystal object that can be collected in the game.
 */
class Crystal extends CollectableObject {
    
    crystalIndex;
    y = 390;
    height = 65;
    width = 65;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    path = 'img/crystal/crystal.png';

    /**
     * Creates a new Crystal instance. Loads its image and assigns its index.
     * @param {number} i - index of the crystal
     */
    constructor(i) {
        super().loadImage(this.path);
        this.crystalIndex = i;
    }    
    
}