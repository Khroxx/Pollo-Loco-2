class BottlesAmount extends DrawableObject {
  IMAGE_BOTTLE = ["img/6_salsa_bottle/salsa_bottle.png"];

  bottleAmount;

  constructor() {
    super();
    this.loadImages(this.IMAGE_BOTTLE);
    this.x = 10;
    this.y = 50;
    this.width = 130;
    this.height = 130;
    this.otherDirection = false;
    this.showBottle();
    this.setBottleAmount(0);
  }

  /**
   * Draws the bottle amount on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The context object associated with the canvas.
   */
  draw(ctx) {
    super.draw(ctx);
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.bottleAmount,
      this.x - 20 + this.width,
      this.y + 25 + this.height / 2
    );
  }

  /**
   * Updates the image to show the bottle.
   */
  showBottle() {
    let path = this.IMAGE_BOTTLE;
    this.img = this.imageCache[path];
  }

  /**
   * Sets the amount of bottles and updates the image.
   * @param {number} amount - The new amount of bottles.
   */
  setBottleAmount(amount) {
    this.bottleAmount = amount;
    this.showBottle();
  }

  /**
   * Increases the amount of bottles by one and updates the image.
   */
  collectBottle() {
    this.bottleAmount++;
    this.showBottle();
  }

  /**
   * Decreases the amount of bottles by one and updates the image.
   */
  reduceBottle() {
    this.bottleAmount--;
    this.showBottle();
  }
}
