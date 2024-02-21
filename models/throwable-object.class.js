class ThrowableObject extends MoveableObject {
    bottlesAmount;
    throwInterval;
    // BossCollision = false;
    bottleSplash_sound = audio[4];
  
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
  
    throw() {
      this.speedY = 30;
  
      this.throwInterval = setInterval(() => {
        if (this.y >= 540) {
          clearInterval(this.throwInterval);
          this.splashBottle();
  
        } else {
          this.loadImages(this.IMAGES_BOTTLE_ROTATION);
          this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
          this.x += 20;
        }
      }, 80);
  
      this.bottlesAmount.reduceBottle();
  
      this.gravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
    }
  
  
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
  