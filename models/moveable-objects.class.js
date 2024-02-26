class MoveableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  bossEnergy = 100;
  lastHit = 0;
  character;
  endboss;
  hurt_sound = audio[7];
  endBoss_hurt_sound = audio[6];
  canBeHit = true;
  bossLastHit = 0;

  /**
   * Applies gravity to the object, causing it to fall if it's above the ground.
   */
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

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 330;
    }
  }

  /**
   * Checks if the object is colliding with another moveable object.
   * @param {MoveableObject} mo - The other moveable object to check for collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    if (mo && mo.x !== undefined && mo.y !== undefined) {
      // let offsetTop = mo.offsetTop || 0;
      // let offsetBottom = mo.offsetBottom || 0;
      // let offsetLeft = mo.offsetLeft || 0;
      // let offsetRight = mo.offsetRight || 0;

      let moLeft = mo.x + mo.offsetLeft;
      let moRight = mo.x + mo.width - mo.offsetRight;
      let moTop = mo.y + mo.offsetTop;
      let moBottom = mo.y + mo.height - mo.offsetBottom;

      let thisLeft = this.x + this.offsetLeft;
      let thisRight = this.x + this.width - this.offsetRight;
      let thisTop = this.y + this.offsetTop;
      let thisBottom = this.y + this.height - this.offsetBottom;

      return (
        thisRight > moLeft &&
        thisBottom > moTop &&
        thisLeft < moRight &&
        thisTop < moBottom
      );
    }
  }

  /**
   * Reduces the object's energy by 1 and plays a hurt sound if the object still has energy.
   * Updates the time of the last hit.
   */
  hit() {
    this.energy -= 1;
    if (this.energy > 0) {
      this.hurt_sound.volume = 0.5;
      this.hurt_sound.play();
    }
    if (this.energy <= 0) {
      return (this.energy = 0);
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces the boss's energy by 20 and plays a hurt sound if the boss still has energy.
   * Updates the time of the last hit.
   */
  bossHit() {
    this.bossEnergy -= 20;
    if (this.bossEnergy > 0) {
      this.endBoss_hurt_sound.volume = 0.1;
      this.endBoss_hurt_sound.play();
    }
    if (this.bossEnergy <= 0) {
      this.bossEnergy = 0;
    } else {
      this.bossLastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the boss was hit within the last second.
   * @returns {boolean} True if the boss was hit within the last second, false otherwise.
   */
  isBossHurt() {
    let timePassed = new Date().getTime() - this.bossLastHit;
    let btimePassed = timePassed / 1000;
    return btimePassed < 1;
  }

  /**
   * Checks if the object was hit within the last second.
   * @returns {boolean} True if the object was hit within the last second, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead (i.e., its energy is 0).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation by cycling through a set of images.
   * @param {Array<string>} images - An array of paths to the images to use for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed to 30.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Resets the boss's energy to 100.
   */
  reset() {
    this.bossEnergy = 100;
    this.energy = 100;
  }
}
