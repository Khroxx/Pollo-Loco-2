let level1;
initLevel();

/**
 * Initializes the first level of the game.
 * empty functions will get filled when starting/restarting the game.
 */
function initLevel(){
  level1 = new Level(
    createBackground(),
    createEnemies(),
    createClouds(),
    createBottles(),
    createCoins()
  );
}

/**
 * Creates the background objects for the level.
 * @returns {BackgroundObject[]} An array of background objects.
 */
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

/**
 * Creates the enemies for the level.
 * @returns {Enemy[]} An array of enemy objects.
 */
function createEnemies(){
  return []
}

/**
 * Creates the clouds for the level.
 * @returns {Cloud[]} An array of cloud objects.
 */
function createClouds() {
  return [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ];
}

/**
 * Creates the bottles for the level.
 * @returns {Bottle[]} An array of bottle objects.
 */
function createBottles() {
  return [];
}

/**
 * Creates the coins for the level.
 * @returns {Coin[]} An array of coin objects.
 */
function createCoins() {
  return [];
}




