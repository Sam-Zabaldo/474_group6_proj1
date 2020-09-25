var duckHuntUI=function(){
    var self = this;
    this.game = undefined;
    this.running = true;
    this.coordinateOffset = 10;
    
    this.initialize=function(){
        self.game = new duckHuntScene();
        console.log(typeof null);
        window.setInterval(function(){
            self.game.player.randomizeCrossHairLocation();
            $('#crossHair').css("top", self.game.player.yPos +self.game.player.yCrossHairOff - self.coordinateOffset );
            $('#crossHair').css("left", self.game.player.xPos+self.game.player.xCrossHairOff - self.coordinateOffset);
            
            //spawns moving targets
            
            var i;
            for (i = 0; i < self.game.list.length; i++) {
                if (self.game.list[i] !== null) {
                    moveTarget(i);
                }
            }
            restack();

        },20);

    
            
        $('body').mousemove(function(event){
            var x = event.pageX - self.game.player.width/2;
            var y = event.pageY - self.game.player.height/2;
            angle = self.calculateGunAngle(x,y);
            self.game.player.updatePosition(x,y);
            $('#gunBox').css("transform","rotate("+ angle + "deg)");

        });
        $('body').keypress(function(event){
            if (event.which==114){
                    self.handleReload();
                    
                }
                
                
               
            
        });
        
        $("#playBoard").mousedown(function(e){
            if (self.game.player.ammo == 0){
                self.handleReload();
            }
            else if (self.game.player.canShoot && !self.game.player.reloading){
                $('#gunshot').trigger("play");
                $('#gunshot').prop("currentTime", 0);
                self.game.player.canShoot = false;
                //console.log("mouse clicked x: " + e.clientX + " y: " + e.clientY);
                
                self.game.player.fireGun();
                self.updateAmmoIcon(self.game.player.ammo)

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
        
        });

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
        var jqName = self.game.list[index].jqName(); 
        if(self.game.list[index].isHit == true){
            self.game.list[index].makefall();
            $(jqName).css("top", self.game.list[index].yPos);


            //check to see if the target shoudl be removed
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
            //$(jqName).css("top", self.game.list[index].yPos);
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

    function restack(){
        var i = 0;
        for(i = 0; i < self.game.list.length; i++){
            if(self.game.list[i] !== null){
                return 0;
            }
        }
        console.log("got here");
        self.game.spawnTargets(3);

    }

    
    this.handleReload = function(){
        if (!self.game.player.reloading){
            self.game.player.reloading = true;
            var ammoMissing =  6  - self.game.player.ammo;
            for (i=1; i <=ammoMissing; i++){
                setTimeout(function(){
                    $('#chambering').trigger("play");
                    $('#chambering').prop("currentTime", 0);
                    self.game.player.ammo += 1;
                    self.updateAmmoIcon(self.game.player.ammo);
                    if (self.game.player.ammo == 6){
                        self.game.player.reloading = false; 
                    }
                }, i *500);
            
            }
        }
       
    }




   

   this.initialize(); 
}


