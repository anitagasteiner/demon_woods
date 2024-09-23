const PATHS_STATUS_HEALTH = [
    '../img/statusbars/health/0.png',
    '../img/statusbars/health/20.png',
    '../img/statusbars/health/40.png',
    '../img/statusbars/health/60.png',
    '../img/statusbars/health/80.png',
    '../img/statusbars/health/100.png'
];
const PATHS_STATUS_APPLES = [
    '../img/statusbars/apples/0.png',
    '../img/statusbars/apples/20.png',
    '../img/statusbars/apples/40.png',
    '../img/statusbars/apples/60.png',
    '../img/statusbars/apples/80.png',
    '../img/statusbars/apples/100.png'
];
const PATHS_STATUS_CRYSTALS = [
    '../img/statusbars/crystals/0.png',
    '../img/statusbars/crystals/20.png',
    '../img/statusbars/crystals/40.png',
    '../img/statusbars/crystals/60.png',
    '../img/statusbars/crystals/80.png',
    '../img/statusbars/crystals/100.png'
];
const newStatusBars = [
    new StatusBar(PATHS_STATUS_HEALTH, 10, 100),
    new StatusBar(PATHS_STATUS_APPLES, 60, 0),    
    new StatusBar(PATHS_STATUS_CRYSTALS, 105, 0)
];