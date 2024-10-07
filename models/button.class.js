class Button extends DrawableObject {

    height = 30;
    width = 30;
    y = 20;
    content;

    constructor(path, x, content) {
        super();
        this.loadImage(path);
        this.x = x;
        this.content = content;
    }

}