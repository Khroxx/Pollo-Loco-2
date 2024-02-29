class ChickenSmall extends MoveableObject {
  height = 75;
  width = 60;
  offsetTop = 10;
  offsetBottom = 10;
  offsetLeft = 10;
  offsetRight = 10;
  chicken_sound = audio[5];

  CHICKEN_SMALL_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  CHICKEN_SMALL_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.CHICKEN_SMALL_WALKING);
    this.loadImages(this.CHICKEN_SMALL_DEAD);
    this.x = 1000 + Math.random() * 4000;
    this.y = 550;
    this.speed = 1.5 + Math.random() * 3;
    this.animate();
  }

  /**
   * This method is responsible for animating the chicken.
   * It sets up intervals to move the chicken and play the walking animation.
   */
  animate() {
    this.walkingInterval = setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);

    this.moveLeft();

    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.CHICKEN_SMALL_WALKING);
    }, 100);
  }

  /**
   * This method is called when the chicken dies.
   * It stops the walking animation, plays the death animation, and plays a sound.
   * After a short delay, it resets the chicken's image and position.
   */
  die() {
    this.stopWalkingAnimation();
    this.playAnimation(this.CHICKEN_SMALL_DEAD);
    this.chicken_sound.volume = 0.1;
    this.chicken_sound.play();

    setTimeout(() => {
      this.img = new Image();
      this.y = 0;
    }, 80);
  }

  
  /**
   * This method stops the walking and walking animation intervals.
   */
  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
    clearInterval(this.walkingAnimationInterval);
  }
}
