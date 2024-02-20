class Endboss extends MoveableObject {
    height = 270;
    width = 250;
    y = 360;
    direction = 'left';
    world;
    endBossEnergy = 100;
    offsetTop = 50;
    offsetBottom = 50;
    offsetLeft = 50;
    offsetRight = 50;
    endBoss_hurt_sound = audio[6];
    isAlive = true;
  
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
      this.speed = 10;
      this.animate();
    }

    animate() {
      setInterval(() => {
        if (this.isBossDead){
          this.deathAnimation();
        } else if (this.alertDistance()) {
          this.alertMode();
        } else if (this.attackDistance()) {
          this.attackMode();
        } else {
          this.moveEndboss()
        }
      }, 200);
    }

    // bossAnimation() {
 
    // }  

    isBossDead() {
      return this.endBossEnergy == 0;
    }
    // animate(){
    //   this.animationInterval = setInterval(() => {
    //     if (this.world) {
    //       if (this.endBossEnergy > 0) {
    //         if(this.alertDistance()) {
    //           this.alertMode();
    //         } else if (this.attackDistance()) {
    //           this.attackMode();
    //         } else if (!this.attackDistance() && !this.alertDistance()) {
    //           this.moveEndboss();
    //           this.playAnimation(this.ENDBOSS_WALKING);
    //         }
    //       } else {
    //         this.stopAnimation(this.animationInterval);
    //       }
    //     }
    //   }, 100);
    //   this.deathInterval = setInterval(() => {
    //     if (this.world) {
    //     if (this.endBossEnergy === 0) {
    //       this.stopAnimation(this.animationInterval);
    //       this.deathAnimation();
    //       this.bossKilled();
    //     }
    //   }
    //   }, 100);
    
    // }

    alertMode() {
      this.speedY = 5;
      this.playAnimation(this.ENDBOSS_ALERT);
      this.otherDirection = false;
    }

    attackMode(){
      this.playAnimation(this.ENDBOSS_ATTACK);
      this.otherDirection = false;
      this.moveEndboss();
      this.speed = 15;
      this.speedY = 0;
    }
  
    endBossHurt() {
      if (this.endBossEnergy > 0) {
        this.endBossEnergy -= 20;
        this.hurtAnimation();
      }
      if (this.endBossEnergy <= 0){
        this.endBossEnergy = 0;
      }
    }

    hurtAnimation() {
      let animationIndex = 0;
      this.endBoss_hurt_sound.volume = 0.1;
      this.endBoss_hurt_sound.play();
      // const hurtAnimation = setInterval(() => {
        // if (animationIndex < this.ENDBOSS_HURT.length) {
          this.playAnimation([this.ENDBOSS_HURT[animationIndex]]);
          // animationIndex++;
        // } else {
          // this.stopAnimation(hurtAnimation);
          this.playAnimation(this.ENDBOSS_WALKING);
        }
      // }, 100);
    // }



    deathAnimation() {
      this.playAnimation(this.ENDBOSS_DEAD);
      setTimeout(() => {
        this.clearAllIntervals();
        world.gameWon();
      }, 1000);
    }
    // deathAnimation() {
    //   let animationIndex = 0;
    //   const deadAnimation = setInterval(() => {
    //     if (animationIndex < this.ENDBOSS_DEAD.length) {
    //       this.playAnimation([this.ENDBOSS_DEAD[animationIndex]]);
    //       animationIndex++;
    //     } else {
    //       this.stopAnimation(deadAnimation);
    //     }
    //   }, 100);
    // }

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
      this.isAlive = true;
  }
    
}
  
