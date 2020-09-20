var duckHuntUI = function(){
    var self = this;
    this.game = undefined;
    this.running = false;
    this.initialize = function(){
        self.game = new duckHuntScene();
        $("body").mousedown(function(e){
            console.log("mouse clicked x: " + e.clientX + " y: " + e.clientY);
            self.game.player.fireGun(e.clientX, e.clientY);
        });
    }
    

    this.initialize();
}