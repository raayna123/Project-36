//Create variables here
var dog, happyDogImg, database, foodS, foodStock, feedTime, game;
var dogImg, dogImg2;
var bedroomImg, gardenImg, washroomImg;
var gameState = "";
var button1, button2, input;
//var foods = 0;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomImg = loadImage("images/BedRoom.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/WashRoom.png");
  
}

function setup() {
  database = firebase.database();

  createCanvas(700, 500);
  dog = createSprite(550, 170, 10, 10);
  dog.addImage("dogImg", dogImg);
  dog.scale = 0.2;

  // foodStock = database.ref("Food")
  // foodStock.on("value", readStock, showError);

  food = new Food();
  food.getFoodStock();
  food.getFeedTime();

  game = new Game();
  game.getState();

  var title = createElement("h2");
  title.html("Virtual Pet");
  title.position(130, 0);

  input = createInput("Name Your Dog");
  input.position(970, 300);

  button1 = createButton("feed Dog");
  button1.position(850, 70);

  button1.mousePressed(function() {
    food.deductFood();
    dog.addImage("dogImg", happyDogImg);
  })

  button2 = createButton("add Food");
  button2.position(750, 70);

  button2.mousePressed(function() {
  food.addFood();
  })
  
}


function draw() {  
  background(46, 139, 87);


  stroke("blue");
  fill("white");
  textSize(18);
  if(foodS){
    text("Food Remaing :- " + foodS, 150, 120);
  }

  if(gameState !== "Hungry") {
    button1.hide();
    button2.hide();
    input.hide();
    console.log("hduhdi");
    dog.visible = false;
    // dog.remove();
  } else { 
    button1.show();
    button2.show();
    input.show();
    console.log("fkwj");
    // dog.addImage(happyDogImg);
    dog.visible = true;
  }
  
  if(feedTime) {
    var feedHour = feedTime.slice(16, 18);
     currentTime = hour();
     console.log(currentTime);
     console.log(+feedHour + 1);
     if(currentTime == (+feedHour + 1)) {
      game.update("playing");
       food.garden();
     } else if(currentTime == (+feedHour + 2)) {
      game.update("sleeping");
       food.bedroom();
     } else if(currentTime > (+feedHour + 2) && currentTime <= (+feedHour + 4)) {
      game.update("bathing");
       food.washroom();
     } else {
      game.update("Hungry");
       food.display();
       dog.addImage(happyDogImg);
     }

   }
  

  food.display();

  showTime();

  drawSprites();
  

}

function writeStock(x){
  if(x <= 0) {
    x = 0;
  } else {
    x = x -1;
  }
  database.ref("/").set({
      Food: x
  })

}

function readStock(data) {
  foodS = data.val();
  //console.log(foodS);
}

function showError() {
  //console.log("there is a error reading the values");
}

function showTime() {
  //console.log(feedTime);
  stroke("blue");
  fill("white");
  textSize(18);
  if(feedTime) {
    text("Last Feed Time :- " + feedTime, 25, 75);
  }
}


