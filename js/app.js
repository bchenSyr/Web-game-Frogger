 /* app.js : game logic
  * Author: Beier Chen
  * Source: https://github.com/udacity/frontend-nanodegree-arcade-game
  * Release Date: Jan 2, 2018
  * Application: Udacity Front-End Nanodegree Arcade Game Project
  */

// ---< Enemy class >---
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {

  //每一次的移动乘以 dt 参数，以保证游戏在所有的电脑上以同样的速度运行
  var move = 100 * dt * getRandomInt(1,3);
  this.x += move;

  if(this.x > 505){
    this.x = 0;
  }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ---< Player class >---
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.start = false;
    this.triumph = false;
    this.triumphCount = 0;
    this.score = 0;
    this.selector = 0;
    this.lifeCount = 3;

    this.selectorImg = 'images/Selector.png';
    this.lifeImg = 'images/Heart.png';
};

Player.prototype.update = function() {

  if(this.start === false){
    switch (this.selector) {
      case 0: this.sprite = 'images/char-boy.png'; break;
      case 1: this.sprite = 'images/char-pink-girl.png'; break;
      case 2: this.sprite = 'images/char-cat-girl.png'; break;
      case 3: this.sprite = 'images/char-horn-girl.png'; break;
      case 4: this.sprite = 'images/char-princess-girl.png'; break;
      default: this.sprite = 'images/char-boy.png'; break;
    }
  }

  if(this.lifeCount < 1){
    this.score = 0;
    this.start = false;
    this.x = 200;
    this.y = 380;

    this.triumph = false;
    this.triumphCount = 0;
  }

  if(this.triumph === true) {
    this.x = 200;
    this.y = 380;
    this.triumph = false;
    this.triumphCount ++;
    this.score += 10;

    gem1 = new Gem();
    gem2 = new Gem();
    gem3 = new Gem();

    allGems = [gem1, gem2, gem3];
  }
};

Player.prototype.render = function() {
    if (this.start === false) {
      ctx.drawImage(Resources.get(this.selectorImg), this.x, this.y);
    }
    else{
      ctx.fillStyle = "White";
      ctx.fillRect(180, 600, 400, 100);

      var count = this.lifeCount;
      while(count > 0){
        var dis = count * 70;
        ctx.drawImage(Resources.get(this.lifeImg), (150 + dis), 560);
        count--;
      }
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

  if(this.start === false){

    if(key === 'left'){
      if(this.selector > 0) this.selector--;
    }
    else if(key === 'right'){
      if(this.selector < 5) this.selector++;
    }
    else if(key === 'enter'){
      this.start = true;
      this.lifeCount = 3;
    }
  }
  else {
    if(key === 'left'){
      if(this.x > 0) this.x -= 100;
    }
    else if(key === 'right'){
      if(this.x < 400) this.x += 100;
    }
    else if(key === 'up'){
      if(this.y > 60) {
        this.y -= 80;
      }
      else if(this.y === 60) {
        this.triumph = true;
      }
    }
    else if(key === 'down'){
      if(this.y < 380) this.y += 80;
    }
  }

};

// ---< Gem class >---
var Gem = function(){
  this.x =  getRandomInt(0, 5) * 100;
  this.y =  getRandomInt(0, 4) * 80 + 60;
  this.color = getRandomInt(1, 4);

  this.blue = 'images/Gem-Blue.png';
  this.green = 'images/Gem-Green.png';
  this.orange = 'images/Gem-Orange.png';
}

Gem.prototype.render = function() {
  if(this.color === 1){
      ctx.drawImage(Resources.get(this.blue), this.x, this.y);
  }
  else if(this.color === 2){
      ctx.drawImage(Resources.get(this.green), this.x, this.y);
  }
  else{
    ctx.drawImage(Resources.get(this.orange), this.x, this.y);
  }
};

// 实例化所有对象
var gem1 = new Gem();
var gem2 = new Gem();
var gem3 = new Gem();

var allGems = [gem1, gem2, gem3];

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200,380);

// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var enemy1 = new Enemy(100,60);
var enemy2 = new Enemy(0,140);
var enemy3 = new Enemy(300,220);
var enemy4 = new Enemy(100,220);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

function getRandomInt(min, max) {
  //The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()方法
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
