/**
 * Resets a sound.
 * @param {object} sound - audio file to be resetted
 */
function resetSound(sound) {
    sound.muted = true;
}

/**
 * Resets all sounds.
 */
function resetSounds() {
    resetSound(world.sound_background);
    resetSound(world.sound_pickup_apple);
    resetSound(world.sound_pickup_crystal);
    resetSoundsCharacter();
    resetSoundsThrowableObjects();    
    resetSoundsEnemies();
}

/**
 * Resets the Character's sounds.
 */
function resetSoundsCharacter() {
    resetSound(world.character.sound_walking);
    resetSound(world.character.sound_snoring);
    resetSound(world.character.sound_hurt);
    resetSound(world.character.sound_dying);
}

/**
 * Resets the sounds of the Throwable Objects.
 */
function resetSoundsThrowableObjects() {
    for (let i = 0; i < world.throwableObjects.length; i++) {
        resetSound(world.throwableObjects[i].sound_throwing);
    }
}

/**
 * Resets the Enemies' sounds.
 */
function resetSoundsEnemies() {
    resetSound(world.sound_wraith_hit);
    for (let i = 0; i < world.level.enemies.length; i++) {
        if (world.level.enemies[i].sound_demon_dead)
            resetSound(world.level.enemies[i].sound_demon_dead);
        else if (world.level.enemies[i].sound_demon_attack)
            resetSound(world.level.enemies[i].sound_demon_attack);
        else if (world.level.enemies[i].sound_demon_hit)
            resetSound(world.level.enemies[i].sound_demon_hit);
        else if (world.level.enemies[i].sound_disappearing)
            resetSound(world.level.enemies[i].sound_disappearing);
    }
}

/**
 * Checks if the sound status in the local storage is "off".
 * Cycles through the buttons to change the sound button image to the one corresponding to sounds off.
 * Triggers the "handleSounds" function to also turn off the sounds.
 */
function corrSoundStatus() {
    if (localStorage.getItem('soundStatus') == 'off') {
        world.buttons.forEach((button) => {
            if (button.content == 'sound')
                handleSounds(button);
        });
    }
}

/**
 * Toggles the sounds on or off and stores the current sound stage in the local storage.
 * Shows the right sound button corresponding to the sound status.
 */
function handleSounds(button) {
    toggleBackgroundSound();
    toggleCharacterSounds();
    toggleEnemiesSounds();
    togglePickupSounds();
    world.throwableObjectsSound = false;
    if (world.sound_background.muted) {
        localStorage.setItem('soundStatus', 'off');
        button.loadImage('img/symbols/sound_off_orange.png');
    } else {
        localStorage.setItem('soundStatus', 'on');
        button.loadImage('img/symbols/sound_on_orange.png');
        world.throwableObjectsSound = true;
    }
}

/**
 * Toggles the background sound on or off.
 */
function toggleBackgroundSound() {
    world.sound_background.muted = !world.sound_background.muted;
}

/**
 * Toggles the character's sounds on or off.
 */
function toggleCharacterSounds() {
    world.character.sound_walking.muted = !world.character.sound_walking.muted;
    world.character.sound_snoring.muted = !world.character.sound_snoring.muted;
    world.character.sound_dying.muted = !world.character.sound_dying.muted;
    world.character.sound_hurt.muted = !world.character.sound_hurt.muted;
}

/**
 * Toggles the enemies' sounds on or off.
 */
function toggleEnemiesSounds() {
    world.sound_wraith_hit.muted = !world.sound_wraith_hit.muted;
    for (let i = 0; i < world.level.enemies.length; i++) {
        if (world.level.enemies[i].demon == true) {
            world.level.enemies[i].sound_demon_dead.muted = !world.level.enemies[i].sound_demon_dead.muted;
            world.level.enemies[i].sound_demon_hit.muted = !world.level.enemies[i].sound_demon_hit.muted;
            world.level.enemies[i].sound_demon_attack.muted = !world.level.enemies[i].sound_demon_attack.muted;
        } else
            world.level.enemies[i].sound_disappearing.muted = !world.level.enemies[i].sound_disappearing.muted;
    }
}

/**
 * Toggles the pickup sounds on or off.
 */
function togglePickupSounds() {
    world.sound_pickup_crystal.muted = !world.sound_pickup_crystal.muted;
    world.sound_pickup_apple.muted = !world.sound_pickup_apple.muted;
}