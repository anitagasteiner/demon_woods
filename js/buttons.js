const INFO = 'img/symbols/info_orange.png';
const RESTART = 'img/symbols/restart_orange.png';
const FULLSCREEN_ON = 'img/symbols/arrow_up_orange.png';
let sound_on_off;
let newButtons;
let soundStatus = localStorage.getItem('soundStatus');

/**
 * Checks if the sound status is on or off and adds the corresponding image path to the variable "sound_on_off" so that the correct sound button image is shown.
 * Creates the buttons placed on the canvas. Each button passes the parameters for its path, its x value and its content information.
 */
function initButtons() {
    if (soundStatus == 'off') {
        sound_on_off = 'img/symbols/sound_off_orange.png';
    } else {
        sound_on_off = 'img/symbols/sound_on_orange.png';
    }
    newButtons = [
        new Button(INFO, 510, 'info'),
        new Button(sound_on_off, 560, 'sound'),
        new Button(RESTART, 610, 'restart'),
        new Button(FULLSCREEN_ON, 660, 'fullscreen')
    ];    
}