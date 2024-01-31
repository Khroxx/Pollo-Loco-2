class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png'
    ];
    health = 100;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setHealth(100);
        this.x = 0;
        this.y = -20;
        this.width = 500;
        this.height = 100;
    }

    setHealth(health) {
        this.health = health;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
        
    }
    resolveImageIndex(){
        if(this.health == 100){
            return 0;
        } if (this.health > 80){
            return 1;
        } if (this.health > 60){
            return 2;
        } if (this.health > 40){
            return 3;
        } if (this.health > 20){
            return 4;
        } else {
            return 5
        }
    }
}