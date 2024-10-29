const PATHS_STATUS_HEALTH = [
    'img/statusbars/health/0.png',
    'img/statusbars/health/20.png',
    'img/statusbars/health/40.png',
    'img/statusbars/health/60.png',
    'img/statusbars/health/80.png',
    'img/statusbars/health/100.png'
];
const PATHS_STATUS_APPLES = [
    'img/statusbars/apples/0.png',
    'img/statusbars/apples/20.png',
    'img/statusbars/apples/40.png',
    'img/statusbars/apples/60.png',
    'img/statusbars/apples/80.png',
    'img/statusbars/apples/100.png'
];
const PATHS_STATUS_CRYSTALS = [
    'img/statusbars/crystals/0.png',
    'img/statusbars/crystals/20.png',
    'img/statusbars/crystals/40.png',
    'img/statusbars/crystals/60.png',
    'img/statusbars/crystals/80.png',
    'img/statusbars/crystals/100.png'
];
const PATHS_STATUS_DEMON_HEALTH = [
    'img/statusbars/demon_health/0.png',
    'img/statusbars/demon_health/0.png',
    'img/statusbars/demon_health/25.png',
    'img/statusbars/demon_health/50.png',
    'img/statusbars/demon_health/75.png',
    'img/statusbars/demon_health/100.png'
];
let newStatusBars;
let newDemonStatusBar;

/**
 * Creates the status bars placed on the canvas.
 * Each status bar passes the parameters for its paths, its x and y values and its percentage.
 */
function initStatusBars() {
    newStatusBars = [
        new StatusBar(PATHS_STATUS_HEALTH, 15, 10, 100),
        new StatusBar(PATHS_STATUS_APPLES, 15, 60, 0),    
        new StatusBar(PATHS_STATUS_CRYSTALS, 15, 105, 60)
    ];
}

/**
 * Creates the demon health status bar placed on the canvas.
 * Passes the parameters for its paths, its x and y values and its percentage.
 */
function initDemonStatusBar() {
    newDemonStatusBar = new StatusBar(PATHS_STATUS_DEMON_HEALTH, 500, 410, 100);
}