

var monkey, jungle, monkeyWalking, jungleImage;
var score = 0;
var gameState = "play";
var size;

  

function preload(){
  
monkeyWalking = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png",  "Monkey_10.png");
  
  jungleImage = loadImage("jungle2.jpg");
  
  bananaImage = loadImage("Banana.png");
  
  rockImage = loadImage("stone.png")
  
}

function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200, 200, 400, 400);
  jungle.addImage("jungle", jungleImage);
  
  monkey = createSprite(30, 370, 20, 20);
  monkey.addAnimation("monkey", monkeyWalking);
  monkey.scale = 0.10;

  bananaGroup = new Group();
  rockGroup = new Group();
}

function draw() {
  
  background("white");
  size = monkey.scale;
  jungle.velocityX = -3;
  
  if (jungle.x <= 100){
  jungle.x = jungle.width/2;
  }


  
        if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
          monkey.scale = size+0.01;
      score = score+2;
    } 
    
    if (rockGroup.isTouching(monkey)){
      //gameState = "end";
      rockGroup.destroyEach();
      monkey.scale = size-0.01;
    }
  edges = createEdgeSprites();
     monkey.collide(edges[3]);
     
  if (gameState === "play"){
   createRocks(); 
   bananas();
   monkey.visible = true;
   
   monkey.velocityY = monkey.velocityY + 0.8;
   
   if (keyDown("space") && monkey.y >= 350){
     monkey.velocityY = -15;
   }
  } 
  
  if (gameState === "end"){
    text("PRESS R TO START", 120, 200);
    score = 0;
    monkey.y = 370;
    
          monkey.visible = false;
          
    if (keyDown("r")){
      gameState = "play";
    }
  }
  
  drawSprites();
  
    
  textSize(20);
  textFont("Jokerman");
  text("Score: " + score, 250, 40);
}

function createRocks(){
  if (frameCount % 100 === 0){
    var rock = createSprite(400, 360, 40, 40);
    rock.scale = 0.15;
    rock.addImage("stone", rockImage);
    rock.velocityX = -7;
    rock.lifetime = 400;
    rockGroup.add(rock);
  }
}

  function bananas (){
    if (frameCount % 100 === 0){
      var banana = createSprite(400, 250, 20, 10);
      banana.scale = 0.05;
      banana.velocityX = -7;
      banana.addImage("banana", bananaImage);
      banana.lifetime = 400;
      bananaGroup.add(banana);
    }
  }