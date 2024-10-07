const SOUND_ON = 'img/symbols/sound_on_orange.png';
const INFO = 'img/symbols/info_orange.png';
const RESTART = 'img/symbols/restart_orange.png';

let newButtons;

function initButtons() {
    newButtons = [
        new Button(INFO, 590, 'info'),
        new Button(SOUND_ON, 630, 'sound'),
        new Button(RESTART, 670, 'restart')
    ];
}