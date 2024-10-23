/**
 * Represents a game level, including its entities such as enemies, clouds, background objects, and collectible items.
 */

class Level {

    enemies;
    clouds;
    bgObjects;
    grounds;
    plants;
    crystals;
    apples;
    level_end_x = 2210;
    level_start_x = -670;

    /**
     * Creates a new level instance with the given entities.
     * @param {array} enemies - enemies (wraiths, demon)
     * @param {array} clouds - clouds
     * @param {array} bgObjects - background objects (sky, rocks)
     * @param {array} grounds - grounds
     * @param {array} plants - plants
     * @param {array} crystals - collectible crystals
     * @param {array} apples - collectible apples
     */
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