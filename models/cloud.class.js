class Cloud extends MovableObject {
    y = 20;
    width = 1000;
    height = 700;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 60 + Math.random() * 720;
        this.animate();
        
    }

    animate(){
        setInterval(() => {
            this.x -= 0.3
        }, 1000 / 60);
        
    }
    
}