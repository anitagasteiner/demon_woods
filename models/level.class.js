class Level {

    enemies;
    clouds;
    bgObjects;
    grounds;
    plant;
    level_end_x = 2059;

    constructor(enemies, clouds, bgObjects, grounds, plant) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.grounds = grounds;
        this.plant = plant;
    }

}