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
  Game.heroShip.move();
  Game.heroShip.render()
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
    if( enemies[i].checkTouch() == true ){
       Game.over();
    }
  }
}

function newRandomEnemy() {
  var ship = new EnemyShip({hero:Game.heroShip});
  ship.random_spawn();
  return ship;
}

$(document).ready(function() {
  setUpGame();
  render();
});
