var easyHuntUI=function(){
    var self = this;
    this.game = undefined;
    this.running = true;
    this.coordinateOffset = 10;
    this.reloadInterrupted = false; 
    this.isFiring = false;
    //$(".ammoBox").hide();

    this.initialize=function(){
        self.game = new easyHuntScene();
        //console.log(typeof null);
        var startClock = window.setInterval(function(){
            if (self.running == true) {
                if (self.game.player.ammo > 6) {
                    self.game.player.ammo = 6; 
                }

                if (self.isFiring == true && ((self.game.ticksSinceSpawn % 2) == 0)){
                    //console.log("firing");
                    self.game.player.fireGun();
                    self.updateStrikeIcon(self.game.strikes);
                }
               
                self.game.ticksSinceSpawn += 1;
                if (self.game.ticksSinceSpawn >= self.game.minTicksBetweenSpawn +  Math.floor(Math.random() * 400)){
                    self.game.spawnTargets(3);
                    self.game.spawnCount+= 1;
                    self.game.ticksSinceSpawn = 0;
                }
                if (self.game.isGameOver()){
                    clearInterval(startClock);
                    self.removeTargets();
                    self.endGame();
                    self.game.gameOver();
                   
                }
               if (self.game.roundOver()){
                    self.roundOverUpdate();
                   
                }
            
                for (var i = 0; i < self.game.list.length; i++) {
                    if (self.game.list[i] !== null) {
                        moveTarget(i);  
                    }
                }
            }

        },20);

            
        $('body').mousemove(function(event){
            if (self.running == true) {
                $('#crossHair').css("top", self.game.player.yPos  - self.coordinateOffset );
                $('#crossHair').css("left", self.game.player.xPos- self.coordinateOffset);
                var x = event.pageX - self.game.player.width/2;
                var y = event.pageY - self.game.player.height/2;
                angle = self.calculateGunAngle(x,y);
                self.game.player.updatePosition(x,y);
                $('#minigunBox').css("transform","rotate("+ angle + "deg)");
            }
        });
        $('body').keypress(function(event){
            if (self.running == true) {
                if (event.which==114){
                        //self.handleReload();
                        
                    }
            }
        });
        
        $("html").mousedown(function(e){
            if (self.running == true) {
                console.log("begin firing");
                self.isFiring = true;
                $('#minigunImage').attr("src", "./images/minigun3-fire.png")
                $('#minigun-sound').trigger("play");
            }
        });

        $("html").on("mouseup", function () {
            console.log("stop firing");
            $('#minigunImage').attr("src", "./images/minigun3.png");
            $('#minigun-sound').trigger("pause");
            self.isFiring = false;

        });

    }


    this.playAgain = function() {
        var startClock = window.setInterval(function(){
            if (self.running == true) {
                if (self.game.player.ammo > 6) {
                    self.game.player.ammo = 6; 
                }

                if (self.isFiring == true && ((self.game.ticksSinceSpawn % 2) == 0) ){
                    console.log("firing");
                    self.game.player.fireGun();
                    self.updateStrikeIcon(self.game.strikes);
                }

                self.game.ticksSinceSpawn += 1;
                if (self.game.ticksSinceSpawn >= self.game.minTicksBetweenSpawn +  Math.floor(Math.random() * 400)){
                    self.game.spawnTargets(3);
                    self.game.spawnCount+= 1;
                    self.game.ticksSinceSpawn = 0;
                }
                if (self.game.isGameOver()){
                    clearInterval(startClock);
                    self.removeTargets();
                    self.endGame();
                    self.game.gameOver();
                   
                }
               if (self.game.roundOver()){
                    self.roundOverUpdate();
                   
                }
            
                for (var i = 0; i < self.game.list.length; i++) {
                    if (self.game.list[i] !== null) {
                        moveTarget(i);  
                    }
                }
            }

        },20);
    }

    this.updateAmmoIcon = function(ammoAmt){
        for (i =1; i <= 6; i++){
            if (i > ammoAmt){
                $('#ammo' + i).attr("src", "./images/ammo-used-crop.png");
            }
            else{
                $('#ammo' + i).attr("src", "./images/minigunammo.png");
            }
        }
    }
    this.roundOverUpdate = function(){
        self.game.newRound();
        $('#minigun-sound').trigger("pause");
        $("#roundNumber").text("Round " + self.game.round);
        self.running = false;
        //console.log("ROUND OVER >>>>>>>>>");
        $("#roundComplete").fadeIn("fast");
        setTimeout(() => {
            //self.updateAmmoIcon(6); 
            self.updateStrikeIcon(0);
            $("#roundComplete").fadeOut("slow");
            //console.log("ROUND START >>>>>>>>>");
            self.running = true; 
        }, 2000);
    }

    this.updateStrikeIcon = function(num_strikes){
        for (i =1; i <= 3; i++){
            if (i > num_strikes){
                $('#x' + i).attr("src", "./images/x-gray.png");
            }
            else{
                $('#x' + i).attr("src", "./images/x-red.png");
            }
        }
    }

    this.calculateGunAngle = function(xMouse, yMouse){
        var opposite = 400 - xMouse;
        var adjacent = 540 - yMouse;
        var angle = Math.atan(opposite/adjacent);
        angle = -1*(Math.floor((180 * angle) / Math.PI));
        
        if (angle > 45){
            angle = 45
        }
        else if(angle < - 45){
            angle = - 45;
        }
        return angle;
    };

 

    //funciton that takes in an index and moves the target object from the list of targets in the scene
   
    function moveTarget(index) {
        if(self.game.list[index].xPos > 850 || self.game.list[index].xPos < -10){
            if (self.game.list[index].type == "goose"){
                self.game.strikes += 1;
                self.updateStrikeIcon(self.game.strikes);
            }
            var divID = document.getElementById(self.game.list[index].name);
            document.getElementById("playBoard").removeChild(divID);
            self.game.list[index] = null;
        }
        else{
            var jqName = self.game.list[index].jqName(); 
            if(self.game.list[index].isHit == true){
                self.game.list[index].makefall();
                $(jqName).css("top", self.game.list[index].yPos);
    
    
                //check to see if the target should be removed
                if(self.game.list[index].dead == true){
                    var divID = document.getElementById(self.game.list[index].name);
                    document.getElementById("playBoard").removeChild(divID);
                    self.game.list[index] = null;
                    //console.log(self.game.list);
                }
            }
            else{ 
                self.game.list[index].updatePosition();
                $(jqName).css("left", self.game.list[index].xPos);
                $(jqName).css("top", self.game.list[index].yPos);
                if(self.game.list[index].direction == "left"){
                    $(jqName).css("transform", "scaleX(-1)");
                    //document.getElementById("playBoard").removeChild(document.getElementById(self.game.list[index].name));
                    //self.game.list[index] = null;
                }
                else{
                    $(jqName).css("transform", "scaleX(1)");
                }
            }

        }

    }

    
    this.handleReload = function(){
        if (!self.game.player.reloading){
            self.game.player.reloading = true;
            var ammoMissing =  6  - self.game.player.ammo;
            for (i=1; i <=ammoMissing; i++){
                setTimeout(function(){
                    if (self.running == true) {
                        $('#chambering').trigger("play");
                        $('#chambering').prop("currentTime", 0);
                        self.game.player.ammo += 1;
                        self.updateAmmoIcon(self.game.player.ammo);
                        if (self.game.player.ammo == 6){
                            self.game.player.reloading = false; 
                        }
                    } else {
                        self.game.player.reloading = false; 
                    }
                }, i *400);
            
            }
        }
       
    }
    //clears all target divs from the html
    this.removeTargets = function(){
        var i =0;
        for(i = 0; i < self.game.list.length; i++){
            if(self.game.list[i] != null){
                var divID = document.getElementById(self.game.list[i].name);
                document.getElementById("playBoard").removeChild(divID);
                self.game.list[i] = null;
                //console.log(self.game.list);
            }
        }
    }

    this.endGame = function (){
        $("#roundNumber").text("Round 1");
        $('#minigun-sound').trigger("pause");
        //console.log("here")
        //self.updateAmmoIcon(6); 
        self.updateStrikeIcon(0);
        
        

        $(minigunBox).hide();
        $(crossHair).hide();

        $(roundResult).text("Round: " + self.game.round);
        $(scoreResult).text("Score: " + altUI.game.score);

        self.running = false;
        $("#gameOver").fadeIn("fast");
        setTimeout(() => {
            $("#gameOver").fadeOut("slow");
            $("#endscreenLayer").fadeIn("slow"); 
        }, 2000);
        }




   

   this.initialize(); 
}


