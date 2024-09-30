class Crystal extends CollectableObject {
    
    y = 400;
    height = 65;
    width = 65;
    path = 'img/crystal/crystal.png';

    constructor() {
        super().loadImage(this.path);
    }
    
}