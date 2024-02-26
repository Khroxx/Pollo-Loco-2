let canvas;
let world;
let keyboard = new Keyboard();
let showFullScreen = true;

async function playGame() {
  showGame();
  audio[9].pause(); // win sound
  audio[10].pause(); // lost sound
  muteSound();
  initLevel();
  setTimeout(function() {
    startGame();
  }, 1000);
}

function startGame(){
  unmuteSound();
  loadGame();
  let canvas = document.getElementById("canvas");
  canvas.style.display = "block";

  world = new World(canvas, keyboard);
  // world.run();
  if (world) {
    world.restartGame();
  }
}

function restartTheGame() {
  
  if (world) {
    world.restartGame();
    // world.run();
  }
}

function playBackgroundSound() {
  let background_sound = audio[8];
  background_sound.volume = 0.2;
  background_sound.play();
  background_sound.loop = true;
}


  window.addEventListener('keydown', (event) => {
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
  });

  window.addEventListener('keyup', (event) => {
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
  });

  document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
  });
  document.getElementById('btnLeft').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
  });
  document.getElementById('btnJump').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.JUMP = true;
  });
  document.getElementById('btnJump').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.JUMP = false;
  });
  document.getElementById('btnRight').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
  });
  document.getElementById('btnRight').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
  });
  document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.THROW = true;
  });
  document.getElementById('btnThrow').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.THROW = false;
  });
});
