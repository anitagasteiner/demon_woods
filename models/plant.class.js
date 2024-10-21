class Plant extends MovableObject {
    
    y = -20;
    x = -400 + Math.random() * 3000;
    width = 750;

    constructor() {
        super().loadImage('img/bg/layers/plant.png');
    }
    
}