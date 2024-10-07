const SOUND_ON = 'img/symbols/sound_on_orange.png';
const SOUND_OFF = 'img/symbols/sound_off_orange.png';
const INFO = 'img/symbols/info_orange.png';
const RESTART = 'img/symbols/restart_orange.png';

let newButtons;

function initButtons() {
    newButtons = [
        new Button(INFO, 590), // 20
        new Button(SOUND_ON, 630), // 60
        new Button(RESTART, 670) // 100
    ];
}