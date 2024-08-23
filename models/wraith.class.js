class Wraith extends MovableObject {
    x = 500 + Math.random() * 500; // -> Zufallszahl mal 500, damit sie hoch genug ist, um ausreichend px zu erhalten; 500 fix -> Startpunkt nicht weiter links
    y = 370;
    height = 100;
    width = 200;
    PATHS_WALKING = ['../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_000.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_001.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_002.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_003.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_004.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_005.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_006.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_007.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_008.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_009.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_010.png', '../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_011.png'];
    currentImage = 0;
    
    constructor() {
        super().loadImage('../img/wraith/png/Walking/Wraith_02_Moving_Forward_left_000.png'); // Funktion "loadImage" wird von der übergeordneten Klasse aufgerufen.
        this.loadImages(this.PATHS_WALKING);
        this.animate();
        this.changePicture();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2; // Von der x-Koordinate werden 5px abgezogen.
        }, 1000 / 60); // -> wird 60 mal pro Sekunde ausgeführt -> daher stocken die Wolken nicht, wenn sie sich bewegen
    }

    changePicture() {
        setInterval(() => {
            let i = this.currentImage % this.PATHS_WALKING.length; // % -> Modulo-Operator -> let i = 0 % 12 // Modulo ist der mathematische Rest. -> Wenn ich 0 durch 12 teile, ist das Ergebnis 0, Rest 0. Wenn ich 1 durch 12 teile, ist das Ergebnis 0, Rest 12. ... Wenn ich 11 durch 12 teile, ist das Ergebnis 0, Rest 11. Bei 12 ist das Ergebnis 1, Rest 0. Im nächsten Schritt hat "currentImage" den Wert 13. Das Ergebnis ist dann 1, Rest 1. -> Modulo hebt nur diesen Rest auf. Dadurch hat i jetzt den Wert 1.
            let path = this.PATHS_WALKING[i];
            this.img = this.imageCache[path]; // Wir greifen auf den Eintrag "path" in unserem Array zu.
            this.currentImage++;
        }, 100);        
    }
}