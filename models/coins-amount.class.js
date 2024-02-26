class CoinsAmount extends DrawableObject {
  IMAGE_COIN = ["img/8_coin/coin_2.png"];

  coinAmount = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGE_COIN);
    this.x = 120;
    this.y = -5;
    this.width = 250;
    this.height = 250;
    this.otherDirection = false;
    this.setCoinAmount(0);
    this.showCoin();
  }

  /**
   * Draws the coin amount on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The context object associated with the canvas.
   */
  draw(ctx) {
    super.draw(ctx);
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.coinAmount,
      this.x - 60 + this.width,
      this.y + 25 + this.height / 2
    );
  }
  /**
   * Sets the amount of coins and updates the image.
   * @param {number} amount - The new amount of coins.
   */
  setCoinAmount(Amount) {
    this.coinAmount = Amount;
    this.showCoin();
  }
  /**
   * Updates the image to show the coins.
   */
  showCoin() {
    let path = this.IMAGE_COIN;
    this.img = this.imageCache[path];
  }
  /**
   * Increases the amount of coins by one and updates the image.
   */
  collectCoin() {
    this.coinAmount++;
    this.showCoin();
  }
}
