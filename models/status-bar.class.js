/**
 * Represents a status bar that shows health status of the character/collected apples/collected crystals.
 */
class StatusBar extends DrawableObject {

    height = 50;
    width = 190;
    percentage;
    paths;

    /**
     * Creates a new StatusBar instance.
     * Loads its images and assigns its paths and its x and y values.
     * Triggers the function "setPercentage()" to set the percentage to show the right image depending on this percentage.
     * @param {array<string>} paths - array of image paths representing different percentage states
     * @param {number} x - x value of the status bar
     * @param {number} y - y value of the status bar
     * @param {number} percentage - percentage of the status bar
     */
    constructor(paths, x, y, percentage) {
        super();
        this.loadImages(paths);
        this.paths = paths;
        this.x = x;
        this.y = y;
        this.setPercentage(paths, percentage);
    }

    /**
     * Sets the percentage value and shows the right image depending on it.
     * @param {array<string>} paths - array of image paths representing different percentage states
     * @param {number} percentage - percentage of the status bar
     */
    setPercentage(paths, percentage) {
        this.percentage = percentage;
        let path = paths[this.resolveImageIndex()];
        this.img = this.imageCache[path];      
    }

    /**
     * Checks the current percentage value to get the corresponding image index.
     * @returns {number} - current image index
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}