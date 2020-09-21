var duckHuntUI=function(){
    var self = this;
    this.game = undefined;
    this.running = true;
    this.coordinateOffset = 10;
    this.initialize=function(){
        
        //self.game = new duckHuntScene();
        $('body').mousemove(function(event){
            // 25 comes from width or height of crosshair divided by 2, should call player.getHeight() ect. 
            var x = event.pageX - 25;
            var y = event.pageY - 25;
            angle = self.calculateGunAngle(x,y);
            //Moving crossHair logic should be handled in duckHunt.js
            //Just doing it right here for now
            $('#crossHair').css("top", y - self.coordinateOffset );
            $('#crossHair').css("left", x - self.coordinateOffset);
            $('#gunBox').css("transform","rotate("+ angle + "deg)" );

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
