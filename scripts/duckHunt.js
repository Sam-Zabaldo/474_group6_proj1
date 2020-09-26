var duckHuntScene = function(){
    var self = this;
    this.height = 540;
    this.width = 800;
    this.score = 0;
    this.round = 1;
    this.coordinateOffset = 10;
 
    this.initialize = function(){
        this.spawnTargets(3);
    }

    this.spawnTargets = function(numberTargets){
        this.list = [];
        var i;
        for (i = 0; i < numberTargets; i++) {
            this.newTarget();
        }
    }
   
    this.player = new player(this);

    this.list = [];
   
    
    //this.list = [new target("eagle", 0,0, "right"), 
                // new target("gooseRight", 700,200, "left")];


    //function that generates a target
    this.newTarget = function(){
        var birdNum = Math.floor((Math.random() * 2) + 1);
        var xLoc = Math.floor((Math.random() * 600));
        var yLoc = Math.floor((Math.random() * 300));
        console.log("birdNum: " + birdNum + " yLoc: " + yLoc);
        var name = "";
        var type = "";
        var img = document.createElement('img');
        if(birdNum == 1){
            type = "eagle";
            name = "eagle"+this.list.length.toString()+"";
            img.id = name;
            img.src = './images/eagle.gif';
            img.setAttribute("style", "right: "+"0"+"px;" + " top: "+yLoc+"px;" + " width: 90px; transform: scaleX(1); position: absolute;");
        } else if(birdNum == 2){
            type = "goose";
            name = "gooseRight"+this.list.length.toString()+"";
            img.id = name;
            img.src = './images/animated-goose-image-left-right.gif';
            img.setAttribute("style", "right: "+xLoc+"px;" + " top: "+yLoc+"px;" + " width: 90px; transform: scaleX(1); position: absolute;");
        }
        console.log(name);
        this.list.push(new target(name, 0,yLoc, "right", type));
        document.getElementById("playBoard").appendChild(img);
    }

    this.reset=function(){
        self.score=0;
        self.round=0;
    };
    this.initialize();
}

var player = function(game){
    this.reloading = false;
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
    this.updateAmmo = function(num){
        if (self.ammo + num > 6 || self.ammo + num < 0){
            return false;
        }
        else{
            self.ammo += num;
            return true;
        }
    }

    this.setPostion=function(xPos, yPos){
        //Implement Crosshair wiggle, recoil?
    }
    this.randomizeCrossHairLocation = function(){
        self.xCrossHairOff = Math.round(self.crossHairRadius*Math.cos(self.currentDegree * Math.PI /180));
        self.yCrossHairOff = Math.round(self.crossHairRadius*Math.sin(self.currentDegree* Math.PI /180));
        this.currentDegree = this.currentDegree + 5;

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

    this.fireGun = function(){
        self.ammo -= 1;
        console.log("Ammo: " + self.ammo);
        var crossHairLocX = self.xPos + self.xCrossHairOff;
        var crossHairLocY = self.yPos + self.yCrossHairOff;
        var len = self.game.list.length;
        //console.log(this.list);
        for(let i = 0; i < len; i++){
            if(self.game.list[i] !== null){
                var id = self.game.list[i].getName();
                var type = self.game.list[i].getType();
                var div = document.getElementById(id);
                var rect = div.getBoundingClientRect();
                birdX = rect.left;
                birdY = rect.top;
                console.log("type: " + type+ "birdX: " + birdX + " birdY: " + birdY);
                console.log("crosshairX: " + crossHairLocX + " crossHairLocY: " + crossHairLocY);
                if(type == "goose" && crossHairLocX >= birdX && crossHairLocX <= birdX+80 && crossHairLocY >= birdY && crossHairLocY <= birdY+35){
                    //self.game.newTarget();
                    //alert("hit");
                    setTimeout(function(){
                        $('#honk').trigger("play");
                        $('#honk').prop("currentTime", 0);
                        

                        console.log("HIT! removing:" +id);
                    },300);
                    //area for modifing the hit target
                    self.game.list[i].isHit = true;
                    div.setAttribute("src", "./images/deadeagle.png");
                    //
                } else if(type == "eagle" && crossHairLocX >= birdX && crossHairLocX <= birdX+80 && crossHairLocY >= birdY+10 && crossHairLocY <= birdY+70){
                    //self.game.newTarget();
                    //alert("hit");
                    setTimeout(function(){
                        $('#honk').trigger("play");
                        $('#honk').prop("currentTime", 0);
                        

                        console.log("HIT! removing:" +id);
                    },300);
                    //area for modifing the hit target
                    self.game.list[i].isHit = true;
                    div.setAttribute("src", "./images/deadeagle.png");
                    //
                }
            }
        }
    }
}

var target = function(name, startX,startY, direction, type){
    var self = this;
    this.name = name;
    this.speed = 1;
    this.xPos = startX;
    this.yPos = startY;
    this.type = type;
    this.dead;
    this.isHit;

    this.direction = direction

    this.setTargetType = function(type){
        this.type = type;
    }

    this.setTargetName= function(name){
        this.name = name;
    }

    this.getName = function(){
        return this.name;
    }

    this.getType = function(){
        return this.type;
    }


    //returns the jquerry name
    this.jqName = function(){
        return ("#" + this.name); 
    }
    
    this.setPostion = function(xPos,yPos ){
        self.xPos = xPos;
        self.yPos = yPos;
    }
    this.setAngle = function(){}

    //changes the postion of the target object
    this.updatePosition = function(){
        //var distance=self.speed*time;
        if (this.direction == "right"){
            self.xPos=self.xPos+5;
            //self.yPos=self.yPos+5;
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

    //function that makes the target fall and then sets it to dead so it can be removed

    this.makefall = function(){
        self.yPos = self.yPos + 5;
        if(self.yPos >= 300){
            this.dead = true;
            
        }
    }
   
}


