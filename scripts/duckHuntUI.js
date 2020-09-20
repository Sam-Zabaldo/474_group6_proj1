var duckHuntUI = function(){
    var self = this;
    this.game = undefined;
    this.running = false;
    this.initialize = function(){
        self.game = new duckHuntScene();
        $("body").mousedown(function(e){
            console.log("mouse clicked");
        });
    }

    this.initialize();
}