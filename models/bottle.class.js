class Bottle extends MoveableObject {
  y = 525;
  width = 100;
  height = 100;
  removed = false;
  offsetTop = 10;
  offsetBottom = 10;
  offsetLeft = 30;
  offsetRight = 30;
  IMAGES_BOTTLE_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);
    this.loadImages(this.IMAGES_BOTTLE_GROUND);
    this.x = 200 + Math.random() * 3000;

    this.animate();
  }

  /**
   * Sets the removed property of the bottle object to true.
   */
  removeBottle() {
    this.removed = true;
  }

  /**
   * Starts the animation for the bottle object by setting an interval
   * that repeatedly calls the playAnimation method with the IMAGES_BOTTLE_GROUND parameter.
   */
  animate() {
    this.bottleInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }, 200);
  }

  /**
   * Stops the animation for the bottle object by clearing the interval set in the animate method.
   */
  stopBottleAnimation() {
    clearInterval(this.bottleInterval);
  }
}
