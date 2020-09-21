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
    this.exampleDuck = new target();
    this.exampleDuck.addTestTarget();
   


    this.reset=function(){
        self.score=0;
        self.round=0;
    };
    this.initialize();
}

var player = function(game){
    var self=this;
    this.game = game;
    this.crossHairRadius = 15;
    self.currentDegree = 5;
    this.xCrossHairOff = 0;
    this.yCrossHairOff = 0;
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
    this.randomizeCrossHairLocation = function(){
        self.xCrossHairOff = Math.round(self.crossHairRadius*Math.cos(self.currentDegree * Math.PI /180));
        self.yCrossHairOff = Math.round(self.crossHairRadius*Math.sin(self.currentDegree* Math.PI /180));
        this.currentDegree = this.currentDegree + 15;

    }

    this.updatePosition= function(xPos, yPos){
        
        self.xPos = xPos;
        self.yPos = yPos;
        /*
        self.xPos = self.xPos + Math.floor(self.crossHairRadius*Math.cos(self.currentDegree * Math.PI /180));
        self.yPos = self.yPos + Math.floor(self.crossHairRadius*Math.sin(self.currentDegree* Math.PI /180));
        this.currentDegree = this.currentDegree + 20;
        */

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
    this.fireGun = function(birdX, birdY, fireX, fireY){
        //Handles firing gun logic
        //console.log("in fireGun");
        if(fireX >= birdX+10 && fireX <= birdX+80 && fireY >= birdY+10
            && fireY <= birdY+60){
                console.log("bird hit!");
            }
    }

}
var target = function(){
    var self = this;
    this.angle = 0;
    this.speed = 0;
    this.xPos = 250;
    this.yPos = 250;
    this.type = "None";

    this.setTargetType = function(type){
        this.type = type;
    }
    this.setTrajectory = function(angle, speed){
        this.angle = angle;
        this.speed = speed;
    }
    this.setPostion = function(xPos,yPos ){
        self.xPos = xPos;
        self.yPos = yPos;
    }
    this.updatePosition = function(time){
        var distance=self.speed*time;
        self.yPos=self.yPos+Math.sin(self.angle)*distance;
        self.xPos=self.xPos+Math.cos(self.angle)*distance;
    }

    this.addTestTarget = function(){
        var playBoard = document.getElementById("playBoard");
        var img = document.createElement("img");
        img.id = "testTarget";
        img.src = "./images/animated-goose-image-left-right.gif";
        playBoard.appendChild(img);
    }
   
}
