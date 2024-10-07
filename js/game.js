let canvas;
let keyboard = new Keyboard();
let world;

function init() {    
    initLevel();
    initStatusBars();
    initButtons();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben: "canvas". // Das "keyboard"-Objekt wird auch an die Welt übergeben. -> Wird beides dort in den Constructor aufgenommen. 
    // console.log('My character is ', world.character);
    addCanvasEventListener();
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

function handleInfoboxContainer() {
    document.getElementById('infoboxContainer').classList.toggle('hide');
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

function addCanvasEventListener() {
    canvas.addEventListener('click', function(event) {
        let canvas_left = canvas.offsetLeft + canvas.clientLeft;
        let canvas_top = canvas.offsetTop + canvas.clientTop;
        let x = event.pageX - canvas_left;
        let y = event.pageY - canvas_top;
        world.buttons.forEach((button) => {
            if (y > button.y && y < button.y + button.height && x > button.x && x < button.x + button.width) {
                if (button.content == 'info') {
                    handleInfoboxContainer();
                } else if (button.content == 'sound') {                
                    world.sound_background.muted = !world.sound_background.muted;
                    if (world.sound_background.muted) {
                        button.loadImage('img/symbols/sound_off_orange.png');
                    } else if (!world.sound_background.muted) {
                        button.loadImage('img/symbols/sound_on_orange.png');
                    }                    
                } else if (button.content == 'restart') {
                    startNewGame();
                }
            }
        });
    }, false);
}