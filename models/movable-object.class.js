class MovableObject {
    x = 40;
    y = 330;
    height = 300;
    width = 150;
    img;
    imageCache = {};

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]= img;
        });

    }
    moveRight() {
        
    }
    moveLeft() {

    }
}