class Chicken extends MoveableObject {
  height = 100;
  width = 90;
  offsetTop = 10;
  offsetBottom = 10;
  offsetLeft = 10;
  offsetRight = 10;
  chicken_sound = audio[5];

  CHICKEN_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  CHICKEN_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x = 1000 + Math.random() * 4000) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.CHICKEN_WALKING);
    this.loadImages(this.CHICKEN_DEAD);
    this.x = x;
    this.y = 525;
    this.speed = 1 + Math.random() * 3;
    this.animate();
  }

  /**
   * Handles the death animation of the character.
   */
  animate() {
    this.walkingInterval = setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);

    this.moveLeft();

    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.CHICKEN_WALKING);
    }, 100);
  }

  /**
   * Handles the idle animation of the character.
   */
  die() {
    this.stopWalkingAnimation();
    this.playAnimation(this.CHICKEN_DEAD);
    this.chicken_sound.volume = 0.1;
    this.chicken_sound.play();

    setTimeout(() => {
      this.img = new Image();
      this.y = 0;
    }, 70);
  }

  /**
   * Resets the energy of the character to 100.
   */
  stopWalkingAnimation() {
    clearInterval(this.walkingInterval);
    clearInterval(this.walkingAnimationInterval);
  }
}
