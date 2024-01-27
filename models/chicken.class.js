class Chicken extends MovableObject {
    height = 100;
    width = 75;
    y = 525;

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 60 + Math.random() * 720;

        
    }
}