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
    let code = e.code;
    if (code == 'Space') {
        keyboard.SPACE = true;
    }
    if (code == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (code == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

});