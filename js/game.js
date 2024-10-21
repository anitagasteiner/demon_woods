let canvas;
let keyboard = new Keyboard();
let world;
let fullscreen = false;
let pointerOnButton = false;

function init() {
    hideStartScreen();
    initLevel();
    initStatusBars();
    initButtons();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addCanvasEventListener();
    mobileButtonsPressEvents();
    cursorPointing();
}

function resetGame() {
    resetSounds();
    resetCanvasEventListener();
    resetIntervals();
    world = null;
}

function resetSound(sound) {
    sound.muted = true;
}

function resetSounds() {
    resetSound(world.sound_background);
    resetSound(world.sound_pickup_apple);
    resetSound(world.sound_pickup_crystal);
    resetSoundsCharacter();
    resetSoundsThrowableObjects();    
    resetSoundsEnemies();
}

function resetSoundsCharacter() {
    resetSound(world.character.sound_walking);
    resetSound(world.character.sound_hurt);
    resetSound(world.character.sound_dying);
}

function resetSoundsThrowableObjects() {
    for (let i = 0; i < world.throwableObjects.length; i++) {
        resetSound(world.throwableObjects[i].sound_throwing);
    }
}

function resetSoundsEnemies() {
    resetSound(world.sound_wraith_hit);
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
    resetIntervalMovableObjects();
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

function resetIntervalMovableObjects() {
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

function showStartScreen() {
    document.getElementById('startScreen').classList.remove('hide');
}

function handleInfoboxContainer() {
    document.getElementById('infoboxContainer').classList.toggle('hide');
}

function hideRestartContainer() {
    document.getElementById('restartContainer').classList.add('hide');
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
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

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
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
});

function mobileButtonsPressEvents() { // TODO zu lang?
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
        keyboard.SPACE = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
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
    canvas.addEventListener('touchstart', handleCanvasTouch, { passive: false }); //NEU
}

function resetCanvasEventListener() {
    canvas.removeEventListener('click', handleCanvasClick, false);
    canvas.removeEventListener('touchstart', handleCanvasTouch, false); //NEU
    addCanvasEventListener();
}

function handleCanvasClick(event) {
    handleCanvasInteraction(event.pageX, event.pageY);
}

function handleCanvasTouch(event) {
    event.preventDefault(); // Verhindert, dass die Seite scrollt, wenn der Benutzer den Bildschirm berührt
    const touch = event.changedTouches[0];
    handleCanvasInteraction(touch.pageX, touch.pageY);
}

function handleCanvasInteraction(pageX, pageY) {
    let {x, y} = calculateCanvasXY(pageX, pageY);
    world.buttons.forEach((button) => {
        if (y > button.y && y < button.y + button.height && x > button.x && x < button.x + button.width) {
            if (button.content == 'info') {
                handleInfoboxContainer();
            } else if (button.content == 'sound') {
                handleBackgroundSound(button);
            } else if (button.content == 'restart') {
                resetGame();
                init();
            } else if (button.content == 'fullscreen' && !fullscreen) {
                openFullscreen(button);
            } else if (button.content == 'fullscreen' && fullscreen) {
                closeFullscreen(button);
            }
        }
    });
}

function calculateCanvasXY(pageX, pageY) {
    // Ursprüngliche Größe des Canvas:
    let canvas_left = canvas.offsetLeft + canvas.clientLeft;
    let canvas_top = canvas.offsetTop + canvas.clientTop;
    // Aktuelle Größe des Canvas:
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    // Relative x und y basierend auf der aktuellen Größe des Canvas (je nach benutztem Gerät):
    let x = (pageX - canvas_left) * (canvas.width / canvasWidth);
    let y = (pageY - canvas_top) * (canvas.height / canvasHeight);
    return {
        x: x,
        y: y
    };
}

function handleBackgroundSound(button) {
    world.sound_background.muted = !world.sound_background.muted;
    if (world.sound_background.muted) {
        button.loadImage('img/symbols/sound_off_orange.png');
    } else {
        button.loadImage('img/symbols/sound_on_orange.png');
    }
}

function cursorPointing() {
    canvas.addEventListener('mousemove', function (event) {
        let {x, y} = calculateCanvasXY(event.pageX, event.pageY);
        let pointerOnButton = false;
        world.buttons.forEach((button) => {
            if (y > button.y && y < button.y + button.height && x > button.x && x < button.x + button.width) {
                pointerOnButton = true;
            }
        });
        if (pointerOnButton) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });    
}

function openFullscreen(button) {
    let fullscreenContainer = document.getElementById('fullscreen');
    if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen();
    } else if (fullscreenContainer.webkitRequestFullscreen) { /* Safari */
        fullscreenContainer.webkitRequestFullscreen();
    } else if (fullscreenContainer.msRequestFullscreen) { /* IE11 */
        fullscreenContainer.msRequestFullscreen();
    }
    button.loadImage('img/symbols/arrow_down_orange.png');
    fullscreen = true;
}

function closeFullscreen(button) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    button.loadImage('img/symbols/arrow_up_orange.png');
    fullscreen = false;
  }

function handleMobileBar() {
    let details = navigator.userAgent; // Infos zum benutzten Gerät
    let regexp = /android|iphone|kindle|ipad/i; // Keywords
    let isMobileDevice = regexp.test(details); // Überprüfung, ob Keywords in Variable "details" vorhanden
    if (isMobileDevice) { 
        document.getElementById('mobile-bar-container-left').classList.remove('hide');
        document.getElementById('mobile-bar-container-right').classList.remove('hide');
    }      
}