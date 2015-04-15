var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      heroShip = new HeroShip({
          x:300,
          y:300
        }),
      enemies =  [new EnemyShip({
        x: 0,
        y: 0,
        hero: heroShip
      })];

  canvas.width = 950;
  canvas.height = 730;

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

    canvas: canvas,
    coinsCollected: 0,
    ctx: ctx,
    enemies: enemies,
    heroShip: heroShip,
    keysDown: {},
    is_over: false,
  };
}());
