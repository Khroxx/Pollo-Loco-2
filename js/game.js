let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

// WASD or ARROW keys
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 68 || event.keyCode == 39) {
        keyboard.RIGHT = true;
    } 
    if(event.keyCode == 65 || event.keyCode == 37) {
        keyboard.LEFT = true;
    } 
    if(event.keyCode == 38 || event.keyCode == 32) {
        keyboard.JUMP = true;
    } 
    if(event.keyCode == 70){
        keyboard.F = true;
    }
})
document.addEventListener('keyup', (event) => {
    if(event.keyCode == 68 || event.keyCode == 39) {
        keyboard.RIGHT = false;
    } 
    if(event.keyCode == 65 || event.keyCode == 37) {
        keyboard.LEFT = false;
    } 
    if(event.keyCode == 38 || event.keyCode == 32) {
        keyboard.JUMP = false;
    } 
    if(event.keyCode == 70){
        keyboard.F = false;
    }
})