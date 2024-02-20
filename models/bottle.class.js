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
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.x = 200 + Math.random() * 3000;     
           
        this.animate();
    }

    removeBottle() {
      this.removed = true;
      }

    animate() {
      this.bottleInterval = setInterval(() => {
          this.playAnimation(this.IMAGES_BOTTLE_GROUND);
        }, 200);
    }

    stopBottleAnimation(){
      clearInterval(this.bottleInterval);
    }
  }