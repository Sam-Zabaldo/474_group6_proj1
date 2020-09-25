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

//goes to menu mode
duckHuntMenuStart = function () {

    console.log("Menu start");

}

//begins normal game
var duckHuntNormStart = function () {

    gameUI = new duckHuntUI ();

}

//begins alternate game if we want to do this
var duckHuntAltStart = function () {

    altUI =  new duckHuntUI ();

}

//Displays instructions screen
var duckHuntAdviceStart = function () {

    alert("Advice");

}