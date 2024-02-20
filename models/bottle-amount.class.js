class BottlesAmount extends DrawableObject {
  IMAGE_BOTTLE = ['img/6_salsa_bottle/salsa_bottle.png'];

      bottleAmount;
    
      constructor() {
        super();
        this.loadImages(this.IMAGE_BOTTLE);
        this.x = 10;
        this.y = 600;
        this.width = 130;
        this.height = 130;
        this.otherDirection = false;
        this.showBottle();
        this.setBottleAmount(0);
      }


      draw(ctx) {
        super.draw(ctx);
        ctx.font = "60px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(this.bottleAmount, (this.x -20) + this.width, (this.y + 25) + this.height / 2);
      }

      showBottle() {
        let path = this.IMAGE_BOTTLE;
        this.img = this.imageCache[path];
      }

      setBottleAmount(amount){
        this.bottleAmount = amount;
        this.showBottle();
      }

    
      collectBottle() {
        this.bottleAmount++
        this.showBottle();

        // add ding sound
      }

      reduceBottle() {
        this.bottleAmount--;
        this.showBottle();
      }


  }