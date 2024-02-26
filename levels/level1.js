// let endboss = new Endboss();
let level1;
initLevel();
function initLevel(){
  level1 = new Level(
    createBackground(),
    createEnemies(),
    createClouds(),
    createBottles(),
    createCoins()
  );
}

function createBackground(){  
  return [
    new BackgroundObject("img/5_background/layers/air.png", -1279),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -1279),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -1279),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -1279),

    new BackgroundObject('img/5_background/layers/air.png', 0, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
    new BackgroundObject('img/5_background/layers/air.png', 1279, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1279, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1279, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1279, 0),

    new BackgroundObject('img/5_background/layers/air.png', 2558, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2558, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2558, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2558, 0),
    new BackgroundObject('img/5_background/layers/air.png', 3837, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3837, 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3837, 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3837, 0)
  ];
}

function createEnemies(){
  return [
  //  new Chicken(), 
  //  new Chicken(), 
  //  new Chicken(),
  //  new Chicken(), 
  //  new Chicken(), hinzufügen wenn Spiel zum Abgeben
  //  new ChickenSmall(),
  //  new ChickenSmall(),
  //  new ChickenSmall(),
  //  new ChickenSmall(),
  //  new ChickenSmall(),
  ],

  [
    // new Endboss()
  ];
}

function createClouds() {
  return [
    // new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ];
}

function createBottles() {
  return [
    // new Bottle(),
    // new Bottle(),
    // new Bottle(),
    // new Bottle(),
    // new Bottle(),
    // new Bottle(),
    // new Bottle(),
  ];
}

function createCoins() {
  return [
  // new Coin(),
  // new Coin(),
  // new Coin(),
  // new Coin(),
  // new Coin(),
];
}




