class Button extends DrawableObject {

    height = 40;
    width = 40;
    y = 20;
    content;

    constructor(path, x, content) {
        super();
        this.loadImage(path);
        this.x = x;
        this.content = content;
    }

}