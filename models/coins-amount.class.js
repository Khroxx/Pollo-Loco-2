class CoinsAmount extends DrawableObject {
  IMAGE_COIN = ['img/8_coin/coin_2.png'];
  

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
        this.showCoin()
      }

      draw(ctx) {
        super.draw(ctx);
        ctx.font = "60px Arial";
        ctx.fillStyle = 'white';
        ctx.fillText(this.coinAmount, (this.x -60) + this.width, (this.y + 25) + this.height / 2);
      }

      setCoinAmount(Amount){
        this.coinAmount = Amount;
        this.showCoin();
      }

      showCoin(){
        let path = this.IMAGE_COIN;
        this.img = this.imageCache[path];
      }

      collectCoin() {
        this.coinAmount++;
        this.showCoin();
      }

  }