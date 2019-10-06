// Enemies our player must avoid
var Enemy = function(x, y) { //ENEMY CONSTRUCTOR
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;        
    this.y = y;       
    this.speed = 0;
    while(this.speed === 0){  //let the speed of the enemys random but not 0
      this.speed = Math.floor(Math.random() * 10);
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//this function got called at line 94 in the 'engine.js'

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed;
     if (this.x > 500) {
     this.x = -100;
   }
 };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};                                                                       

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){  //Player constructor
    this.sprite = 'images/char-boy.png';
    this.x = 210;
    this.y = 450;
    //this.speed = speed;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      
};

Player.prototype.update = function(dt) {
    
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case "up":
          if(this.y > 0){
            this.y -= 50;}
          break;
        case "down":
          if(this.y < 400){
            this.y += 50;}
          break;
        case "left":
          if(this.x > 10){
            this.x -= 50;}
          break;
        case "right":
          if(this.x < 400){
            this.x += 50;}
          break;
      }

      if((this.y === 0) && (allGems.length === 0)){
        console.log("Congrats!!"); 
        let congrats = document.querySelector(".congrats");
        clearInterval(counter);
        congrats.innerHTML = `<h2>Congratulations</h2><br><h3>You won in ${min} min and ${sec} sec and these are your Gems!</h3>`;
        congrats.innerHTML += `<img src="${gem1.sprite}" height="65" width="42">`;   //How to do it by loop ???
        congrats.innerHTML += `<img src="${gem2.sprite}" height="65" width="42">`;
        congrats.innerHTML += `<img src="${gem3.sprite}" height="65" width="42"><br><br>`;
        congrats.innerHTML += `<a class="replay" onclick="replay()">Play Again</a>`;
    
        congrats.style.display = "block";
      }
      console.log(`x=${this.x} y=${this.y}`);
      
 };

var Gem = function() { //Gem constructor
  
  var xList = [0,100, 200, 300, 400];   
  var yList = [50, 150, 130, 230, 250, 330, 350];
  var colors = ["blue", "green", "orange"];
  this.sprite = `images/gem-${colors[Math.floor(Math.random() * colors.length)]}.png`;
  this.x = xList[Math.floor(Math.random() * xList.length)];   //to colors them randomly    
  this.y = yList[Math.floor(Math.random() * yList.length)];  //and place the gems randomly 
  this.width = 100;
  this.height = 110; 
};

Gem.prototype.render = function() {
  // to make gems small or big, we have to scale them
  // scaling in canvas will affect all objects
  // that is why we need to save the current context
  // then modify the scale, draw the gem, then quickly
  // revert the scale back to what it was before.
  // this is done using ctx.save() and ctx.restore()

  ctx.save();
  
  
  ctx.scale(0.5,0.5);   // the value 0.5 here is half the actual size of the image
                        // you can pick any value, even greater than 1 but that will make it bigger
   // move the drawing pen to the gem's center
  ctx.translate(this.x,this.y);                     
                        
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.restore();
};

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Place all gem objects in an array called allGems
let allGems = [];   // this should be an array, not a set
makeObjs();

function replay(){
  document.querySelector(".congrats").style.display = "none";
  player.x = 210;
  player.y = 450;
  sec = 0;
  min = 0;
  counter = setInterval(function secs(){
    if(sec <= 58){
        sec += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
    else {
        sec = 0;
        min += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;
    }
  }, 1000);
  allEnemies = [];
  makeObjs();
}

var gem1;
var gem2;
var gem3;

// Now instantiate your objects.
function makeObjs(){
// Place gems objects 
gem1  = new Gem();
gem2  = new Gem();
allGems.push(gem1);
allGems.push(gem2);
allGems.push(gem3 = new Gem());

var enemy1 = new Enemy(200,270);  //y will determinr its row
var enemy2 = new Enemy(100,130); //to Do:make "y" random
allEnemies.push(enemy1);
allEnemies.push(enemy2);

};

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
 
//the function that sets the timer 
let timeSpan = document.querySelector(".timer");
let sec = 0;
let min = 0;
let counter = setInterval(function secs(){
    if(sec <= 58){
        sec += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
    else {
        sec = 0;
        min += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
        
    }, 1000);
