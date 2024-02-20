class Character extends MoveableObject {
    height = 300;
    width = 150;
    y = 330;
    speed = 10;
    isMoving = false; 
    timer = new Date().getTime();
    world;
    offsetTop = 130;
    offsetBottom = 0;
    offsetLeft = 25;
    offsetRight = 25;
    running_sound = audio[0];
    jumping_sound = audio[1];
    endScreen = document.getElementById("gameLostScreen");
  
    IMAGES_IDLE = [
      "img/2_character_pepe/1_idle/idle/I-1.png",
      "img/2_character_pepe/1_idle/idle/I-2.png",
      "img/2_character_pepe/1_idle/idle/I-3.png",
      "img/2_character_pepe/1_idle/idle/I-4.png",
      "img/2_character_pepe/1_idle/idle/I-5.png",
      "img/2_character_pepe/1_idle/idle/I-6.png",
      "img/2_character_pepe/1_idle/idle/I-7.png",
      "img/2_character_pepe/1_idle/idle/I-8.png",
      "img/2_character_pepe/1_idle/idle/I-9.png",
      "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
  
    IMAGES_IDLE_LONG = [
      "img/2_character_pepe/1_idle/long_idle/I-11.png",
      "img/2_character_pepe/1_idle/long_idle/I-12.png",
      "img/2_character_pepe/1_idle/long_idle/I-13.png",
      "img/2_character_pepe/1_idle/long_idle/I-14.png",
      "img/2_character_pepe/1_idle/long_idle/I-15.png",
      "img/2_character_pepe/1_idle/long_idle/I-16.png",
      "img/2_character_pepe/1_idle/long_idle/I-17.png",
      "img/2_character_pepe/1_idle/long_idle/I-18.png",
      "img/2_character_pepe/1_idle/long_idle/I-19.png",
      "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];
  
    IMAGES_WALKING = [
      "img/2_character_pepe/2_walk/W-21.png",
      "img/2_character_pepe/2_walk/W-22.png",
      "img/2_character_pepe/2_walk/W-23.png",
      "img/2_character_pepe/2_walk/W-24.png",
      "img/2_character_pepe/2_walk/W-25.png",
      "img/2_character_pepe/2_walk/W-26.png"
    ];
  
    IMAGES_JUMPING = [
      'img/2_character_pepe/3_jump/J-31.png',
      'img/2_character_pepe/3_jump/J-32.png',
      'img/2_character_pepe/3_jump/J-33.png',
      'img/2_character_pepe/3_jump/J-34.png',
      'img/2_character_pepe/3_jump/J-35.png',
      'img/2_character_pepe/3_jump/J-36.png',
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png'
    ];
  
    IMAGES_DEAD = [
      'img/2_character_pepe/5_dead/D-51.png',
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png'
    ];
  
    IMAGES_HURT = [
      'img/2_character_pepe/4_hurt/H-41.png',
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png',
    ];
  
    constructor() {
      super().loadImage("img/2_character_pepe/2_walk/W-21.png");
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_IDLE_LONG);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.applyGravity();
      this.animate(); 
    }
  

    animate() {
      const currentTime = new Date().getTime();

        this.moveInterval = setInterval(() => {
        this.running_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < 4800){
          this.isMoving = true;
          this.moveRight();
          this.timer = currentTime;
          if(this.world.camera_x > -3720 || this.world.camera_x < -4800){
            this.world.camera_x = -this.x + 100;
          }
        } 
        else if(this.world.keyboard.LEFT && this.x > 100){
          this.isMoving = true;
          this.moveLeft();
          this.timer = currentTime;
          this.otherDirection = true;
          if(this.world.camera_x > -3720 || this.x < 3720){
            this.world.camera_x = -this.x + 100;
          }
        } 
        else {
          this.isMoving = false; 
          if (this.world.camera_x > -3720 || this.x < 3720){
            this.world.camera_x = -this.x + 100;
          }
          else {
            // do nothing
          }
        }
        if (this.world.keyboard.JUMP && !this.isAboveGround()) {
          this.jump();
          this.jumping_sound.volume = 0.5;
          this.jumping_sound.play();
          this.timer = currentTime;
        }
        if (world.endboss.endBossEnergy === 0) {
          this.stopAnimating();
          this.running_sound.pause();
          this.isMoving = false;
          audio[8].pause();
          // world.endboss.death();
        }
        
      }, 1000 / 60);
  
      this.characterStateInterval = setInterval(() => {
        
        const timeSinceLastKeyPress = (currentTime - this.timer) / 1000;
    
        if (this.energy <= 0) {
          this.deathAnimation();
          // this.playAnimation(this.IMAGES_DEAD);
          // setTimeout(() => {
          //   this.img = new Image();
          //   this.y = -100;
          // }, 80);
          // this.stopAnimating();
          this.world.gameLost();
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
          this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isMoving) {
          this.playAnimation(this.IMAGES_WALKING);
        } else if (timeSinceLastKeyPress > 10 && timeSinceLastKeyPress < 18){
            this.playAnimation(this.IMAGES_IDLE_LONG);
        } else if (timeSinceLastKeyPress <= 10){
          this.playAnimation(this.IMAGES_IDLE);
        }    
      }, 100);
    }


    deathAnimation() {
      let animationIndex = 0;
      const playDeathAnimation = () => {
        if (animationIndex < this.IMAGES_DEAD.length) {
          this.playAnimation([this.IMAGES_DEAD[animationIndex]]);
          animationIndex++;
          setTimeout(playDeathAnimation, 100);
        } else {
          this.playAnimation([this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]);
        }
      };
      playDeathAnimation();
    }

    // playdeathAnimation() {
      // let animationIndex = 0;
      // this.deadAnimation = setInterval(() => {
      //   if (animationIndex < this.IMAGES_DEAD.length - 1) {
      //     this.playAnimation([this.IMAGES_DEAD[animationIndex]]);
      //     animationIndex++;
      //   } else {
          // this.playAnimation([this.IMAGES_DEAD[6]]);
        // }
      // }, 100);
    // }
  
    stopAnimating() {
      clearInterval(this.moveInterval);
      clearInterval(this.characterStateInterval);
    }
  
    resetCharacterEnergy() {
      this.energy = 100;
    }
  
  }
  