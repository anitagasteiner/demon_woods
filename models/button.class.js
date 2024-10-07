class Button extends DrawableObject {

    height = 30;
    width = 30;
    y = 20;

    constructor(path, x) {
        super();
        this.loadImage(path);
        this.x = x;
    }

}