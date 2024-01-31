class MovableObject extends DrawableObject{
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;




    //apllies gravity to object
    applyGravity(){
        setInterval(() => {
            if(this.aboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = this.speedY;
            }
        }, 1000 / 25);    
    }

    //detects if object is above set ground
    aboveGround(){
        if(this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 330;
        }
 
    }

    // Pepe collides with object
    isColliding (mo) { // obj falls untere wieder geht
        return  this.x + this.width > mo.x && 
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height
        // (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
        //         (this.y + this.offsetY + this.height) >= obj.y &&
        //         (this.y + this.offsetY) <= (obj.y + obj.height) && 
        //         obj.onCollisionCourse; 
    }

    //moves object to the right
    moveRight() {
        this.x += this.speed;
    }

    //moves object to the left
    moveLeft() {
        this.x -= this.speed;
    }

    // object jumps with acceleration of speedY
    jump(){
        this.speedY = 30;
    }

    //cicles through all images of array to animate object
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    hit(){
        this.energy -= 5; 
        if (this.energy <= 0){
            this.energy = 0
        } else {
            this.lastHit =  new Date().getTime();
        }
    }

    isDead(){
        return this.energy == 0;
    }


    //difference between the current time and the last time the object was hit, can only be hurt again after 5 seconds
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
}