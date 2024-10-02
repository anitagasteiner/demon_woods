class Crystal extends CollectableObject {
    
    y = 400;
    height = 65;
    width = 65;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    path = 'img/crystal/crystal.png';

    constructor() {
        super().loadImage(this.path);
    }
    
}