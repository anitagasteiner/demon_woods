let canvas;
let keyboard = new Keyboard();
let world;

function init() {    
    initLevel();
    initStatusBars();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben: "canvas". // Das "keyboard"-Objekt wird auch an die Welt übergeben. -> Wird beides dort in den Constructor aufgenommen. 
    // console.log('My character is ', world.character);
}

function startNewGame() {
    hideStartScreen();
    init();
    resetVariables();
}

function resetVariables() {
    console.log(world);
    world.character.energy = 100;
    world.character.lastHit = 0;
}

function handleDescription() {
    document.getElementById('description').classList.toggle('hide');
}

function hideStartScreen() {
    document.getElementById('startScreen').classList.add('hide');
}

window.addEventListener("keydown", (e) => { // Wenn die jeweilige Taste gedrückt wird, wird die entsprechende Variable auf "true" gesetzt.
    if (e.keyCode == 32) { // TODO DOWN und SPACE werden nicht verwendet -> entfernen!!!
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
    if (e.keyCode == 84) {
        keyboard.T = true;
    }
});

window.addEventListener("keyup", (e) => { // Wenn die jeweilige Taste losgelassen wird, wird die entsprechende Variable auf "false" gesetzt.
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 84) {
        keyboard.T = false;
    }
});