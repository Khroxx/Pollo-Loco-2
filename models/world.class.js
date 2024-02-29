class World {
  character = new Character();
  endboss = new Endboss();
  characterHealth = new CharacterHealth();
  bottlesAmount = new BottlesAmount();
  coinsAmount = new CoinsAmount();
  bossHealth = new BossHealth();

  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  bottles = level1.bottles;
  coins = level1.coins;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  throwableObjects = [];
  collectedBottles = 0;
  collectedCoins = 0;

  bottle_sound = audio[2];
  coin_sound = audio[3];
  gameWon_sound = audio[9];
  background_sound = audio[8];
  gameLost_sound = audio[10];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.spawnChickens();
  }

  /**
   * Resets the level by clearing and repopulating the arrays of bottles, coins, and enemies.
   */
  resetLevel() {
    this.level.bottles = [];
    for (let i = 0; i < 7; i++) {
      this.level.bottles.push(new Bottle());
    }
    this.level.coins = [];
    for (let i = 0; i < 5; i++) {
      this.level.coins.push(new Coin());
    }
    for (let i = 0; i < 3; i++) {
      this.level.enemies.push(new Chicken());
    }
    this.level.enemies.push(new Endboss());
    for (let i = 0; i < 3; i++) {
      this.level.enemies.push(new ChickenSmall());
    }
  }

  /**
  * Spawns chickens when the boss is in alert mode.
  */
  spawnChickens() {
    if (this.character.x > 3900 && !this.chickenSpawnInterval) {
      this.chickenSpawnInterval = setInterval(() => {
      this.level.enemies.push(new Chicken(5000));
      }, 4000);
    }
  }

  /**
   * Restarts the game by resetting energies and the level, running the game, and pausing any game over sounds.
   */
  restartGame() {
    this.resetEnergies();
    this.resetLevel();
    this.run();
    this.gameWon_sound.pause();
    this.gameLost_sound.pause();
    this.background_sound.play();
    this.background_sound.volume = 0.05;
  }

  /**
   * Resets the energies of all enemies and the character.
   */
  resetEnergies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.reset();
        world.bossHealth.setPercentage(100);
      }
    });
    this.character.resetCharacterEnergy();
  }

  /**
   * Displays the game won screen and plays the game won sound.
   */
  gameWon() {
    let wonScreen = document.getElementById("gameWonScreen");
    wonScreen.style.display = "flex";
    this.background_sound.pause();
    this.gameWon_sound.play();
    this.gameWon_sound.volume = 0.3;
  }

  /**
   * Displays the game lost screen and plays the game lost sound.
   */
  gameLost() {
    let lostScreen = document.getElementById("gameLostScreen");
    lostScreen.style.display = "flex";
    this.background_sound.pause();
    this.gameLost_sound.play();
    this.gameLost_sound.volume = 0.3;
  }

  /**
   * Sets the world property of the character and all enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Starts the game by continuously checking for collisions and thrown objects.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsWithBottles();
      this.checkCollisionsWithCoins();
      this.checkThrowObjects();
      this.checkCollisionsWithThrowables();
      this.spawnChickens();
    }, 50);
  }

  /**
   * Checks if the throw key is pressed and if there are any bottles to throw.
   */
  checkThrowObjects() {
    if (
      this.keyboard.THROW &&
      this.collectedBottles > 0 &&
      this.endboss.energy > 0
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100,
        this.bottlesAmount
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.keyboard.THROW = false;
    }
  }

  /**
   * Checks for collisions between the character and all enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isAboveGround()) {
          this.character.hit();
          this.characterHealth.setPercentage(this.character.energy);
        } else if (this.character.isAboveGround() && this.character.speedY < 0 && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
          enemy.die();
          this.character.speedY = 15;
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and all bottles.
   */
  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.removeBottle(bottle);
      }
    });
  }

  /**
   * Checks for collisions between all throwable objects and all enemies.
   */
  checkCollisionsWithThrowables() {
    this.throwableObjects.forEach((throwableObject) => {
      if (!throwableObject.collidedWithEndBoss) {
        this.level.enemies.forEach((enemy) => {
          if (throwableObject.isColliding(enemy)) {
            throwableObject.splashBottle();
            this.handleChickenCollision(throwableObject, enemy);
            this.handleEndbossCollision(throwableObject, enemy);
          }
        });
      }
    });
  }

  /**
   * Handles the collision between a throwable object and a chicken or small chicken.
   */
  handleChickenCollision(throwableObject, enemy) {
    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
      enemy.die();
    }
    setTimeout(() => {
      this.removeThrowableObject(throwableObject);
    }, 200);
  }

  /**
   * Handles the collision between a throwable object and the end boss.
   */
  handleEndbossCollision(throwableObject, enemy) {
    if (enemy instanceof Endboss) {
      throwableObject.collidedWithEndBoss = true;
      this.bossHealth.percentage -= 20;
      this.bossHealth.setPercentage(this.bossHealth.percentage);
      this.endboss.bossHit();
      setTimeout(() => {
        this.removeThrowableObject(throwableObject);
      }, 200);
    }
  }

  /**
   * Checks for collisions between the character and all coins.
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.removeCoin(coin);
      }
    });
  }

  /**
   * Removes a throwable object from the array of throwable objects.
   */
  removeThrowableObject(throwableObject) {
    let index = this.throwableObjects.indexOf(throwableObject);
    if (index !== -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Removes a bottle from the array of bottles and plays the bottle collection sound.
   */
  removeBottle(bottle) {
    let index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.bottlesAmount.collectBottle();
      this.level.bottles.splice(index, 1);
      this.collectedBottles++;
      this.bottle_sound.volume = 0.5;
      this.bottle_sound.play();
    }
  }

  /**
   * Removes a coin from the array of coins and plays the coin collection sound.
   */
  removeCoin(coin) {
    let index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.coinsAmount.collectCoin();
      this.level.coins.splice(index, 1);
      this.collectedCoins++;
      this.coin_sound.volume = 0.5;
      this.coin_sound.play();
    }
  }

  /**
   * Draws all objects on the canvas and updates the canvas for the next frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.bossHealth);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles.filter((bottle) => !bottle.removed));
    this.addObjectsToMap(this.level.coins.filter((coins) => !coins.removed));
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottlesAmount);
    this.addToMap(this.coinsAmount);
    this.addToMap(this.characterHealth);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.turnLeft(mo);
    }
    mo.draw(this.ctx);

    // frame around the object
    //mo.drawFrame(this.ctx);

    // frame around the object with offset // will be deleted after completion
    // mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.turnRight(mo);
    }
  }

  /**
   * Flips an object's image horizontally to the left.
   */
  turnLeft(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  
  /**
   * Flips an object's image horizontally to the right.
   */
  turnRight(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
