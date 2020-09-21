var duckHuntScene = function(){
    var self = this;
    this.options={
        height:540,
        width:680,
        score:0,
        round:0
        
    }
    this.player = new player();
    this.exampleDuck = new target();
    this.initialize();


    this.reset=function(){
        self.score=0;
        self.round=0;
    };

}

var player = function(){
    var self=this;
    this.xPos = 500;
    this.yPos = 500;
    this.ammo = 6;
    this.width = 50;
    this.height = 50;
    this.canShoot = true;

    this.setPostion=function(xPos, yPos){
        //Implement Crosshair wiggle, recoil?
    }
    this.updatePosition= function(xPos, yPos){
         //Implement Crosshair wiggle, recoil?
    }
    this.fireGun = function(){
        //Handles firing gun logic
    }

}
var target = function(){
    var self = this;
    this.angle = 0;
    this.speed = 0;
    this.xPos = 0;
    this.yPos = 0;
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
   
}
