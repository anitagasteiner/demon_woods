let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas); // Bei der Erstellung einer neuen "World" kann ich schon eine Variable mitgeben. -> "canvas"    

    console.log('My character is ', world.character);    
}