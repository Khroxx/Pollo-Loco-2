class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 100;
  y = 330;
  height = 300;
  width = 150;

  /**
   * Loads an image from a given path and assigns it to this object's img property.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of paths and stores them in this object's imageCache.
   * @param {Array<string>} array - An array of paths to the images.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the image of this object on a given context.
   * @param {CanvasRenderingContext2D} ctx - The context to draw the image on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around this object on a given context if it is an instance of Character, Endboss, Bottle, or Coin.
   * @param {CanvasRenderingContext2D} ctx - The context to draw the frame on.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Clears all intervals.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Draws an offset frame around this object on a given context if it is an instance of Character, ChickenSmall, Endboss, or ThrowableObject.
   * @param {CanvasRenderingContext2D} ctx - The context to draw the frame on.
   */
  drawOffsetFrame(ctx) {
    if (this instanceof Character || this instanceof ChickenSmall || this instanceof Endboss || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetLeft - this.offsetRight, this.height - this.offsetTop - this.offsetBottom);
      ctx.stroke();
    }
      
  }
  
}
