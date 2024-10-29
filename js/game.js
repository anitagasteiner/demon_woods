let canvas;
let keyboard = new Keyboard();
let world;
let fullscreen = false;
let pointerOnButton = false;

/**
 * Initialises the game to start playing it.
 */
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

/**
 * Resets the game to play it again.
 */
function resetGame() {
    resetSounds();
    resetCanvasEventListener();
    resetIntervals();
    resetDisplayingCollectedItems();
    world = null;    
}


/**
 * Resets the displaying of wraiths that were defeated and apples that were collected to its default values (0).
 */
function resetDisplayingCollectedItems() {
    document.getElementById('wraithsDefeated').innerHTML = '0';
    document.getElementById('applesCollected').innerHTML = '0';
}

/**
 * Resets all intervals.
 */
function resetIntervals() {
    resetIntervalsWorld(),
    resetIntervalClouds();
    resetIntervalMovableObjects();
    resetIntervalThrowableObjects();
    resetIntervalsCharacter();
    resetIntervalsEnemies();
}

/**
 * Clears the Character's intervals.
 */
function resetIntervalsCharacter() {
    world.character.intervalIds.forEach(clearInterval);
    clearInterval(world.character.intervalIdDie);
    clearInterval(world.character.intervalIdHurt);
}

/**
 * Clears the Enemies' intervals.
 */
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

/**
 * Clears the interval of the Clouds.
 */
function resetIntervalClouds() {
    clearInterval(world.level.clouds.intervalIdClouds);
}

/**
 * Clears the interval of the Movable Objects.
 */
function resetIntervalMovableObjects() {
    clearInterval(world.intervalIdAboveGround);
}

/**
 * Clears the interval of the Throwable Objects.
 */
function resetIntervalThrowableObjects() {
    clearInterval(world.intervalIdThrow);
}

/**
 * Clears the intervals of the World.
 */
function resetIntervalsWorld() {
    world.intervalIds.forEach(clearInterval);
    clearInterval(world.intervalIdRun);
    clearInterval(world.intervalIdHitEnemy);
}

/**
 * Shows and hides the game description on the start screen.
 */
function handleDescription() {
    document.getElementById('description').classList.toggle('hide');
}

/**
 * Hides the start screen to be able to start the game.
 */
function hideStartScreen() {
    document.getElementById('startScreen').classList.add('hide');
}

/**
 * Shows the start screen if user doesn't want to play new game.
 */
function showStartScreen() {
    document.getElementById('startScreen').classList.remove('hide');
}

/**
 * Shows and hides the game description during the game.
 */
function handleInfoboxContainer() {
    document.getElementById('infoboxContainer').classList.toggle('hide');
}

/**
 * Hides the container that is shown after a finished game.
 */
function hideRestartContainer() {
    document.getElementById('restartContainer').classList.add('hide');
}

/**
 * Shows and hides the impressum.
 */
function handleImpressum() {
    document.getElementById('impressum').classList.toggle('hide');
}

/**
 * Adds Event Listener to register if user presses the keys space, up, left or right.
 */
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

/**
 * Adds Event Listener to register if user stops pressing the keys space, up, left or right.
 */
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

/**
 * Checks if the user presses or stops pressing the buttons on the mobile version.
 */
function mobileButtonsPressEvents() {
    mobileButtonsPressed();
    mobileButtonsNotPressed();
}

/**
 * Adds Event Listeners to register if the user presses the buttons on the mobile version.
 */
function mobileButtonsPressed() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
}

/**
 * Adds Event Listeners to register if the user stops pressing the buttons on the mobile version.
 */
function mobileButtonsNotPressed() {
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}

/**
 * Adds Event Listeners to register if user touches or clicks on canvas.
 */
function addCanvasEventListener() {
    canvas.addEventListener('click', handleCanvasClick, false);
    canvas.addEventListener('touchstart', handleCanvasTouch, { passive: false });
}

/**
 * Removes Event Listeners to register if user touches or clicks on canvas.
 */
function resetCanvasEventListener() {
    canvas.removeEventListener('click', handleCanvasClick, false);
    canvas.removeEventListener('touchstart', handleCanvasTouch, false);
    addCanvasEventListener();
}

/**
 * Handles a click event on the canvas element.
 * Extracts the x and y coordinates from the event and passes them to the handleCanvasInteraction function.
 *
 * @param {MouseEvent} event - the click event object containing details about the user's interaction with the canvas, including coordinates
 */
function handleCanvasClick(event) {
    handleCanvasInteraction(event.pageX, event.pageY);
}

/**
 * Handles a touch event on the canvas element.
 * Prevents the default scroll behavior and extracts the x and y coordinates from the first touch point.
 * Passes the touch coordinates to the handleCanvasInteraction function.
 * 
 * @param {TouchEvent} event - the touch event object containing details about the user's interaction, including the touch points
 */
function handleCanvasTouch(event) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    handleCanvasInteraction(touch.pageX, touch.pageY);
}

/**
 * Processes interactions with canvas elements based on the x and y coordinates provided.
 * Determines which button (if any) was clicked or touched by checking the coordinates against each button's position.
 * Executes the corresponding action based on the button's content (info, sound, restart, fullscreen).
 * @param {number} pageX - the x-coordinate of the interaction on the canvas (from the page)
 * @param {number} pageY - the y-coordinate of the interaction on the canvas (from the page)
 */
function handleCanvasInteraction(pageX, pageY) {
    let {x, y} = calculateCanvasXY(pageX, pageY);
    world.buttons.forEach((button) => {
        if (y > button.y && y < button.y + button.height && x > button.x && x < button.x + button.width) {
            if (button.content == 'info') {
                handleInfoboxContainer();
            } else if (button.content == 'sound') {
                handleSounds(button);
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

/**
 * Converts page coordinates to canvas coordinates, adjusting for the current size and position of the canvas element.
 * This ensures that interactions on different devices or screen sizes are properly mapped to the canvas' internal coordinate system.
 * @param {number} pageX - the x-coordinate from the page
 * @param {number} pageY - the y-coordinate from the page
 * @returns {object} - an object containing the calculated x and y coordinates relative to the canvas
 */
function calculateCanvasXY(pageX, pageY) {
    let canvas_left = canvas.offsetLeft + canvas.clientLeft;
    let canvas_top = canvas.offsetTop + canvas.clientTop;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    let x = (pageX - canvas_left) * (canvas.width / canvasWidth);
    let y = (pageY - canvas_top) * (canvas.height / canvasHeight);
    return {
        x: x,
        y: y
    };
}

/**
 * Adds Event Listener to register the moving of the mouse.
 * Changes the cursor style based on whether the mouse is hovering over a button on the canvas.
 * When the mouse moves over a button, the cursor changes to a pointer, otherwise it resets to the default cursor.
 */
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

/**
 * Activates fullscreen mode for the specified container and updates the button image to indicate the fullscreen state.
 * It uses browser-specific methods to request fullscreen for compatibility across different browsers.
 * @param {object} button - the button object used to trigger fullscreen mode
 */
function openFullscreen(button) {
    let fullscreenContainer = document.getElementById('fullscreen');
    if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen();
    } else if (fullscreenContainer.webkitRequestFullscreen) { // Safari
        fullscreenContainer.webkitRequestFullscreen();
    } else if (fullscreenContainer.msRequestFullscreen) { // IE11
        fullscreenContainer.msRequestFullscreen();
    }
    button.loadImage('img/symbols/arrow_down_orange.png');
    fullscreen = true;
}

/**
 * Exits fullscreen mode and updates the button image to reflect the change.
 * It uses browser-specific methods to exit fullscreen for compatibility across different browsers.
 * @param {object} button - the button object used to trigger the exit from fullscreen mode
 */
function closeFullscreen(button) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE11
      document.msExitFullscreen();
    }
    button.loadImage('img/symbols/arrow_up_orange.png');
    fullscreen = false;
}

/**
 * Detects if the user is on a mobile device and displays the mobile bar if true.
 * Uses the user agent string to identify mobile devices based on common keywords.
 */
function handleMobileBar() {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    if (isMobileDevice) { 
        document.getElementById('mobile-bar-container-left').classList.remove('hide');
        document.getElementById('mobile-bar-container-right').classList.remove('hide');
    }      
}