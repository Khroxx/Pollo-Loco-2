class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 330;
  height = 300;
  width = 150;

  //draws objects
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  //loads the image path for every object
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  //loags the array for given object path
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  
      // draws a colored frame around given classes
      drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

}
