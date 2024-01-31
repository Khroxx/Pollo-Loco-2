class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObject = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
           this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects(){
        if (this.keyboard.F){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions(){
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.isHurt();
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
            };
        });
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        //space for fixed object
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        //fixed space end

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds) ;
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.turnLeft(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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