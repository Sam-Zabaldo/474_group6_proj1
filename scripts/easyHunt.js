var easyHuntScene = function(){
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
    this.maxTargets = 5;
    this.spawnCount = 0;
    this.maxSpeed = 8;
 
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
        self.player.ammo = 6;
        self.list = [];
        self.ticksSinceSpawn = 0;
        self.strikes = 0;
        self.round += 1;
        self.maxTargets *= 2;
        self.spawnCount = 0;
        self.maxSpeed += 2;

    }

    this.isGameOver = function(){
        return self.strikes >= 3;
    }
    this.gameOver = function(){
        //Set game attributes to default values
        self.player.ammo = 6;
        self.list = [];
        self.ticksSinceSpawn = 0;
        self.strikes = 0;
        self.round = 1;
        self.score = 0;
        self.maxTargets = 5;
        self.spawnCount = 0;
        self.maxSpeed = 8;
    }

    this.roundOver = function(){
        if (self.spawnCount >= self.maxTargets){
           for (i=0; i < self.list.length; i++){
               if (self.list[i] != null){
                   return false;
               }
           }
           return true;
        }
        else{
            return false;
        }
    }
                

    //function that generates a target
    this.newTarget = function(){
        console.log("Spawning New Bird>>>>>>");
        var yLoc = Math.floor((Math.random() * 500));
        var xLoc = 0;
        var name = "";
        var type = "";
        var direction = "";
        var x_speed = Math.round(Math.random() * (self.maxSpeed - 3 + 1) + 3);
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
       console.log("type: " + type + " yPos: "+ yLoc + " x_speed: " + x_speed);
      
       var [min, max] = self.findPossibleYSpeed(yLoc, x_speed);
       console.log("MIN: " + min);
       console.log("MAX: " + max);
       y_speed = Math.floor(Math.random() * (max - min + 1) + min);

        this.list.push(new target(type,name,xLoc,yLoc, direction,x_speed, y_speed));
        document.getElementById("playBoard").appendChild(img);
    }


    this.findPossibleYSpeed = function(yLoc, x_speed){
        var num_ticks = Math.floor(800 / x_speed);
        var min = 0;
        var max = 0;
        var minI = 0;
        var maxI = 0;
        var minFound = false;
        var maxFound = false;

        while (!minFound || !maxFound){
            minI -=1;
            maxI +=1;
            console.log((num_ticks * maxI) + yLoc)
            if ((num_ticks * maxI) + yLoc > 500  && !maxFound){
                max = maxI - 1;
                maxFound = true;
                console.log("Setting max to: " + max)
            }
            if ((num_ticks * minI) + yLoc < 20 && !minFound ){
                minFound = true;
                min = minI + 1;
                console.log("Setting min to: " + min);
            }
        }
        return [min,max];
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
   
    this.xPos = 500;
    this.yPos = 500;
    this.ammo = 6;
    this.width = 50;
    this.height = 50;
    this.canShoot = true;

    this.initialize = function(){

    }
    this.updateAmmo = function(num){
        /*
        if (self.ammo + num > 6 || self.ammo + num < 0){
            return false;
        }
        else{
            self.ammo += num;
            return true;
        }
        */
    }

    this.setPostion=function(xPos, yPos){
        //Implement Crosshair wiggle, recoil?
    }


    this.updatePosition= function(xPos, yPos){
        
        self.xPos = xPos;
        self.yPos = yPos;

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
        var crossHairLocX = self.xPos;
        var crossHairLocY = self.yPos;
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
                    self.game.strikes += 1;
                    setTimeout(function(){
                        $('#eagle-sound').trigger("play");
                        $('#eagle-sound').prop("currentTime", 0);
                        

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

var target = function(type, name, startX,startY, direction,x_speed, y_speed){
    var self = this;
    this.x_speed = x_speed;
    this.y_speed = y_speed;
    this.name = name;
 
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
            self.xPos += self.x_speed;
        }
        else{
            self.xPos -= self.x_speed;
        }
        self.yPos += y_speed;
        
    }

    //function that makes the target fall and then sets it to dead so it can be removed

    this.makefall = function(){
        self.yPos = self.yPos + 5;
        if(self.yPos >= 300){
            this.dead = true;
            
        }
    }
   
}


