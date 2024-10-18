class Button extends DrawableObject {

    height = 35;
    width = 35;
    y = 20;
    content;

    constructor(path, x, content) {
        super();
        this.loadImage(path);
        this.x = x;
        this.content = content;
    }

}