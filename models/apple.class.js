class Apple extends CollectableObject {
    
    appleIndex;
    y = 200 - Math.random() * 100; // 200 fix -> Mindesthöhe
    height = 50;
    width = 50;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 5
    };
    path = 'img/apple/apple.png';

    constructor(i) {
        super().loadImage(this.path);
        this.appleIndex = i;
    }

}