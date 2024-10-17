let canvas;
let keyboard = new Keyboard();
let world;
let fullscreen = false;

function init() {
    hideStartScreen();
    initLevel();
    initStatusBars();
    initButtons();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben: "canvas". // Das "keyboard"-Objekt wird auch an die Welt übergeben. -> Wird beides dort in den Constructor aufgenommen. 
    // console.log('My character is ', world.character);
    addCanvasEventListener();
    mobileButtonsPressEvents();
}

function resetGame() {
    resetSounds();
    resetCanvasEventListener();
    resetIntervals();
    world = null;
    init();
}

function resetSound(sound) {
    sound.muted = !sound.muted;
}

function resetSounds() {
    resetSound(world.sound_background);
    resetSound(world.sound_pickup_apple);
    resetSound(world.sound_pickup_crystal);
    resetSound(world.sound_wraith_hit);
    resetSound(world.character.sound_walking);
    resetSound(world.character.sound_hurt);
    resetSound(world.character.sound_dying);
    for (let i = 0; i < world.throwableObjects.length; i++) {
        resetSound(world.throwableObjects[i].sound_throwing);
    }
    for (let i = 0; i < world.level.enemies.length; i++) {
        if (world.level.enemies[i].sound_demon_dead) {
            resetSound(world.level.enemies[i].sound_demon_dead);
        } else if (world.level.enemies[i].sound_demon_hit) {
            resetSound(world.level.enemies[i].sound_demon_hit);
        } else if (world.level.enemies[i].sound_disappearing) {
            resetSound(world.level.enemies[i].sound_disappearing);
        }        
    }
}

function resetIntervals() {
    resetIntervalsWorld(),
    resetIntervalClouds();
    resetIntervalsMovableObjects();
    resetIntervalThrowableObjects();
    resetIntervalsCharacter();
    resetIntervalsEnemies();
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

function mobileButtonsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.T = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.T = false;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}

function addCanvasEventListener() {
    canvas.addEventListener('click', handleCanvasClick, false);
}

function resetCanvasEventListener() {
    canvas.removeEventListener('click', handleCanvasClick, false);
    addCanvasEventListener();
}

function handleCanvasClick(event) {
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
            } else if (button.content == 'fullscreen' && !fullscreen) {
                handleFullscreen();
                button.loadImage('img/symbols/arrow_down_orange.png');
                fullscreen = true;
            } else if (button.content == 'fullscreen' && fullscreen) {
                closeFullscreen();
                button.loadImage('img/symbols/arrow_up_orange.png');
                fullscreen = false;                
            }
        }
    });
}

function handleFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

function openFullscreen(fullscreen) {
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) { /* Safari */
        fullscreen.webkitRequestFullscreen();
    } else if (fullscreen.msRequestFullscreen) { /* IE11 */
        fullscreen.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }