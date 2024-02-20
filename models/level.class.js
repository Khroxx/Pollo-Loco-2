class Level{
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 3920;

    constructor(backgroundObjects, enemies, clouds, bottles, coins){
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
    }
}

