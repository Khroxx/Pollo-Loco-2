/**
 * Displays the loading screen and hides the game lost and won screens.
 */
async function showGame() {
    let loadingScreen = document.getElementById("loadingScreen");
    let gameLostScreen = document.getElementById("gameLostScreen");
    let wonScreen = document.getElementById("gameWonScreen");

    gameLostScreen.style.display = "none";
    wonScreen.style.display = "none";
    loadingScreen.style.display = "flex";
}

/**
 * Starts the background sound and hides the start button, start screen, loading screen, and movement buttons.
 */
function loadGame() {
    playBackgroundSound();
    let startButton = document.getElementById("startGameButton");
    let loadingScreen = document.getElementById("loadingScreen");
    let startScreen = document.getElementById("startScreen");
    let movementButtons = document.getElementById('movementButtons');

    movementButtons.style.display = 'none';
    startScreen.style.display = "none";
    startButton.style.display = "none";
    loadingScreen.style.display = "none";
    
}


/**
 * Hides the game lost screen, game won screen, and canvas, and displays the start button and start screen.
 */
function backToHome(){
    let lostScreen = document.getElementById("gameLostScreen");
    let canvas = document.getElementById("canvas");
    let startButton = document.getElementById("startGameButton");
    let startScreen = document.getElementById("startScreen");
    let wonScreen = document.getElementById("gameWonScreen");
  
    lostScreen.style.display = "none";
    wonScreen.style.display = "none";
    canvas.style.display = "none";
    startButton.style.display = "flex";
    startScreen.style.display = "flex";
}

/**
 * Toggles the display of the movement buttons.
 */
function togglemovementButtons() {
    let movementButtons = document.getElementById('movementButtons');
    if (movementButtons.style.display === 'none') {
      movementButtons.style.display = 'flex';
        document.addEventListener('click', closeMovementButtonsOutside);
    } else if(movementButtons.style.display === 'flex') {
      movementButtons.style.display = 'none';
    }
}
  
/**
 * Hides the movement buttons when a click is detected outside of the movement buttons and the info icon.
 * @param {Event} event - The event object.
 */
function closeMovementButtonsOutside(event) {
    let movementButtons = document.getElementById('movementButtons');
    let infoIcon = document.getElementById('infoIcon');
    if (event.target !== movementButtons && event.target !== infoIcon && !movementButtons.contains(event.target)) {
      movementButtons.style.display = 'none';
        document.removeEventListener('click', closeMovementButtonsOutside);
    }
}
  

/**
 * Requests full screen mode for the game screen.
 * @param {HTMLElement} gamescreen - The game screen element.
 */
function requestFullScreen(gamescreen) {
  if (gamescreen.requestFullscreen) {
    gamescreen.requestFullscreen();
  } else if (gamescreen.mozRequestFullScreen) { /* Firefox */
  gamescreen.mozRequestFullScreen();
  } else if (gamescreen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
  gamescreen.webkitRequestFullscreen();
  } else if (gamescreen.msRequestFullscreen) { /* IE/Edge */
  gamescreen.msRequestFullscreen();
  }
}


/**
 * Exits full screen mode.
 */
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}


/**
 * Toggles full screen mode for the game screen.
 */
function toggleFullScreen() {
  let gamescreen = document.getElementById('gameScreen');
  if (!document.fullscreenElement) {
    requestFullScreen(gamescreen);
  } else {
    exitFullScreen()
  }
}



document.addEventListener('fullscreenchange', function() {
  let gameLostScreen = document.getElementById('gameLostScreen');
  let gameWonScreen = document.getElementById('gameWonScreen');
  let startScreen = document.getElementById('startScreen');
  let canvas = document.getElementById('canvas');

  if (!document.fullscreenElement) {
    startScreen.classList.remove('fullscreen');
    canvas.classList.remove('fullscreen');
    gameLostScreen.classList.remove('fullscreen');
    gameWonScreen.classList.remove('fullscreen');
  }else {
    startScreen.classList.add('fullscreen');
    canvas.classList.add('fullscreen');
    gameLostScreen.classList.add('fullscreen');
    gameWonScreen.classList.add('fullscreen');
  }
});


