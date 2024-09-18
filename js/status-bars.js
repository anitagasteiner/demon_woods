const PATHS_STATUS_COINS = [
    '../img/statusbars/coins/0.png',
    '../img/statusbars/coins/20.png',
    '../img/statusbars/coins/40.png',
    '../img/statusbars/coins/60.png',
    '../img/statusbars/coins/80.png',
    '../img/statusbars/coins/100.png'
];
const PATHS_STATUS_HEALTH = [
    '../img/statusbars/health/0.png',
    '../img/statusbars/health/20.png',
    '../img/statusbars/health/40.png',
    '../img/statusbars/health/60.png',
    '../img/statusbars/health/80.png',
    '../img/statusbars/health/100.png'
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
    new StatusBar(PATHS_STATUS_COINS, 5, 0),
    new StatusBar(PATHS_STATUS_HEALTH, 45, 100),
    new StatusBar(PATHS_STATUS_CRYSTALS, 85, 0)
];