





var game = new Phaser.Game(800, 500, Phaser.AUTO, '');


    var backgroundSpeed = 2;
    var floorSpeed = 4;
    var speed = 125;
    var jumpPower = -325;
    var weight = 0; //for every burger eaten, speed goes down two
	var score = 100;//cholesterol counter
	var scoreText;//cholesterol text
    var jumpTime = 0;//how long player has been in the air jumping
     var jumping = false;
     var happyText;
     var happyPoints = 0;
     var gameSpeed=0;//increase velocity of OBJects and maybe player animation
     var increasePanSpeed=0;
    var finalCholesterol = score;
    var finalHappy = happyPoints;

var MainMenu = {

    preload: function(){

        //SOUNDS
        //https://opengameart.org/content/cheerful-2-la-spensierata-polka-loop
        game.load.audio('music', 'assets/music.mp3');
        //https://freesound.org/s/180158/
        game.load.audio('flatline', 'assets/flatline.wav');
        game.load.audio('munch', 'assets/munch.mp3');
        //https://freesound.org/people/Robinhood76/sounds/95535/
        game.load.audio('yipee', 'assets/yipee.wav');
        game.load.audio('jump', 'assets/jump.wav');
        game.load.audio('barf', 'assets/barf.mp3');
        //IMAGES
        game.load.image('newstart', 'assets/newstart.png');
        game.load.image('startTitle', 'assets/startTitle.png');
        game.load.image('restaurant', 'assets/restaurant.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.atlas('atlas3', 'assets/atlas3.png', 'assets/atlas3.json');
        game.load.image('newstart', 'assets/newstart.png');  
        game.load.image('deathscreen', 'assets/deathscreen.png');  
        game.load.image('deadboi', 'assets/deadboi.png');      
            },

    create: function(){
        //resets data displayed from previous game
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
        score = 100;
        happyPoints = 0;
        //start background music
        //music = new Phaser.Sound(game, "music",1,true);
        music = game.add.audio('music');
        music.play();
        game.stage.backgroundColor = "#facade";

        //give start page display physics collision
        startbackground = game.add.tileSprite(0,0,1024,512,'newstart');

        this.startTitle = game.add.sprite(0, 0, 'startTitle');

    this.floor = game.add.tileSprite(0, game.world.height-50,1024,64,'ground');
    this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
    this.floor.body.immovable = true;


    },

    update: function(){


        startbackground.tilePosition.x += -2;
     	this.floor.tilePosition.x += -floorSpeed - increasePanSpeed/100;
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('GamePlay');
        }
    }

};

var GamePlay = {


 preload: function() {
	// preload assets
	//images name and path

},

 create: function() {



    barf = game.add.audio('barf');
    munch = game.add.audio('munch');
    yipee = game.add.audio('yipee');
    jump = game.add.audio('jump');
    flatline = game.add.audio('flatline');


    this.restaurant = game.add.tileSprite(0,0,1024,512,'restaurant');

    this.floor = game.add.tileSprite(0, game.world.height-50,1024,64,'ground');
    this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
    this.floor.body.immovable = true;

    // The player and its settings
    this.player = game.add.sprite(250, game.world.height - 400,'atlas3', 'runner2');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.bounce.y = 0.13;
    this.player.body.gravity.y = 500;
   this.player.body.collideWorldBounds = true;
   this.player.body.setSize(100,240,25,15);
    this.player.animations.add('right',Phaser.Animation.generateFrameNames('runner',1,6),(7),true);
     this.game.physics.arcade.collide(this.player, this.ground);

     //set item group
    this.collectibles = game.add.group();
    this.collectibles.enableBody = true;

    //spawns burgers in random positions
    function createBurger()
    {
        this.burger = this.collectibles.create(900 ,300 + 100*Math.random(0,2),'atlas3', 'burger');
        this.burger.name = 'burger';
        this.game.physics.enable(this.burger, Phaser.Physics.ARCADE);
        this.burger.body.gravity.y = 125;
        this.burger.body.velocity.x = -140 - 150*Math.random(0,1) - increasePanSpeed*25;
        //this.burger.body.velocity.y = -150 - 200*Math.random();
        this.burger.body.bounce.y = 0.6 + (Math.random(0,10) *1)/10;
    }
    game.time.events.repeat(Phaser.Timer.SECOND*2,10000000000000000000000,createBurger,this);


    //spawns cheesecake
    function createCake()
    {

        this.cheesecake = this.collectibles.create(900 ,150 ,'atlas3', 'cheesecake');
        this.cheesecake = this.collectibles.create(900 ,60 + (Math.random(0,10)*25)/10 ,'atlas3', 'cheesecake');
        this.cheesecake.name = 'cheesecake';
        this.game.physics.enable(this.cheesecake, Phaser.Physics.ARCADE);
        this.cheesecake.body.gravity.y = 0;
        this.cheesecake.body.velocity.x = -300 - 150*Math.random(0,2)- increasePanSpeed*15;
        this.cheesecake.body.bounce.y = 1 + Math.random(0,2) * 0.4;
    }


    game.time.events.repeat(Phaser.Timer.SECOND*10,10000000000000000000000,createCake,this);



    //spawns salad
     function createSalad() 
    {
        this.salad = this.collectibles.create(900 ,300 + Math.random(0,1)*50,'atlas3', 'salad');
        this.salad.name = 'salad';
        this.game.physics.enable(this.salad, Phaser.Physics.ARCADE);
        this.salad.body.gravity.y = 40;
        this.salad.body.velocity.y = -100 - 60*Math.random(0,1);
        this.salad.body.velocity.x = -200 - 200*Math.random()- increasePanSpeed*15;
        this.salad.body.bounce.y = 0.8 + Math.random() * 0.4;
    }
    //repeatedly create burgers
    game.time.events.repeat(Phaser.Timer.SECOND*6,10000000000000000000000,createSalad,this);


    //displays player score
    scoreText = game.add.text(36, 10, 'Cholesterol: 100 mg/dL', { fontSize: '32px', fill: '#ff0000' });
    scoreText.addColor("#fff",12);//red
    happyText = game.add.text(460, 10, 'Yum Yum Points: 0', { fontSize: '32px', fill: '#ffff00' });
},

	 update: function() {

        //panning floor and background
     this.floor.tilePosition.x += -floorSpeed - increasePanSpeed;
    this.restaurant.tilePosition.x += -backgroundSpeed - increasePanSpeed;
    //player run animation
    this.player.animations.play('right');

    //make floor collidable
    var hitPlatform = this.game.physics.arcade.collide(this.player, this.floor);
    this.game.physics.arcade.collide(this.collectibles, this.floor);
    //this.game.physics.arcade.collide(this.killItem, this.floor);
 
    	//set cursor keys
	cursors = game.input.keyboard.createCursorKeys();

    //player movement
 
    if (cursors.left.isDown)
    {
        if( speed - weight > 0)
        this.player.body.velocity.x = -(speed - weight);
        else
            this.player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        if(speed - weight > 0)
        this.player.body.velocity.x = speed - weight;
        else
            this.player.body.velocity.x = 200;

    }
    else
        this.player.body.velocity.x = 0;
    
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.touching.down && hitPlatform && game.time.now > jumpTime)
        {
            this.player.body.velocity.y = jumpPower + weight/2;
            jump.play();//play jump sound
            jumpTime = game.time.now + 750;
            jumping = true;
        }

    //destroys item and changes player variables and score
	function collectItem (player, collectibles) {

    //destroy item
    collectibles.kill();

    //  Add and update the score depending on which food item was collided with
    if(collectibles.name == 'burger')//burger increases cholesterol, weight, and happy points
    {
        munch.play();
        score += 30;// increase cholesterol by ALOT
        weight += 10;//slows speed and jump down
        happyPoints +=10;
         }
    else if(collectibles.name == 'salad')//salad decreases cholesterol, weight, and increases speed and jump power
    {
     barf.play();
        score -= 15;// lower cholesterol
        weight -= 5;
        //speed += 5;
        jumpPower-= 10;
        happyPoints +=1;
        if(weight < 0)//keeps player from having negative weight
            weight = 0;
    }
    else if(collectibles.name == 'cheesecake')// increases cholesterol, happiness, speed
    {
        yipee.play();
        score += 20;// increase cholesterol
        speed += 10;
        happyPoints +=30;
    }
}   

    //Will increase panning speed and velocity of collectibles
    if(happyPoints - 500 >= 0)
        increasePanSpeed = 13;
    else if(happyPoints - 400 >= 0)
        increasePanSpeed = 10;
    else if(happyPoints - 300 >= 0)
        increasePanSpeed = 8;
    else if(happyPoints - 200 >= 0)
        increasePanSpeed = 6;
    else if(happyPoints - 100 >= 0)
        increasePanSpeed = 4;
    else if(happyPoints - 50 >= 0)
        increasePanSpeed = 2;
    else if(happyPoints - 25 >= 0)
        increasePanSpeed = 1;
 



    this.game.physics.arcade.overlap(this.player, this.collectibles, collectItem, null, this);

                
                //if player hit 200 Cholesterol, end game and reset variables for next game
                if(score >= 200) {
                    //hold final scores for Game Over page
                    finalCholesterol = score;
                    finalHappy = happyPoints;

                    //go to new game state
                    game.state.start('GameOverHeartAttack');
                    //reset variables
                    music.stop();
                    flatline.play();
                    backgroundSpeed = 2;
                    floorSpeed = 3;
                    speed = 125;
                    jumpPower = -325;
                    weight = 0; //for every burger eaten, speed goes down two
                    jumpTime = 0;
                    jumping = false;
                    gameSpeed=0;//increase velocity of OBJects and maybe player animation
                    increasePanSpeed=0;
     } 

    //Update score
    scoreText.text = 'Cholesterol: ' + score + ' mg/dL';
    happyText.text = 'Yum Yum Points: ' + happyPoints;


    }
        
    

};


var GameOverHeartAttack =  {
    preload: function(){
        //already loaded sprites at start of game
      },

    create: function(){
        //display Game Over page with final scores



        game.add.sprite(0, 0, 'newstart');
        game.add.sprite(0, 0, 'deathscreen');

	    this.floor = game.add.tileSprite(0, game.world.height-50,1024,64,'ground');
	    this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
	    this.floor.body.immovable = true;
        
        game.add.sprite(0, 75, 'deadboi');

        //display endgame scores
        scoreText = game.add.text(36, 10, 'Cholesterol: '+ finalCholesterol + ' mg/dL', { fontSize: '32px', fill: '#ff0000' });
        scoreText.addColor("#fff",12);//red
        happyText = game.add.text(460, 10, 'Yum Yum Points: '+ finalHappy, { fontSize: '32px', fill: '#ffff00' });
        



        },

    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            game.state.start('MainMenu'); 
        }
    }
};

game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOverHeartAttack', GameOverHeartAttack);
game.state.start('MainMenu');