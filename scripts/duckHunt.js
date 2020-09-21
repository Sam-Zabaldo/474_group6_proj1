var duckHuntScene = function(){
    var self = this;
    this.height = 540;
    this.width = 800;
    this.score = 0;
    this.round = 0;
    this.coordinateOffset = 10;
 
    this.initialize = function(){

    }
    this.player = new player(this);

    this.target = new target();
    this.exampleDuck = new target();
    this.list = [new target("eagle", 0, "right"), 
                 new target("gooseRight", 700, "left")];

    this.reset=function(){
        self.score=0;
        self.round=0;
    };
    this.initialize();
}

var player = function(game){
    var self=this;
    this.game = game;
    this.maxCrossHairDif = 15;
    this.xPos = 500;
    this.yPos = 500;
    this.ammo = 6;
    this.width = 50;
    this.height = 50;
    this.canShoot = true;

    this.initialize = function(){

    }

    this.setPostion=function(xPos, yPos){
        //Implement Crosshair wiggle, recoil?
    }
    this.updatePosition= function(xPos, yPos){
        this.xPos = xPos;
        this.yPos = yPos;
        if (xPos > self.game.width - self.game.coordinateOffset){
            this.xPos = self.game.width - self.game.coordinateOffset;
        }
        if (yPos > self.game.height + self.game.coordinateOffset){
            this.yPos = self.game.height - self.game.coordinateOffset;
        }
        if (xPos < self.game.coordinateOffset){
            this.xPos = self.game.coordinateOffset;
        }
        if (yPos < self.game.coordinateOffset){
            this.yPos = self.game.coordinateOffset;
        }
         
    }
    
    this.fireGun = function(){
        //Handles firing gun logic
        console.log("in fireGun");
        this.ammo = this.ammo - 1;
        
    }

    

}
var target = function(name, startPos, direction){
    var self = this;
    this.name = name;
    this.speed = 1;
    this.xPos = startPos;
    this.yPos = 0;
    this.type = "None";

    this.direction = direction

    this.setTargetType = function(type){
        this.type = type;
    }

    this.setTargetName= function(name){
        this.name = name;
    }

    this.jqName = function(){
        return ("#" + this.name); 
    }
    
    this.setPostion = function(xPos,yPos ){
        self.xPos = xPos;
        self.yPos = yPos;
    }
    this.updatePosition = function(){
        //var distance=self.speed*time;
        if (this.direction == "right"){
            self.xPos=self.xPos+5;
            if(self.xPos == 700){
                this.direction = "left"
            }
        }
        else if(this.direction =="left"){
            self.xPos = self.xPos -5;
            if(self.xPos == 0){
                this.direction = "right";
            }
        }
        
    }
   
}


