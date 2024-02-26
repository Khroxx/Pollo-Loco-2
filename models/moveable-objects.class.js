class MoveableObject extends DrawableObject {
  speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bossEnergy = 100;
    lastHit = 0;
    character;
    hurt_sound = audio[7];
    endBoss_hurt_sound = audio[6];
    canBeHit = true;
    bossLastHit = 0;

  
    applyGravity() {
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        } else {
          this.speedY = this.speedY;
      }
      }, 1000 / 25);
    }
  
    isAboveGround() {
      if (this instanceof ThrowableObject){
          return true;
      } else {    
          return this.y < 330;
      };
    }

    isColliding(mo){
      if (mo && mo.x !== undefined && mo.y !== undefined) {

        let offsetTop = mo.offsetTop || 0;
        let offsetBottom = mo.offsetBottom || 0;
        let offsetLeft = mo.offsetLeft || 0;
        let offsetRight = mo.offsetRight || 0;
    
        let moLeft = mo.x + offsetLeft;
        let moRight = mo.x + mo.width - offsetRight;
        let moTop = mo.y + offsetTop;
        let moBottom = mo.y + mo.height - offsetBottom;
    
        let thisLeft = this.x + this.offsetLeft;
        let thisRight = this.x + this.width - this.offsetRight;
        let thisTop = this.y + this.offsetTop;
        let thisBottom = this.y + this.height - this.offsetBottom;
    
        return thisRight > moLeft &&
               thisBottom > moTop &&
               thisLeft < moRight &&
               thisTop < moBottom;
      }
    }

   

    hit() {
      this.energy -= 1;
      if (this.energy > 0) {
        this.hurt_sound.volume = 0.5;
        this.hurt_sound.play();
      } if(this.energy <= 0) {
        return this.energy = 0;
      } else{
        this.lastHit = new Date().getTime();
      }
  }

    bossHit() {
      this.bossEnergy -= 20;
      this.bossLastHit = new Date().getTime();
      if (this.bossEnergy > 0) {
        this.endBoss_hurt_sound.volume = 0.1;
        this.endBoss_hurt_sound.play();
        
      } else if (this.bossEnergy <= 0){
        this.bossEnergy = 0;
      }
    }

    isBossHurt(){
      let timePassed = new Date().getTime() - this.bossLastHit; 
      let btimePassed = timePassed / 1000;
      console.log("time since hit: " + btimePassed);
      return btimePassed < 1;
      
    }
    
  
    isHurt(){
      let timePassed = new Date().getTime() - this.lastHit; 
      timePassed = timePassed / 1000;
      // console.log("character hit: " + timePassed);
      return timePassed < 1;
    }
  
    isDead(){
      return this.energy == 0;
    }
  
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    moveRight() {
      this.x += this.speed;
      this.otherDirection = false;
    }
  
    moveLeft() {
      this.x -= this.speed;
    }
  
    jump() {
      this.speedY = 30;
    }

  }
