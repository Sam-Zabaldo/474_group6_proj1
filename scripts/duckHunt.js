var duckHuntScene = function(){
    var self = this;
    this.options={
        height:540,
        width:680,
        score:0,
        round:0
        
    }
    this.initialize = function(){

    }
    this.player = new player();
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
    this.canShoot = true;

    this.initialize = function(){

    }

    this.setPostion=function(xPos, yPos){
        //Implement Crosshair wiggle, recoil?
    }
    this.fireGun = function(xPos, yPos){
        //Handles firing gun logic
        console.log("in fireGun");
        
    }

}
var target = function(targetType){
    var self = this;
    this.xPos = 0;
    this.yPos = 0;
    this.type = targetType;

    this.initialize = function(){

    }

    this.setPostion = function(xPos,yPos ){
        //TODO
    }
    this.updatePosition = function(direction){
        //TODO
    }
}
