class Cloud extends MoveableObject {
    y = 20;
    height = 700;
    width = 1000;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 60 + Math.random() * 4000;
        this.animate();

    }

    animate(){
        setInterval(() => {
            this.x -= this.speed;
          }, 1000 / 40);

        this.moveLeft();
    }

}