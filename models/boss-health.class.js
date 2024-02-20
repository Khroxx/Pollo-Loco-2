class BossHealth extends DrawableObject {
    IMAGES_ENDBOSS = [
      "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    ];
  
    percentage = 100;
  
    constructor() {
      super();
      this.loadImages(this.IMAGES_ENDBOSS);
      this.x = 4450;
      this.y = -10;
      this.width = 500;
      this.height = 100;
      this.setPercentage(100);
    }
  
    
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }

  
    resolveImageIndex(){
      if(this.percentage == 100){
          return 5;  
      } else if(this.percentage == 80){
          return 4;
      } else if(this.percentage == 60){
          return 3;
      } else if(this.percentage == 40){
          return 2;
      } else if(this.percentage == 20){
          return 1;
      } else {
          return 0;
      }
    }
  }