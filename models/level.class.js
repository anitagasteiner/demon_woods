class Level {

    enemies;
    clouds;
    bgObjects;
    grounds;
    plants;
    crystals;
    apples;
    level_end_x = 2210;

    constructor(enemies, clouds, bgObjects, grounds, plants, crystals, apples) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bgObjects = bgObjects;
        this.grounds = grounds;
        this.plants = plants;
        this.crystals = crystals;
        this.apples = apples;
    }

}