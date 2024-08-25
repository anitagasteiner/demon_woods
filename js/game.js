let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben. -> "canvas"    

    console.log('My character is ', world.character);    
}

window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
});