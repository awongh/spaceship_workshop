////Functions run on load
function setUpGame() {
  createKeyListenerController()

  window.setInterval(function() {
    Game.enemies.push(newRandomEnemy())
  }, 2000)

  $("#game").html(Game.canvas)
}

function render() {
  if (Game.is_over) {
    return
  }

  //clear everything away
  Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

  //redraw
  moveHero() //moved via keyboard input
  moveEnemies() //enemies chase hero, also checks if enemies have caught hero

  requestAnimationFrame(render);
}

/////Set Up Game functions
function createKeyListenerController() {
  window.addEventListener("keydown", function (e) {
    Game.keysDown[e.keyCode] = true;
  }, false);

  window.addEventListener("keyup", function (e) {
    delete Game.keysDown[e.keyCode];
  }, false);
}

function moveEnemies() {
  var enemies = Game.enemies;
  for (var i = 0, enemiesLength = enemies.length; i < enemiesLength; i++) {
    enemies[i].chase()
    enemies[i].render()
    if( checkEnemyTouch(enemies[i]) == true ){
       Game.over();
    }
  }
}

function moveHero() {
  var heroShip = Game.heroShip;
  heroShip.move();
  heroShip.render()
}

function newRandomEnemy() {
  var options = [];
  options.x = randomInt( 0, Game.canvas.width );
  options.y = randomInt( 0, Game.canvas.height );
  options.image = "images/enemyShip.png"
  options.speed = 3
  options.hero = Game.heroShip
  return new EnemyShip(options)
}

function checkEnemyTouch(enemy) {
  var heroShip = Game.heroShip;
  if (
      heroShip.x <= (enemy.x + 24)
      && enemy.x <= (heroShip.x + 24)
      && heroShip.y <= (enemy.y + 24)
      && enemy.y <= (heroShip.y + 24)
    ){
    return true;
  }
  return false;
}

function randomInt( min, max ){
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function() {
  setUpGame();
  render();
});
