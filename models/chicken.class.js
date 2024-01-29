class Chicken extends MovableObject {
    height = 100;
    width = 90;
    y = 525;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 500 + Math.random() * 4000;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();
    }
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}