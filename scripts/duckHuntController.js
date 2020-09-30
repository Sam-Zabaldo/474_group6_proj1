var gameUI;
var altUI;
var adviceUI;


//initializes the overall program
var duckHuntControllerStart = function() {

    $(normGameButton).click(function(){ duckHuntNormStart () });
    $(altGameButton).click(function(){ duckHuntAltStart () });
    $(aboutButton).click(function(){ duckHuntAdviceStart () });
    $(adviceBackButton).click(function(){ duckHuntAdviceEnd () });
    duckHuntMenuStart();

}

//starts the menu
duckHuntMenuStart = function () {


    $(gunBox).hide();
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


    gameUI = new duckHuntUI ();

}

//begins alternate game if we want to do this
var duckHuntAltStart = function () {

    $(menuLayer).hide();

    $(gunBox).toggle();
    $(crossHair).toggle();


    altUI =  new duckHuntUI ();

}

//Displays instructions screen
var duckHuntAdviceStart = function () {

    $(adviceLayer).show();

}

var duckHuntAdviceEnd = function() {

    $(adviceLayer).hide();

}

