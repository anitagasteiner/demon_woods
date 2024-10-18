const SOUND_ON = 'img/symbols/sound_on_orange.png';
const INFO = 'img/symbols/info_orange.png';
const RESTART = 'img/symbols/restart_orange.png';
const FULLSCREEN_ON = 'img/symbols/arrow_up_orange.png';

let newButtons;

function initButtons() {
    newButtons = [
        new Button(INFO, 510, 'info'),
        new Button(SOUND_ON, 560, 'sound'),
        new Button(RESTART, 610, 'restart'),
        new Button(FULLSCREEN_ON, 660, 'fullscreen')
    ];
}