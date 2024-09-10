class Level {

    enemies;
    clouds;
    bgObjects;
    grounds;
    plants;
    level_end_x = 2210;

    constructor(enemies, clouds, bgObjects, grounds, plants) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.grounds = grounds;
        this.plants = plants;
    }

}