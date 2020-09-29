var duckHuntUI=function(){
    var self = this;
    this.game = undefined;
    this.running = true;
    this.coordinateOffset = 10;
    this.reloadInterrupted = false; 
    this.volume = 75; 
    this.muted = false; 

    this.initialize=function(){
        self.game = new duckHuntScene();
        console.log(typeof null);
        var startClock = window.setInterval(function(){
            if (self.running == true) {
                if (self.game.player.ammo > 6) {
                    self.game.player.ammo = 6; 
                }
               
                self.game.ticksSinceSpawn += 1;
                if (self.game.ticksSinceSpawn >= self.game.minTicksBetweenSpawn +  Math.floor(Math.random() * 400)){
                    self.game.spawnTargets(1);
                    self.game.spawnCount+= 1;
                    self.game.ticksSinceSpawn = 0;
                }
                if (self.game.gameOver()){
                    clearInterval(startClock);
                    self.removeTargets();
                    self.endGame();
                    $("#roundNumber").text("Round 1");
                }
               if (self.game.roundOver()){
                    self.game.newRound();
                    $("#roundNumber").text("Round " + self.game.round);
                    self.running = false;
                    self.game.player.ammo = 6; 
                    self.updateAmmoIcon(); 
                    console.log("ROUND OVER >>>>>>>>>");
                    $("#roundComplete").fadeIn("fast");
                    setTimeout(() => {
                        $("#roundComplete").fadeOut("slow");
                        console.log("ROUND START >>>>>>>>>");
                        self.running = true; 
                    }, 2000);
                }
                
                var i;
                for (i = 0; i < self.game.list.length; i++) {
                    if (self.game.list[i] !== null) {
                        self.handleOutOfPlayArea(i);
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
                $('#gunBox').css("transform","rotate("+ angle + "deg)");
            }
        });
        $('body').keypress(function(event){
            if (self.running == true) {
                if (event.which==114){
                        self.handleReload();
                        
                    }
            }
        });
        
        $("#playBoard").mousedown(function(e){
            if (self.running == true) {
                if (self.game.player.ammo == 0){
                    self.handleReload();
                }
                else if (self.game.player.canShoot && !self.game.player.reloading){
                    $('#gunshot').trigger("play");
                    $('#gunshot').prop("currentTime", 0);
                    self.game.player.canShoot = false;
                    //console.log("mouse clicked x: " + e.clientX + " y: " + e.clientY);
                    
                    self.game.player.fireGun();
                    self.updateAmmoIcon(self.game.player.ammo);
                    self.updateStrikeIcon(self.game.strikes);

                    $('#gunImage').attr("src", "./images/gun-fire.png")
                    setTimeout(function(){
                        $('#gunImage').attr("src", "./images/gun.png") 
                    },100);

                    setTimeout(function(){
                        $('#reload').trigger("play");
                        $('#reload').prop("currentTime", 0);
                        setTimeout(function(){
                            self.game.player.canShoot = true; 
                        },700);
                        
                    },1000);
                    
                }
            }
        });

        $("#pauseButton").on("click", function() {
            // pause
            if (self.running == true) {
                self.running = false; 
                $("#pauseMenu").show(); 
                $("#pauseButton").text("Unpause"); 
                $("#playBoard").css("cursor", "auto"); 
                $("#crossHair").hide(); 
                if (self.game.player.reloading == true) {
                    self.reloadInterrupted = true; 
                    self.game.player.reloading == false; 
                }
            // unpause
            } else {
                self.running = true; 
                $("#pauseMenu").hide(); 
                $("#pauseButton").text("Pause"); 
                $("#playBoard").css("cursor", "none"); 
                $("#crossHair").show(); 
                if (self.reloadInterrupted == true) {
                    self.handleReload(); 
                    self.reloadInterrupted = false; 
                }
            }
        }); 

        $("#volUp").on("click", function() {
            if (self.volume <= 95) {
                self.volume += 5; 
                self.setAndShowVol();
            } 
            if (self.muted == true) {
                self.muted = false; 
            }
            $("#volMute").text("Mute"); 
        }); 
        $("#volDown").on("click", function() {
            if (self.volume >= 5) {
                self.volume -= 5; 
                self.setAndShowVol(); 
                if (self.volume == 0) {
                    self.muted = true; 
                    $("#volMute").text("Unmute"); 
                }
            } 
        });
        $("#volMute").on("click", function() {
            if (self.muted == false) {
                self.muted = true; 
                self.volume = 0; 
                self.setAndShowVol(); 
                $("#volMute").text("Unmute"); 
            } else {
                self.muted = false; 
                self.volume = 5; 
                self.setAndShowVol(); 
                $("#volMute").text("Mute"); 
            }
        }); 
        this.setAndShowVol = function() {
            var audio = document.getElementsByClassName("hiddenAudio");
            for (var i = 0; i < audio.length; i ++) {
                audio.item(i).volume = self.volume / 100; 
            }
            $("#vol").text(self.volume + "%");
        };


    }
    this.updateAmmoIcon = function(ammoAmt){
        for (i =1; i <= 6; i++){
            if (i > ammoAmt){
                $('#ammo' + i).attr("src", "./images/ammo-used-crop.png");
            }
            else{
                $('#ammo' + i).attr("src", "./images/ammo-crop.png");
            }
        }
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

    this.handleOutOfPlayArea = function(index){
       
    }

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
                    console.log(self.game.list);
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
                }, i *500);
            
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
                console.log(self.game.list);
            }
        }
    }

    this.endGame = function (){
        $(menuLayer).toggle();
    
        $(gunBox).hide();
        $(crossHair).hide();
       // alert(gameUI.game.score);
        self.running = false;
    }




   

   this.initialize(); 
}


