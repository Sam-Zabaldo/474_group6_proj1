var duckHuntUI=function(){
    var self = this;
    this.game = undefined;
    this.running = true;
    this.coordinateOffset = 10;
    this.initialize=function(){
        self.game = new duckHuntScene();
        $('body').mousemove(function(event){
            // 25 comes from width or height of crosshair divided by 2, should call player.getHeight() ect. 
            var x = event.pageX - self.game.player.width/2;
            var y = event.pageY - self.game.player.height/2;
            angle = self.calculateGunAngle(x,y);

            //Moving crossHair logic should be handled in duckHunt.js
            //Just doing it right here for now
            self.game.player.updatePosition(x,y);
            $('#crossHair').css("top", self.game.player.yPos - self.coordinateOffset );
            $('#crossHair').css("left", self.game.player.xPos - self.coordinateOffset);
            $('#gunBox').css("transform","rotate("+ angle + "deg)" );

        });
        $("body").mousedown(function(e){
            console.log("mouse clicked x: " + e.clientX + " y: " + e.clientY);
            var div = document.getElementById("testTarget");
            var rect = div.getBoundingClientRect();
            //alert("Coordinates: " + rect.left + "px, " + rect.top + "px");
            self.game.player.fireGun(rect.left, rect.top, e.clientX, e.clientY);
            $('#gunImage').attr("src", "./images/gun-fire.png")
            setTimeout(function(){
                $('#gunImage').attr("src", "./images/gun.png") 
            },100);

        });

    }
    this.calculateGunAngle = function(xMouse, yMouse){
        var opposite = 400 - xMouse;
        var adjacent = 540 - yMouse;
        var angle = Math.atan(opposite/adjacent);
        angle = -1*(Math.floor((180 * angle) / Math.PI));
        
        if (angle > 45){
            angle = 45
        }
        else if(angle < -45){
            angle = - 45;
        }
        return angle;
    };
  
   this.initialize(); 
}
/*
$(document).ready(function(){
    console.log("Document Ready")
    var ui = new duckHuntUI();
});
*/
