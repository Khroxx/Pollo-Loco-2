class Cloud extends MoveableObject {
  y = 20;
  height = 700;
  width = 1000;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = 60 + Math.random() * 4000;
    this.animate();
  }

  /**
   * This method is responsible for animating the cloud.
   * It sets up an interval to move the cloud to the left at a speed defined by `this.speed`.
   * It also calls the `moveLeft` method to initiate the movement.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 40);
    this.moveLeft();
  }
}
