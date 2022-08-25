var gameState = "Start"
var startPage, bg1, startbtn, startImg
var coinImg
 var score=0;
 var ground
function preload(){
    flappyBirdAnimation=loadAnimation("flappy bird1.png", "flappy bird2.png", "flappy bird3.png" );
    flappyCollidedImg=loadAnimation("flappy bird4.png")
    startPage=loadImage("startPage.png")
    startImg=loadImage("start.png")
    dayBg=loadImage("bg.png")
    pipe1=loadImage("pipe1.png")
    pipe2img=loadImage("pipe2.png")
    nestImg=loadImage("nest.png")
    coinImg=loadImage("coins.png")
    gameOverImg=loadImage("gameOver.png")
    coinCollectSound=loadSound("collectCoin.mp3")
    gameOverSound=loadSound("gameOversound.mp3")
    bgSound=loadSound("background.wav")
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    bg1=createSprite(width/2, height/2);
    bg1.addImage(startPage)
    bgSound.loop()
    startbtn=createSprite(width/2,height/2+60);
    startbtn.addImage(startImg)
    startbtn.scale=2.5
    bg2=createSprite(width/2, height/2);
    bg2.addImage(dayBg)
    bg2.scale=3
    bg2.visible=false;
    gameOver=createSprite(width/2, height/2)
    gameOver.addImage(gameOverImg)
    gameOver.scale=3
    gameOver.visible=false;
    flappyBird=createSprite(100, height/2)
    flappyBird.addAnimation("flyingBird", flappyBirdAnimation)
    flappyBird.addAnimation("flappyBirdC", flappyCollidedImg)
    flappyBird.scale=2
    flappyBird.visible=false;
    nest=createSprite(width-40,height/2)
    nest.addImage(nestImg)
    //nest.debug=true
    nest.setCollider("circle",0,0,40)
    nest.scale=0.5
    nest.visible=false
    edges=createEdgeSprites()
    pipeGroup=new Group()
    pipe2Group= new Group()
    coinGroup= new Group()
    
}

function draw(){
    background("white")
   
    ground = createSprite(width/2, height, width-300, 20)
    ground.visible=false;
    ground.shapeColor="yellow"
if (gameState=="Start"){
    if (mousePressedOver(startbtn)){
        gameState="play";
    }
}

if (gameState=="play"){
    bg1.visible=false;
    startbtn.visible=false;
    bg2.visible=true;
    flappyBird.visible=true;
    nest.visible=true
    spawnPipes()
    spawnPipes2()
    spawnCoins()
  bg2.velocityX=-5
  flappyBird.collide(edges[1])
  if (bg2.x<0){
    bg2.velocityX=0;
    if (keyDown("RIGHT_ARROW")){
        flappyBird.x+=5;
    }
  }
    if (keyDown("space")){
        flappyBird.velocityY=-8
    }
    flappyBird.velocityY+=0.8
    if(flappyBird.isTouching(nest)){
        flappyBird.velocityY=0
        flappyBird.velocityX=0
        pipeGroup.setVelocityXEach(0)
        pipe2Group.setVelocityXEach(0)
        coinGroup.destroyEach()
        coinGroup.setVelocityXEach(0)
        pipeGroup.destroyEach()
        pipe2Group.destroyEach()
        win()
        
    }

    for(var c=0;c<coinGroup.length;c++){
        if (flappyBird.isTouching(coinGroup)){
            coinGroup.get(c).remove()
                score=score+5
                coinCollectSound.play()
            
        }
    }


    nest.depth=flappyBird.depth
    flappyBird.depth+=1

    if (flappyBird.isTouching(pipeGroup)||flappyBird.isTouching(pipe2Group)||flappyBird.y>=630){
      
        gameState="end"
        gameOverSound.play()
        gameOver1()
    }
    
}
    drawSprites()
    fill ("orange")
    textSize(20)
    text("Score: "+score,50,50)
    if (gameState=="end"){
        flappyBird.changeAnimation("flappyBirdC")
        flappyBird.y=630
        flappyBird.scale=0.3
        flappyBird.velocityY=10
        coinGroup.destroyEach()
        pipeGroup.destroyEach()
        pipe2Group.destroyEach()
        gameOver.visible=true
        bgSound.stop()
        
        
    }
}

function spawnPipes(){
    if (frameCount%60==0){
       var pipe=createSprite(width, random(-100,100), 20, random(100,600))
       pipe.addImage(pipe1)
        pipe.velocityX=-5
        pipe.scale=3
        pipe.lifetime=800
        pipeGroup.add(pipe)
    }

}

function spawnPipes2(){
    if (frameCount%120==0){
       var pipe2=createSprite(width, random(700,500), 20, random(100,600))
       pipe2.addImage(pipe2img)
        pipe2.velocityX=-5
        pipe2.scale=3;
        pipe2.lifetime=800
        pipe2Group.add(pipe2)
    }

}

function spawnCoins(){
    if (frameCount%100==0){
       var coin=createSprite(width, random(100,500), 20,20)
       coin.addImage(coinImg)
        coin.velocityX=-5
        coin.scale=0.3
        coin.lifetime=800;
        coinGroup.add(coin)

    }

}

function gameOver1() {
    swal({
      title: `Game Over`,
      text: "Sorry you couldn't reach the nest...!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  function win() {
    swal({
      title: `You Won`,
      text: "Congratulations! You reached home!",
      imageUrl:
       "goldbird.png ",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }