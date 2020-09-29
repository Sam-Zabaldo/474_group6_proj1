var duckHuntScene = function(){
    var self = this;
    this.height = 540;
    this.width = 800;
    this.score = 0;
    this.coordinateOffset = 10;

    //Round Logic
    this.strikes = 0;
    this.minTicksBetweenSpawn = 100;
    this.ticksSinceSpawn = 0;
    this.round = 1;
    this.maxTargets = 10;
    this.spawnCount = 0;
    this.maxSpeed = 10;
 
    this.initialize = function(){
        //this.spawnTargets(3);
    }

    this.spawnTargets = function(numberTargets){
        for (i = 0; i < numberTargets; i++) {
            this.newTarget();
        }
    }
   
    this.player = new player(this);

    this.list = [];
   
    
    //this.list = [new target("eagle", 0,0, "right"), 
                // new target("gooseRight", 700,200, "left")];
    this.newRound = function(){
        if (self.minTicksBetweenSpawn > 10){
            self.minTicksBetweenSpawn -= 5;
        }
        self.ticksSinceSpawn = 0;
        self.strikes = 0;
        self.round += 1;
        self.maxTargets *= 2;
        self.spawnCount = 0;
        self.maxSpeed += Math.round(self.maxSpeed * .5);

    }

    this.gameOver = function(){
        return self.strikes >= 3;
    }

    this.roundOver = function(){
        if (self.spawnCount >= self.maxTargets){
            return true;
        }
        else{
            return false;
        }
    }
                

    //function that generates a target
    this.newTarget = function(){
        console.log("Spawning New Bird>>>>>>");
        var yLoc = Math.floor((Math.random() * 450));
        var xLoc = 0;
        var name = "";
        var type = "";
        var direction = "";
        var speed = Math.round(Math.random() * self.maxSpeed) + 1;

        var img = document.createElement('img');

        if (Math.random() > .5){
            direction = "right";
            xLoc = 0;
        }
        else{
            direction = "left";
            xLoc = 750;
        }

        if(Math.random() > .75){
            type = "eagle";
            name = "eagle"+this.list.length.toString()+"";
            img.id = name;
            img.src = './images/eagle2.gif';
            img.setAttribute("style", "right: "+xLoc+"px;" + " top: "+yLoc+"px;" + " width: 90px; transform: scaleX(1); position: absolute;");
        } 
        else{
            type = "goose";
            name = "gooseRight"+this.list.length.toString()+"";
            img.id = name;
            img.src = './images/animated-goose-image-left-right.gif';
            img.setAttribute("style", "right: "+xLoc+"px;" + " top: "+yLoc+"px;" + " width: 90px; transform: scaleX(1); position: absolute;");
        }
        var maxAngleDown = Math.floor((180/Math.PI) * Math.atan(1-yLoc/700));
       
        
        var maxAngleUp = -1*(Math.floor((180/Math.PI) * Math.atan(yLoc/700)));
        
        var angle = Math.floor(Math.random() * (maxAngleUp - maxAngleDown) + maxAngleDown);

        console.log("type: " + type + " yPos: "+ yLoc + " angle: " + angle + " speed: " + speed);
        console.log("Up: " + maxAngleUp);
        console.log("Down: " + maxAngleDown);
        console.log("X increment: " + Math.floor((speed*Math.cos(angle))));
        console.log("Y increment: " + Math.floor((speed*Math.sin(angle))));
        this.list.push(new target(type,name,xLoc,yLoc, direction, angle,speed));
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
        var noHit = true;
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
                if(type == "goose" && crossHairLocX >= birdX && crossHairLocX <= birdX+80 && crossHairLocY >= birdY && crossHairLocY <= birdY+30){
                    //self.game.newTarget();
                    noHit = false;
                    this.game.score +=1
                    //alert("hit");
                    setTimeout(function(){
                        $('#honk').trigger("play");
                        $('#honk').prop("currentTime", 0);
                        

                        console.log("HIT! removing:" +id);
                    },300);
                    //area for modifing the hit target
                    self.game.list[i].isHit = true;
                    self.handleHit(id, div);
                    //
                } else if(type == "eagle" && crossHairLocX >= birdX && crossHairLocX <= birdX+80 && crossHairLocY >= birdY && crossHairLocY <= birdY+25){
                    //self.game.newTarget();
                    //alert("hit");
                    noHit = false;
                    this.game.score +=1
                    setTimeout(function(){
                        $('#honk').trigger("play");
                        $('#honk').prop("currentTime", 0);
                        

                        console.log("HIT! removing:" +id);
                    },300);
                    //area for modifing the hit target
                    //
                    self.game.list[i].isHit = true;
                    self.handleHit(id, div);
                    //
                }
            }
        }
        if(noHit){
            self.game.strikes +=1;
        }
      
    }

    this.handleHit = function(name, div){
        if(name.includes("eagle")){
            div.setAttribute("src", "./images/deadeagle.png");
        }
        if(name.includes("goose")){
            div.setAttribute("src", "./images/deadgoose.png");
        }
    }
}

var target = function(type, name, startX,startY, direction,angle,speed){
    var self = this;
    this.angle = angle;
    this.speed = speed;
    this.name = name;
    this.speed = speed;
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
           
            self.xPos += Math.abs(Math.ceil((self.speed*Math.cos(Math.PI/180*self.angle))));
            self.yPos += Math.floor(self.speed*Math.sin(Math.PI/180*self.angle));
          
        }
        else if(this.direction =="left"){
            self.xPos -= Math.abs(Math.ceil(self.speed*Math.cos(Math.PI/180*self.angle)));
            self.yPos -= Math.floor(self.speed*Math.sin(Math.PI/180*self.angle));
      
        
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


