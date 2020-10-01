var gameUI;
var altUI;
var adviceUI;
var gameStarted = false; 

//initializes the overall program
var duckHuntControllerStart = function() {

    $(normGameButton).click(function(){ duckHuntNormStart () });
    $(altGameButton).click(function(){ duckHuntAltStart () });
    $(aboutButton).click(function(){ duckHuntAdviceStart () });

    duckHuntMenuStart();

}

//starts the menu
duckHuntMenuStart = function () {


    $(gunBox).hide();
    $(crossHair).hide();
    //$(gooseRight).hide();
    //$(eagle).hide();

    $(menuLayer).show();

    //$(infoBoard).toggle();

    console.log("Menu start");

}

//begins normal game
var duckHuntNormStart = function () {

    $(menuLayer).hide();

    $(gunBox).toggle();
    $(crossHair).toggle();
   // $(gooseRight).toggle();
  //  $(eagle).toggle();
    //$(infoBoard).toggle();

    if (!gameStarted) {
        gameUI = new duckHuntUI(); 
        gameStarted = true; 
    } else {
        gameUI.running = true; 
        gameUI.playAgain(); 
    }

}

//begins alternate game if we want to do this
var duckHuntAltStart = function () {

    $(menuLayer).hide();

    $(gunBox).toggle();
    $(crossHair).toggle();
  //  $(gooseRight).toggle();
    //$(eagle).toggle();
    //$(infoBoard).toggle();

    if (!gameStarted) {
        gameUI = new duckHuntUI(); 
        gameStarted = true; 
    } else {
        gameUI.running = true; 
        gameUI.playAgain(); 
    }

}

//Displays instructions screen
var duckHuntAdviceStart = function () {

    alert("Advice");

}

