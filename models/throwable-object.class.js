class ThrowableObject extends MoveableObject {
  bottlesAmount;
  throwInterval;
  bottleSplash_sound = audio[4];
  offsetTop = 0;
  offsetBottom = 0;
  offsetLeft = 0;
  offsetRight = 0;

  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, bottlesAmount) {
    super();
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.bottlesAmount = bottlesAmount;
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.throw();
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
  }

  /**
   * Throws the object by applying both vertical and horizontal motion.
   */
  throw() {
    this.bottlesAmount.reduceBottle();
    this.applyThrowMotion();
    this.applyHorizontalMotion();
  }

  /**
   * Moves the object upwards and applies gravity.
   */
  applyThrowMotion() {
    this.speedY = 15;
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Moves the object horizontally and checks for collision with the ground.
   */
  applyHorizontalMotion() {
    this.throwInterval = setInterval(() => {
      if (this.y >= 540) {
        clearInterval(this.throwInterval);
        this.splashBottle();
      } else {
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += 40;
      }
    }, 80);
  }

  /**
   * Makes the bottle do the splash animation.
   */
  splashBottle() {
    this.bottleSplash_sound.volume = 0.1;
    this.bottleSplash_sound.play();
    clearInterval(this.throwInterval);
    clearInterval(this.gravityInterval);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

    setTimeout(() => {
      this.img = new Image();
    }, 200);
  }
}
