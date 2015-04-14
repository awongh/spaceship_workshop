var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")
      heroShip = new HeroShip({
          x:300,
          y:300,
          image:"images/heroShip.png",
          speed: 4
        }),
      enemies =  [new EnemyShip({
        x: 0,
        y: 0,
        image:"images/enemyShip.png",
        speed: 2,
        hero: heroShip
      })],
      spaceImg = createImage("images/spaceBG.png");
  canvas.width = 912;
  canvas.height = 718;


  return {
    over : function(){
      var that = this;
      this.is_over = true
      var blink = true;
      setInterval(function(){
        that.ctx.font = "60px Helvetica";
        that.ctx.fillText("GAME OVER", 275, 300);
        blink = !blink
        var color = blink ? "#000000" : "#ffffff";
        that.ctx.fillStyle = color;
      },1000)



    },

    restart_game : function(){

    },

    canvas: canvas,
    coinsCollected: 0,
    ctx: ctx,
    enemies: enemies,
    heroShip: heroShip,
    keysDown: {},
    is_over: false,
  };
}());
