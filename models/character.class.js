class Character extends MoveableObject {
  height = 300;
  width = 150;
  y = 330;
  speed = 5;
  isMoving = false;
  timer = new Date().getTime();
  world;
  offsetTop = 130;
  offsetBottom = 0;
  offsetLeft = 25;
  offsetRight = 25;
  running_sound = audio[0];
  jumping_sound = audio[1];
  snoring_sound = audio[11];
  endScreen = document.getElementById("gameLostScreen");

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the animation and movement of the character.
   */
  animate() {
    setInterval(() => {
      this.movement();
    }, 1000 / 60);
    setInterval(() => {
      this.characterAnimation();
    }, 100);
  }

  /**
   * Handles the movement of the character.
   */
  movement() {
    this.isMoving = false;
    this.movementLeft();
    this.movementRight();
    this.jumpMovement();
    this.checkMovement();
  }

  /**
  * Checks if the character is moving and plays or pauses the sound accordingly.
  */
  checkMovement() {
    if (this.isMoving) {
      this.running_sound.volume = 0.5;
      this.running_sound.play();
      this.running_sound.loop = true;
    } else {
      this.running_sound.pause();
    }
  }

  /**
   * Handles the right movement of the character.
   */
  movementRight() {
    if (this.world.keyboard.RIGHT && this.x < 4800) {
      this.isMoving = true;
      this.moveRight();
      this.timer = new Date().getTime();
      if (this.world.camera_x > -3720 || this.world.camera_x < -4800) {
        this.world.camera_x = -this.x + 100;
      }
    }
  }

  /**
   * Handles the left movement of the character.
   */
  movementLeft() {
    if (this.world.keyboard.LEFT && this.x > 100) {
      this.isMoving = true;
      this.moveLeft();
      this.timer = new Date().getTime();
      this.otherDirection = true;
      if (this.world.camera_x > -3720 || this.x < 3720) {
        this.world.camera_x = -this.x + 100;
      }
    }
  }

  /**
   * Handles the jump movement of the character.
   */
  jumpMovement() {
    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
      this.jumping_sound.volume = 0.5;
      this.jumping_sound.play();
      this.timer = new Date().getTime();
    }
  }

  /**
   * Handles the animation of the character based on its state.
   */
  characterAnimation() {
    this.snoring_sound.pause();
    if (this.isDead()) {
      this.deathAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (!this.isHurt()){
      this.idleAnimation();
    }
  }

  /**
   * Handles the death animation of the character.
   */
  deathAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.clearAllIntervals();
      this.running_sound.pause();
      this.endScreen.style.display = "flex";
      this.world.gameLost_sound.play();
      this.world.gameLost_sound.volume = 0.3;

      let path = this.IMAGES_DEAD[0];
      this.img = this.imageCache[path];
    }, 1000);
  }

  /**
   * Handles the idle animation of the character.
   */
  idleAnimation() {
    let currentTime = new Date().getTime();
    let timeSinceLastKeyPress = (currentTime - this.timer) / 1000;
    if (timeSinceLastKeyPress > 15) {
      this.snoring_sound.volume = 0.2;
      this.snoring_sound.play();
      this.playAnimation(this.IMAGES_IDLE_LONG);
    } else if (timeSinceLastKeyPress <= 10) {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Resets the energy of the character to 100.
   */
  resetCharacterEnergy() {
    this.energy = 100;
  }
}
