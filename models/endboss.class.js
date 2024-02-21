class Endboss extends MoveableObject {
    height = 270;
    width = 250;
    y = 360;
    direction = 'left';
    world;
    endBossEnergy = 100;
    energy = 100;
    offsetTop = 50;
    offsetBottom = 50;
    offsetLeft = 50;
    offsetRight = 50;
    endBoss_hurt_sound = audio[6];
  
    ENDBOSS_WALKING = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
  
    ENDBOSS_ALERT = [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
  
    ENDBOSS_ATTACK = [
      'img/4_enemie_boss_chicken/3_attack/G13.png',
      'img/4_enemie_boss_chicken/3_attack/G14.png',
      'img/4_enemie_boss_chicken/3_attack/G15.png',
      'img/4_enemie_boss_chicken/3_attack/G16.png',
      'img/4_enemie_boss_chicken/3_attack/G17.png',
      'img/4_enemie_boss_chicken/3_attack/G18.png',
      'img/4_enemie_boss_chicken/3_attack/G19.png',
      'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
  
    ENDBOSS_HURT = [
      "img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];
  
    ENDBOSS_DEAD = [
      "img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];
  
    constructor() {
      super().loadImage(this.ENDBOSS_WALKING[0]);
      this.loadImages(this.ENDBOSS_WALKING);
      this.loadImages(this.ENDBOSS_ALERT);
      this.loadImages(this.ENDBOSS_HURT);
      this.loadImages(this.ENDBOSS_DEAD);
      this.loadImages(this.ENDBOSS_ATTACK);
      this.x = 4700;
      this.speed = 2;
      this.animate();
    }


    animate() {
      
      setInterval(() => {
        if (world){
        this.bossAnimation();
        }
      }, 200);
      setInterval(() => {
        if (world){
        this.moveEndboss();
        }
      }, 1000 / 60);
    }

    bossAnimation() {
      if (world.bossHealth.percentage === 0) {
        this.deathAnimation();
      } else if (this.alertDistance() && !this.isDead()) {
        this.alertMode();
      } else if (this.attackDistance() && !this.isDead()) {
        this.attackMode();
      } else if (!this.isDead()){
        this.moveEndboss();
        this.speed = 3;
        this.playAnimation(this.ENDBOSS_WALKING);
      }
    }

    deathAnimation() {
      this.playAnimation(this.ENDBOSS_DEAD);
      setTimeout(() => {
        this.clearAllIntervals();
        world.gameWon();

        let path = this.ENDBOSS_DEAD[2];
        this.img = this.imageCache[path];
      }, 1000);
    }


    alertMode() {
      this.speedY = 5;
      this.playAnimation(this.ENDBOSS_ALERT);
      this.otherDirection = false;
    }

    attackMode(){
      this.playAnimation(this.ENDBOSS_ATTACK);
      this.otherDirection = false;
      this.moveEndboss();
      this.speed = 6;
      this.speedY = 0;
    }
  

    endBossHurt() {
      this.energy -= 20;
      if (this.energy > 0) {
        this.hurtAnimation();
      }
      if (this.energy <= 0){
        return this.energy = 0;
      }
    }

    hurtAnimation() {
      let animationIndex = 0;
      this.endBoss_hurt_sound.volume = 0.1;
      this.endBoss_hurt_sound.play();
      const hurtAnimation = setInterval(() => {
      if (!this.isDead()) {
        if (animationIndex < this.ENDBOSS_HURT.length) {
          this.playAnimation([this.ENDBOSS_HURT[animationIndex]]);
          animationIndex++;
        } else {
          this.stopAnimation(hurtAnimation);
          this.playAnimation(this.ENDBOSS_WALKING);
        }
      }
      }, 100);
    }



    stopAnimation(animation) {
      clearInterval(animation);
    }

    alertDistance() {
      return world.character.x > 3900 && world.character.x < 4149;
    }

    attackDistance(){
      return world.character.x > 4150;
    }
  
    moveEndboss() { 
      if ((this.x - world.character.x) < 400 && (this.x - world.character.x) > -400){
        if ((this.x - world.character.x) > 0) {
          this.moveLeft();
        } else {
          this.moveRight();
          this.otherDirection = true;
        }
      } else {
        this.moveLeftRight();
      }     
    }

  moveLeftRight(){
    if (this.x >= 4700){
      this.direction = 'left';
    } else if (this.x <= 4400) {
      this.direction = 'right';
    }
    if (this.direction === 'right') {
      this.moveRight();
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;    
    }
  }

  reset() {
      this.endBossEnergy = 100;
  }
    
}
  
