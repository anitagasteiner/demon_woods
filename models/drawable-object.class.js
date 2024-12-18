/**
 * Represents a drawable object.
 */
class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 15;
    y;
    height;
    width;

    /**
     * Creates a new image object and assigns its image path.
     * @param {string} path - path of the drawable object
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads a set of images from the provided array of paths and stores them in the image cache JSON. This allows efficient access to the images later using the path as a key.
     * @param {array<string>} paths - array containing paths of the drawable objects
     */
    loadImages(paths) {
        paths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Cycles through the image paths of the drawable objects and updates the current image based on the "currentImage" index.
     * Uses the modulo operator to ensure the index loops back to the beginning when it exceeds the number of available images.
     * @param {array<string>} paths - array containing paths of the drawable objects 
     */
    changePictures(paths) {
        let i = this.currentImage % paths.length;
        let path = paths[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Draws the image of the drawable object onto the specified canvas context at the drawable object's current position.
     * @param {CanvasRenderingContext2D} ctx - 2D rendering context of the canvas where the image will be drawn
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a grey outline rectangle around the object on the specified canvas context, using adjusted dimensions based on the object's offset properties.
     * The rectangle is drawn only if the object is an instance of Character, Crystal, Apple, Wraith, or Demon.
     * @param {CanvasRenderingContext2D} ctx - 2D rendering context of the canvas where the image will be drawn
     */
    drawRectangle(ctx) {
        if (this instanceof Character || this instanceof Crystal || this instanceof Apple || this instanceof Wraith || this instanceof Demon) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "grey";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }


    /**
     * Shows and hides the container for the you win/lose banner.
     */
    handleBannerContainer() {
        document.getElementById('bannerContainer').classList.toggle('hide');
    }
    
    /**
     * Shows the you lose banner and hides the you win banner.
     */
    showBannerLose() {
        document.getElementById('bannerLose').classList.remove('hide');
        document.getElementById('bannerWin').classList.add('hide');
    }
    
    /**
     * Shows the you win banner and hides the you lose banner.
     */
    showBannerWin() {
        document.getElementById('bannerWin').classList.remove('hide');
        document.getElementById('bannerLose').classList.add('hide');
    }

    /**
     * Shows and hides the container that is shown after a finished game.
     */
    handleRestartContainer() {
        document.getElementById('restartContainer').classList.toggle('hide');
    }

}