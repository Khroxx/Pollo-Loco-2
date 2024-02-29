class Endboss extends MoveableObject {
  height = 270;
  width = 250;
  y = 360;
  direction = "left";
  world;
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
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
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
    this.speed = 8;
    this.animate();
  }

  /**
   * Animates the end boss.
   */
  animate() {
    setInterval(() => {
      if (world) {
        this.bossAnimation();
        this.moveEndboss();
        // this.spawnChicken();
      }
    }, 200);
  }

  /**
   * Controls the boss animation based on the current state of the boss.
   */
  bossAnimation() {
    if (world.endboss.isBossHurt() && !world.bossHealth.percentage === 0) {
      this.playAnimation(this.ENDBOSS_HURT);
    } else if (world.bossHealth.percentage === 0) {
      this.deathAnimation();
    } else if (this.alertDistance()) {
      this.alertMode();
    } else if (this.attackDistance()) {
      this.attackMode();
    } else if (!this.isDead()) {
      this.moveEndboss();
      this.speed = 8;
      this.playAnimation(this.ENDBOSS_WALKING);
    }
  }

  /**
   * Plays the death animation for the boss.
   */
  deathAnimation() {
    this.playAnimation(this.ENDBOSS_DEAD);
    0;
    this.speed = 0;
    this.speedY = 15;
    setTimeout(() => {
      this.clearAllIntervals();
      world.gameWon();
      let path = this.ENDBOSS_DEAD[2];
      this.img = this.imageCache[path];
    }, 1000);
  }

  /**
   * Puts the boss in alert mode.
   */
  alertMode() {
    this.speedY = 5;
    this.playAnimation(this.ENDBOSS_ALERT);
    this.otherDirection = false;
    this.speed = 7;
  }

  /**
   * Puts the boss in attack mode.
   */
  attackMode() {
    this.playAnimation(this.ENDBOSS_ATTACK);
    this.otherDirection = false;
    this.moveEndboss();
    this.speed = 20;
    this.speedY = 0;
  }

  /**
   * Stops the given animation.
   * @param {number} animation - The ID of the animation to stop.
   */
  stopAnimation(animation) {
    clearInterval(animation);
  }

  /**
   * Checks if the character is within the alert distance of the boss.
   * @returns {boolean} True if the character is within the alert distance, false otherwise.
   */
  alertDistance() {
    return world.character.x > 3900 && world.character.x < 4149;
  }

  /**
   * Checks if the character is within the attack distance of the boss.
   * @returns {boolean} True if the character is within the attack distance, false otherwise.
   */
  attackDistance() {
    return world.character.x > 4150;
  }

  /**
   * Moves the end boss based on the position of the character.
   */
  moveEndboss() {
    if (this.x - world.character.x < 400 && this.x - world.character.x > -400) {
      if (this.x - world.character.x > 0) {
        this.moveLeft();
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
    } else if (!this.alertDistance() && !this.attackDistance()) {
      this.moveLeftRight();
    }
  }

  /**
   * Moves the end boss left or right based on its current position.
   */
  moveLeftRight() {
    if (this.x >= 4700) {
      this.direction = "left";
    } else if (this.x <= 4400) {
      this.direction = "right";
    }
    if (this.direction === "right") {
      this.moveRight();
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;
    }
  }
}
