class Coin extends MoveableObject {
    y = 380;
    width = 250;
    height = 250;
    offsetTop = 90;
    offsetBottom = 90;
    offsetLeft = 90;
    offsetRight = 90;
    removed = false;
    IMAGES_COINS_GROUND = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_COINS_GROUND[0]);
        this.loadImages(this.IMAGES_COINS_GROUND);
        this.x = 300 + Math.random() * 3000;
        this.y = 200 + Math.random() * 300;
        this.animate();
    }

    removeCoin() {
        this.removed = true;
      }

    animate() {
      this.coinAnimation =  setInterval(() => {
          this.playAnimation(this.IMAGES_COINS_GROUND);
        }, 200);
    }

    stopCoinAnimation(){
      clearInterval(this.coinAnimation);
    }
  }