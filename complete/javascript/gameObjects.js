var SpaceShip = function(options){
  if( options ){
  this.image = options.image;
  this.x = options.x;
  this.y = options.y;
  this.speed = options.speed;
  }
}

SpaceShip.prototype.render = function() {
  var image_el = createImage(this.image)
  Game.ctx.drawImage(image_el, this.x, this.y);
}

var EnemyShip = function(options){
  this.__proto__.constructor(options)
  //SpaceShip.call(this,options);
  this.image = "images/enemyShip.png";
  this.speed = 0.1;
  this.hero = options.hero;
}

//EnemyShip.prototype = Object.create( SpaceShip.prototype );
EnemyShip.prototype = new SpaceShip();

EnemyShip.prototype.chase = function(){
  if (this.x < this.hero.x) {
    this.x += this.speed
  } else {
    this.x -= this.speed
  }
  if (this.y < this.hero.y) {
    this.y += this.speed
  } else {
    this.y -= this.speed
  }
}

EnemyShip.prototype.random_spawn = function(){
  var x_rand = randomInt(0,2);
  var y_rand = randomInt(0,2);

  if( x_rand == 0){
    //spawn from y
    this.x = randomInt( 0, Game.canvas.width );

    if( y_rand == 0){
      this.y = 0;
    }else{
      this.y = Game.canvas.height;
    }
  }else{
    //spawn from x
    this.y = randomInt( 0, Game.canvas.height );

    if( y_rand == 0){
      this.x = 0;
    }else{
      this.x = Game.canvas.width;
    }
  }
}

EnemyShip.prototype.checkTouch = function(){
  if (
      this.hero.x <= (this.x + 24)
      && this.x <= (this.hero.x + 24)
      && this.hero.y <= (this.y + 24)
      && this.y <= (this.hero.y + 24)
    ){
    return true;
  }
  return false;

}
var HeroShip = function(options){
  this.__proto__.constructor(options);
  //SpaceShip.call(this,options);

  this.image = "images/heroShip.png";

  this.speed = 4;
}

HeroShip.prototype = new SpaceShip();
//HeroShip.prototype = Object.create( SpaceShip.prototype );

HeroShip.prototype.move = function() {
  if (38 in Game.keysDown) { // Player holding up
    if (this.y > (-20)){
      this.y -= this.speed;
    } else {
      this.y = 718
    }
  }
  if (40 in Game.keysDown) { // Player holding down
    if (this.y < 728){
      this.y += this.speed;
    } else {
      this.y = 0
    }
  }
  if (37 in Game.keysDown) { // Player holding left
    if (this.x > (-20)){
      this.x -= this.speed;
    } else {
      this.x = 920
    }
  }
  if (39 in Game.keysDown) { // Player holding right
    if (this.x < (940)){
      this.x += this.speed;
    } else {
      this.x = 0
    }
  }
}

function createImage(url){
  new_image = new Image();
  new_image.src = url
  return new_image
}

function randomInt( min, max ){
  return Math.floor(Math.random() * (max - min)) + min;
}
