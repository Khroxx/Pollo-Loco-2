let canvas;
let world;
let keyboard = new Keyboard();
let showFullScreen = true;
background_sound = audio[8];

async function playGame() {
  showGame();
  audio[9].pause();
  audio[10].pause();
  initLevel();
  setTimeout(function() {
    startGame();
  }, 1000);
}

function startGame(){
  loadGame();
  let canvas = document.getElementById("canvas");
  canvas.style.display = "block";
  world = new World(canvas, keyboard);
  background_sound.volume = 0.2;
  background_sound.play();
  background_sound.loop = true;

  if (world) {
    world.restartGame();
  }
}


window.addEventListener("keydown", (event) => {
  if(event.keyCode == 68 || event.keyCode == 39) {
    keyboard.RIGHT = true;
} 
if(event.keyCode == 65 || event.keyCode == 37) {
    keyboard.LEFT = true;
} 
if(event.keyCode == 38 || event.keyCode == 32) {
    keyboard.JUMP = true;
} 
if(event.keyCode == 70){ // F
    keyboard.THROW = true;
}
} )

window.addEventListener("keyup", (event) => {
  if(event.keyCode == 68 || event.keyCode == 39) {
    keyboard.RIGHT = false;
} 
if(event.keyCode == 65 || event.keyCode == 37) {
    keyboard.LEFT = false;
} 
if(event.keyCode == 38 || event.keyCode == 32) {
    keyboard.JUMP = false;
} 
if(event.keyCode == 70){ // F
    keyboard.THROW = false;
}

} )