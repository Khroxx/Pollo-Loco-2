class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 100;
    y = 330;
    height = 300;
    width = 150;


    loadImage(path) {
      this.img = new Image(); 
      this.img.src = path;
    }
  
    loadImages(array) {
      array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    drawFrame(ctx) {
      if (this instanceof Character ||this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
      }
    }


    clearAllIntervals() {
      for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    drawOffsetFrame(ctx) {
      if (this instanceof Character || this instanceof ChickenSmall || this instanceof Endboss || this instanceof ThrowableObject) {
        let offsetTop, offsetBottom, offsetLeft, offsetRight;
        if (this instanceof Character) {
          offsetTop = 130;
          offsetBottom = 10;
          offsetLeft = 25;
          offsetRight = 25;
        } else if (this instanceof Bottle) {
          offsetTop = 10;
          offsetBottom = 10;
          offsetLeft = 30;
          offsetRight = 30;
        } else if (this instanceof Coin) {
          offsetTop = 90;
          offsetBottom = 90;
          offsetLeft = 90;
          offsetRight = 90;
        } else if (this instanceof ChickenSmall) {
          offsetTop = 10; 
          offsetBottom = 10;
          offsetLeft = 10;
          offsetRight = 10;
        } 
        else {
          offsetTop = 0;
          offsetBottom = 0;
          offsetLeft = 0;
          offsetRight = 0;
        }
    
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + offsetLeft, this.y + offsetTop, this.width - offsetLeft - offsetRight, this.height - offsetTop - offsetBottom);
        ctx.stroke();
      }
    }
  }
  