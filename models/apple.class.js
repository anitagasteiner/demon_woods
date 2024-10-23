/**
 * Represents an apple object that can be collected in the game.
 */
class Apple extends CollectableObject {
    
    appleIndex;
    y = 200 - Math.random() * 100;
    height = 50;
    width = 50;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 5
    };
    path = 'img/apple/apple.png';


    /**
     * Creates a new Apple instance. Loads its image and assigns its index.
     * @param {number} i - index of the apple
     */
    constructor(i) {
        super().loadImage(this.path);
        this.appleIndex = i;
    }

}