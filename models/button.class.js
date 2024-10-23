/**
 * Represents a button that can be clicked on/touched.
 */
class Button extends DrawableObject {

    height = 35;
    width = 35;
    y = 20;
    content;

    /**
     * Creates a new Button instance. Loads its image and assigns its x value and its content/purpose information.
     * @param {string} path - path of the button
     * @param {number} x - x value of the button
     * @param {string} content - content/purpose information of the button
     */
    constructor(path, x, content) {
        super();
        this.loadImage(path);
        this.x = x;
        this.content = content;
    }

}