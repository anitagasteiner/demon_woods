class Crystal extends CollectableObject {
    
    crystalIndex;
    y = 390;
    height = 65;
    width = 65;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    path = 'img/crystal/crystal.png';

    constructor(i) {
        super().loadImage(this.path);
        this.crystalIndex = i;
    }    
    
}