class Demon extends MovableObject {

    x = 2700;
    y = 155;
    height = 310;
    width = 130;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    interval = 1000;
    interval_move = 40;
    speed = 0.7;
    demon = true;
    sound_demon_dead = new Audio('audio/demon_dead.wav');
    sound_demon_hit = new Audio('audio/demon_hit.ogg');
    PATHS_IDLE = [
        'img/demon/Character7_face1.png',        
        'img/demon/Character7_face3.png',
        'img/demon/Character7_face4.png'
    ];
    PATHS_HURT = [
        'img/demon/Character7_face1.png',
        'img/demon/Character7_face2.png'
    ];
    PATHS_EXPLOSION = [
        'img/demon/explosion/1/Explosion_1.png',
        'img/demon/explosion/1/Explosion_2.png',
        'img/demon/explosion/1/Explosion_3.png',
        'img/demon/explosion/1/Explosion_4.png',
        'img/demon/explosion/1/Explosion_5.png',
        'img/demon/explosion/1/Explosion_6.png',
        'img/demon/explosion/2/Explosion_1_1.png',
        'img/demon/explosion/2/Explosion_1_2.png',
        'img/demon/explosion/2/Explosion_1_3.png',
        'img/demon/explosion/2/Explosion_1_4.png',
        'img/demon/explosion/2/Explosion_1_5.png',
        'img/demon/explosion/2/Explosion_1_6.png',
    ];
    paths_index = 0; // Zähler für die Bildfolge
    paths_hurt_total = this.PATHS_HURT.length;
    death_sound_index = 20;

    constructor() {
        super().loadImage(this.PATHS_IDLE[0]); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_IDLE);
        this.loadImages(this.PATHS_HURT);
        this.loadImages(this.PATHS_EXPLOSION);
        this.affect();
    }

    affect() { // TODO: animate(paths, interval) gibt es in movable-object.class.js -> hier auch nutzen?
        setInterval(() => { // dead
            if (this.isDead()) {
                if (this.death_sound_index > 0) {
                    this.sound_demon_dead.play();
                    this.death_sound_index--;
                }
                setTimeout(() => {
                    this.changePictures(this.PATHS_EXPLOSION);
                    this.y = 35;
                    this.x += 10;
                    this.height = 445;
                    this.width = 186;
                }, 800);
                setTimeout(() => {
                    this.x = 3150;
                }, 6000);
            }
        }, 100);
        setInterval(() => { // idle
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, this.interval_move);
        setInterval(() => { // idle
            if (!this.isDead()) {
                this.changePictures(this.PATHS_IDLE);
            }
        }, 500);
        const intervalIdHurt1 = setInterval(() => { // hurt first time
            if (!this.isDead() && this.energy == 75) {
                this.sound_demon_hit.play();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdHurt1);
                    this.paths_index = 0;
                    this.y = 180;
                    this.height = 285;
                    this.width = 119.5;
                    console.log('Demon hurt, energy: ', this.energy);
                }                
            }
        }, 200);
        const intervalIdHurt2 = setInterval(() => { // hurt second time
            if (!this.isDead() && this.energy == 50) {
                this.sound_demon_hit.play();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdHurt2);
                    this.paths_index = 0;
                    this.y = 205;
                    this.height = 260;
                    this.width = 109;
                    console.log('Demon hurt, energy: ', this.energy);
                }                
            }
        }, 200);
        const intervalIdHurt3 = setInterval(() => { // hurt third time
            if (!this.isDead() && this.energy == 25) {
                this.sound_demon_hit.play();
                if (this.paths_index < this.paths_hurt_total) {
                    this.loadImage(this.PATHS_HURT[this.paths_index]);
                    this.paths_index++;
                } else {
                    clearInterval(intervalIdHurt3);
                    this.paths_index = 0;
                    this.y = 230;
                    this.height = 235;
                    this.width = 98.5;
                    console.log('Demon hurt, energy: ', this.energy);
                }                
            }
        }, 200);
    }
    
}