class Apple extends CollectableObject {
    
    y = 200 - Math.random() * 100; // 200 fix -> Mindesthöhe
    x = 200 + Math.random() * 6000;
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
        this.corrPlace();
    }

}