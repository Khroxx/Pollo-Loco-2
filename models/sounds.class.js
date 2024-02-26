let audio = [
  new Audio("audio/running.mp3"),
  new Audio("audio/jump.mp3"),
  new Audio("audio/bottle.mp3"),
  new Audio("audio/coin.mp3"),
  new Audio("audio/bottle_splash.mp3"),
  new Audio("audio/chicken_dead.mp3"),
  new Audio("audio/boss_hit.mp3"),
  new Audio("audio/pepe_hurt.mp3"),
  new Audio("audio/background_music.mp3"),
  new Audio("audio/you_won.mp3"),
  new Audio("audio/game_over.mp3"),
];

let sound = false;

/**
 * Initializes the sound system by muting all sounds.
 */
function init() {
  muteSound();
}

/**
 * Toggles the sound on or off. If the sound is currently on, it will be muted. If it is currently off, it will be unmuted.
 */
function toggleSound() {
  if (sound) {
    muteSound();
  } else {
    unmuteSound();
  }
}

/**
 * Mutes all sounds and changes the volume icon to indicate that the sound is off.
 */
function muteSound() {
  let volumeIcon = document.getElementById("volumeIcon");
  volumeIcon.src = "/img/10_extras/volume_off.png";
  audio.forEach((sound) => {
    sound.muted = true;
    sound.pause();
  });
  sound = false;
}

/**
 * Unmutes all sounds and changes the volume icon to indicate that the sound is on.
 * Also plays the 9th sound in the audio array at a volume of 0.2 and sets it to loop.
 */
function unmuteSound() {
  let volumeIcon = document.getElementById("volumeIcon");
  volumeIcon.src = "/img/10_extras/volume.png";
  audio.forEach((sound) => {
    sound.muted = false;
  });
  sound = true;

  if (sound) {
    audio[8].play();
    audio[8].volume = 0.2;
    audio[8].loop = true;
  }
}
