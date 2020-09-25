var gameUI;
var altUI;
var adviceUI;


//initializes the overall program
var duckHuntControllerStart = function() {

    $(normGameButton).click(function(){ duckHuntNormStart () });
    $(altGameButton).click(function(){ duckHuntAltStart () });
    $(aboutButton).click(function(){ duckHuntAdviceStart () });

    duckHuntMenuStart();

}

//starts the menu
duckHuntMenuStart = function () {

    $(gunBox).toggle();
    $(crossHair).toggle();
    $(gooseRight).toggle();
    $(eagle).toggle();
    //$(infoBoard).toggle();

    console.log("Menu start");

}

//begins normal game
var duckHuntNormStart = function () {

    $(gunBox).toggle();
    $(crossHair).toggle();
    $(gooseRight).toggle();
    $(eagle).toggle();
    //$(infoBoard).toggle();

    gameUI = new duckHuntUI ();

}

//begins alternate game if we want to do this
var duckHuntAltStart = function () {

    $(gunBox).toggle();
    $(crossHair).toggle();
    $(gooseRight).toggle();
    $(eagle).toggle();
    //$(infoBoard).toggle();

    altUI =  new duckHuntUI ();

}

//Displays instructions screen
var duckHuntAdviceStart = function () {

    alert("Advice");

}