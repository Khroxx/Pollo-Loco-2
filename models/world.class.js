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
    gameLost_sound = audio[10];
    
  
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
    }
  
    resetLevel() {
      this.level.bottles = [];
  
      for (let i = 0; i < 8; i++) {
        this.level.bottles.push(new Bottle());
      }
  
      this.level.coins = [];
  
      for (let i = 0; i < 1; i++) {
        this.level.coins.push(new Coin());
      }
  
      // this.level.enemies = [endboss];
  
      for (let i = 0; i < 5; i++) {
        this.level.enemies.push(new Chicken());
      }
  
      for (let i = 0; i < 3; i++) {
        this.level.enemies.push(new ChickenSmall());
      }
    }
  
    restartGame() {
      this.resetEnergies();
      this.resetLevel();
      this.run();
      this.gameWon_sound.pause();
      this.gameLost_sound.pause();
    }
  
    resetEnergies() {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
          enemy.reset();
        }
      });
  
      this.character.resetCharacterEnergy();
    }
  
    gameWon() {
      let wonScreen = document.getElementById("gameWonScreen");
      wonScreen.style.display = "flex";
      this.gameWon_sound.play();
      this.gameWon_sound.volume = 0.3;
    }
  
    gameLost() {
      this.endboss.deathAnimation();
      let lostScreen = document.getElementById("gameLostScreen");
      lostScreen.style.display = "flex";
      this.gameLost_sound.play();
      this.gameLost_sound.volume = 0.3;

    }
  
    setWorld() {
      this.character.world = this;
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
          enemy.world = this;
        }
      });

    }
  
    run() {
      setInterval(() => {
        this.checkCollisions();
        this.checkCollisionsWithBottles();
        this.checkCollisionsWithCoins();
        this.checkThrowObjects();
        this.checkCollisionsWithThrowables();
      }, 50);
    }
  
    checkThrowObjects() {
      if (this.keyboard.THROW && this.collectedBottles > 0 && this.endboss.endBossEnergy > 0) {
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.bottlesAmount);
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        this.keyboard.THROW = false;
      }
    }
  
    checkCollisions() {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (!this.character.isAboveGround()) {
            this.character.hit();
            this.characterHealth.setPercentage(this.character.energy);
          } else if (this.character.isAboveGround() &&this.character.speedY < 0 &&(enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
            enemy.die();
          }
        }
      });
    }
  
    checkCollisionsWithBottles() {
      this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
          this.removeBottle(bottle);
        }
      });
    }
  
    checkCollisionsWithThrowables() {
      this.throwableObjects.forEach((throwableObject) => {
        if (!throwableObject.collidedWithEndBoss) {
          this.level.enemies.forEach((enemy) => {
            if (throwableObject.isColliding(enemy)) {
              throwableObject.collidedWithEndBoss = true;
              throwableObject.splashBottle();
              setTimeout(() => {
                this.removeThrowableObject(throwableObject);
              }, 200);
              if (enemy instanceof Endboss) {
                this.bossHealth.percentage -= 20;
                this.bossHealth.setPercentage(this.bossHealth.percentage);
                this.endboss.endBossHurt();
                // this.endboss.youWin();
              }
            }
          });
        }
      });
    }
  
    checkCollisionsWithCoins() {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          this.removeCoin(coin);
        }
      });
    }
  
    removeThrowableObject(throwableObject) {
      const index = this.throwableObjects.indexOf(throwableObject);
      if (index !== -1) {
        this.throwableObjects.splice(index, 1);
      }
    }
  
    removeBottle(bottle) {
      const index = this.level.bottles.indexOf(bottle);
      if (index !== -1) {
        this.bottlesAmount.collectBottle();
        this.level.bottles.splice(index, 1);
  
        this.collectedBottles++;
        this.bottle_sound.volume = 0.5;
        this.bottle_sound.play();
      }
    }
  
    removeCoin(coin) {
      const index = this.level.coins.indexOf(coin);
      if (index !== -1) {
        this.coinsAmount.collectCoin();
        this.level.coins.splice(index, 1);
  
        this.collectedCoins++;
        this.coin_sound.volume = 0.5;
        this.coin_sound.play();
      }
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.ctx.translate(this.camera_x, 0);
  
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.bossHealth);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.bottles.filter((bottle) => !bottle.removed));
      this.addObjectsToMap(this.level.coins.filter((bottle) => !bottle.removed));
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
  
    addObjectsToMap(objects) {
      objects.forEach((o) => {
        this.addToMap(o);
      });
    }
  
    addToMap(mo) {
      if (mo.otherDirection) {
        this.turnLeft(mo);
      }

      mo.draw(this.ctx);
      // frame around the object
      //mo.drawFrame(this.ctx);  
      // frame around the object with offset
      //mo.drawOffsetFrame(this.ctx);  

      if (mo.otherDirection) {
        this.turnRight(mo);
      }
    }
  

    turnLeft(mo){
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

  turnRight(mo){
      mo.x = mo.x * -1;
      this.ctx.restore();
  }

  }
  