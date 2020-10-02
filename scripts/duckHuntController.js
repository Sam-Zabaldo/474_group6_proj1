var gameUI;
var altUI;
var adviceUI;
var gameStarted = false; 

//initializes the overall program
var duckHuntControllerStart = function() {

    $(normGameButton).click(function(){ duckHuntNormStart () });
    $(altGameButton).click(function(){ duckHuntAltStart () });
    $(aboutButton).click(function(){ duckHuntAdviceStart () });
    $(adviceBackButton).click(function(){ duckHuntAdviceEnd () });
    $(endScreenReturnButton).click(function(){ duckHuntEndscreenEnd () });
    duckHuntMenuStart();

}

//starts the menu
duckHuntMenuStart = function () {


    $(gunBox).hide();
    $(minigunBox).hide();
    $(crossHair).hide();

    $(menuLayer).show();

    //$(infoBoard).toggle();

    console.log("Menu start");

}

//begins normal game
var duckHuntNormStart = function () {

    $(menuLayer).hide();

    $(gunBox).toggle();
    $(crossHair).toggle();

    console.log("game start");

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

    $(minigunBox).toggle();
    $(crossHair).toggle();

    console.log("alt game start");

    if (!gameStarted) {
        gameUI = new easyHuntUI(); 
        gameStarted = true; 
    } else {
        gameUI.running = true; 
        gameUI.playAgain(); 
    }

}

//Displays instructions screen
var duckHuntAdviceStart = function () {

    $(menuLayer).hide();

    $(roundNumber).css({
        "border-color":"red"
    });

    $(xBox).css({
        "border-color":"yellow"
    });

    $(ammoBox).css({
        "border-color":"lightgreen"
    });


    $(adviceLayer).show();

}

var duckHuntAdviceEnd = function() {

    $(adviceLayer).hide();

    $(roundNumber).css({
        "border-color":"transparent"
    });
    $(xBox).css({
        "border-color":"transparent"
    });
    $(ammoBox).css({
        "border-color":"transparent"
    });

    $(menuLayer).show();

}

var duckHuntEndscreenEnd = function() {

    $(endscreenLayer).hide();
    $(menuLayer).show();

}


