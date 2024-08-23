class Character extends MovableObject {

    PATHS_IDLE = ['../img/character/Fairy_03__IDLE_000.png', '../img/character/Fairy_03__IDLE_001.png', '../img/character/Fairy_03__IDLE_002.png', '../img/character/Fairy_03__IDLE_003.png', '../img/character/Fairy_03__IDLE_004.png', '../img/character/Fairy_03__IDLE_005.png', '../img/character/Fairy_03__IDLE_006.png', '../img/character/Fairy_03__IDLE_007.png', '../img/character/Fairy_03__IDLE_008.png', '../img/character/Fairy_03__IDLE_009.png'];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/character/Fairy_03__IDLE_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.changePicture();
    }

    changePicture() {
        setInterval(() => {
            let i = this.currentImage % this.PATHS_IDLE.length;
            let path = this.PATHS_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 170);        
    }

    jump() {

    }
}