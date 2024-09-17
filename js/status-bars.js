const PATHS_STATUS_COINS = [
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
];
const PATHS_STATUS_HEALTH = [
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
];
const PATHS_STATUS_BOTTLES = [
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
];
const newStatusBars = [
    new StatusBar(PATHS_STATUS_COINS, 5, 0),
    new StatusBar(PATHS_STATUS_HEALTH, 45, 100),
    new StatusBar(PATHS_STATUS_BOTTLES, 85, 0)
];