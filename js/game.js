let canvas;
let keyboard = new Keyboard();
let world;

function init() {
    hideStartScreen();
    initLevel();
    initStatusBars();
    initButtons();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben: "canvas". // Das "keyboard"-Objekt wird auch an die Welt übergeben. -> Wird beides dort in den Constructor aufgenommen. 
    // console.log('My character is ', world.character);
    addCanvasEventListener();
}

function resetGame() {
    resetSounds();    
    resetIntervalsWorld(),
    resetIntervalClouds();
    resetIntervalsMovableObjects();
    resetIntervalThrowableObjects();
    resetIntervalsCharacter();
    resetIntervalsEnemies();
    world = null;
    init();
}

function resetSounds() {
    world.sound_background.muted = !world.sound_background.muted;
    world.sound_pickup_apple.muted = !world.sound_pickup_apple.muted;
    world.sound_pickup_crystal.muted = !world.sound_pickup_crystal.muted;
    world.sound_wraith_hit.muted = !world.sound_wraith_hit.muted;
    for (let i = 0; i < world.throwableObjects.length; i++) {
        world.throwableObjects[i].sound_throwing.muted = !world.throwableObjects[i].sound_throwing.muted;
    }
    world.character.sound_walking.muted = !world.character.sound_walking.muted;
    world.character.sound_hurt.muted = !world.character.sound_hurt.muted;
    world.character.sound_dying.muted = !world.character.sound_dying.muted;
    for (let i = 0; i < world.level.enemies.length; i++) {
        if (world.level.enemies[i].sound_demon_dead) {
            world.level.enemies[i].sound_demon_dead.muted = !world.level.enemies[i].sound_demon_dead.muted;
        } else if (world.level.enemies[i].sound_demon_hit) {
            world.level.enemies[i].sound_demon_hit.muted = !world.level.enemies[i].sound_demon_hit.muted;
        } else if (world.level.enemies[i].sound_disappearing) {
            world.level.enemies[i].sound_disappearing.muted = !world.level.enemies[i].sound_disappearing.muted;
        }        
    }
}

function resetIntervalsCharacter() {
    world.character.intervalIds.forEach(clearInterval);
    clearInterval(world.character.intervalIdDie);
}

function resetIntervalsEnemies() {
    for (let i = 0; i < world.level.enemies.length; i++) {
        world.level.enemies[i].intervalIds.forEach(clearInterval);
    }
    clearInterval(world.level.enemies.intervalIdDemonDead);
    clearInterval(world.level.enemies.intervalIdDemonHurt1);
    clearInterval(world.level.enemies.intervalIdDemonHurt2);
    clearInterval(world.level.enemies.intervalIdDemonHurt3);
    clearInterval(world.level.enemies.intervalIdWraithDefeated);
}

function resetIntervalClouds() {
    clearInterval(world.level.clouds.intervalIdClouds);
}

function resetIntervalsMovableObjects() {
    clearInterval(world.intervalIdAboveGround);
}

function resetIntervalThrowableObjects() {
    clearInterval(world.intervalIdThrow);
}

function resetIntervalsWorld() {
    world.intervalIds.forEach(clearInterval);
    clearInterval(world.intervalIdRun);
    clearInterval(world.intervalIdHitEnemy);
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

function closeRestartContainer() {
    document.getElementById('restartContainer').classList.add('hide');
}

window.addEventListener('keydown', (e) => { // Wenn die jeweilige Taste gedrückt wird, wird die entsprechende Variable auf "true" gesetzt.
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

window.addEventListener('keyup', (e) => { // Wenn die jeweilige Taste losgelassen wird, wird die entsprechende Variable auf "false" gesetzt.
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
                    resetGame();
                }
            }
        });
    }, false);
}