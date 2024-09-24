class Apple extends CollectableObject {
    
    y = 350;
    height = 50;
    width = 50;
    path = '../img/apple/apple.png';

    constructor() {
        super().loadImage(this.path);
    }

}