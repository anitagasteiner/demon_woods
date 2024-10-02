class Apple extends CollectableObject {
    
    y = 350;
    height = 50;
    width = 50;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 5
    };
    path = 'img/apple/apple.png';

    constructor() {
        super().loadImage(this.path);
    }

}