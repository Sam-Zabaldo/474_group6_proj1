var gameUI;
var altUI;
var adviceUI;
var currentUI;
var gameStarted = false; 
var altStarted = false;
var volume;
var muted;

//initializes the overall program
var duckHuntControllerStart = function() {

    volume = 75; 
    muted = false; 


    //Initialize the menu 
    $(normGameButton).click(function(){ duckHuntNormStart () });
    $(altGameButton).click(function(){ duckHuntAltStart () });
    $(aboutButton).click(function(){ duckHuntAdviceStart () });
    $(adviceBackButton).click(function(){ duckHuntAdviceEnd () });
    $(endScreenReturnButton).click(function(){ duckHuntEndscreenEnd () });
    duckHuntMenuStart();

    //Set up the pause menu controls
    $("#pauseButton").on("click", function() {
        // pause
        if (currentUI.running == true) {
            currentUI.running = false; 
            currentUI.game.player.canShoot = false; 
            $("#pauseMenu").show(); 
            $("#pauseButton").text("Unpause"); 
            $("#pauseButton").css("background-color", "#d33e3e"); 
            $("#playBoard").css("cursor", "auto"); 
            $("#crossHair").hide(); 
            if (currentUI.game.player.reloading == true) {
                currentUI.reloadInterrupted = true; 
                currentUI.game.player.reloading == false; 
            }
        // unpause
        } else {
            currentUI.running = true; 
            currentUI.game.player.canShoot = true;
            $("#pauseMenu").hide(); 
            $("#pauseButton").text("Pause"); 
            $("#pauseButton").css("background-color", "#7fcf0e"); 
            $("#playBoard").css("cursor", "none"); 
            $("#crossHair").show(); 
            if (currentUI.reloadInterrupted == true) {
                currentUI.handleReload(); 
                currentUI.reloadInterrupted = false; 
            }
        }
    }); 

    $("#volUp").on("click", function() {
        if (volume <= 95) {
            volume += 5; 
            setAndShowVol();
        } 
        if (muted == true) {
            muted = false; 
        }
        $("#volMute").text("Mute"); 
    }); 
    $("#volDown").on("click", function() {
        if (volume >= 5) {
            volume -= 5; 
            setAndShowVol(); 
            if (currentUI.volume == 0) {
                muted = true; 
                $("#volMute").text("Unmute"); 
            }
        } 
    });
    $("#volMute").on("click", function() {
        if (muted == false) {
            muted = true; 
            volume = 0; 
            setAndShowVol(); 
            $("#volMute").text("Unmute"); 
        } else {
            muted = false; 
            volume = 5; 
            setAndShowVol(); 
            $("#volMute").text("Mute"); 
        }
    }); 

    $("#unpauseButton").on("click", function() {
        currentUI.running = true; 
        currentUI.game.player.canShoot = true;
        $("#pauseMenu").hide(); 
        $("#pauseButton").text("Pause"); 
        $("#pauseButton").css("background-color", "#7fcf0e"); 
        $("#playBoard").css("cursor", "none"); 
        $("#crossHair").show(); 
        if (currentUI.reloadInterrupted == true) {
            currentUI.handleReload(); 
            currentUI.reloadInterrupted = false; 
        }
    });

    $("#quitButton").on("click", function() {
        currentUI.game.strikes = 4; 
        currentUI.running = true; 
        currentUI.game.player.canShoot = true;
        $("#pauseMenu").hide(); 
        $("#pauseButton").text("Pause"); 
        $("#pauseButton").css("background-color", "#7fcf0e"); 
        $("#playBoard").css("cursor", "none"); 
        $("#crossHair").show(); 
    });

    $(document).keydown(function(e){
        if((e.keyCode == 27) && (currentUI != null) && (currentUI.running == true)){
            $(pauseButton).click();
        }
        else if ($("#pauseMenu").is(":visible")){
                $(unpauseButton).click();
        }
     });
}

setAndShowVol = function() {
    var audio = document.getElementsByClassName("hiddenAudio");
    for (var i = 0; i < audio.length; i ++) {
        audio.item(i).volume = volume / 100; 
    }
    $("#vol").text(volume + "%");
}

//starts the menu
duckHuntMenuStart = function () {

    document.getElementById("minugunAmmoBox").style.display = 'none';
    $(gunBox).hide();
    $(minigunBox).hide();
    $(crossHair).hide();

    $(menuLayer).show();


    console.log("Menu start");

}

//begins normal game
var duckHuntNormStart = function () {
    document.getElementById("ammoBox").style.display = 'block';
    document.getElementById("minigunAmmoBox").style.display = 'none';

    $(menuLayer).hide();

    $(gunBox).toggle();
    $(crossHair).toggle();

    console.log("game start");

    if (!gameStarted) {
        gameUI = new duckHuntUI(); 
        currentUI = gameUI;
        gameStarted = true; 
    } else {
        currentUI = gameUI;
        gameUI.running = true; 
        gameUI.playAgain(); 
    }

}

//begins alternate game if we want to do this
var duckHuntAltStart = function () {
    $(menuLayer).hide();
    $(minigunBox).toggle();
    $(crossHair).toggle();
    document.getElementById("ammoBox").style.display = 'none';
    document.getElementById("minigunAmmoBox").style.display = 'block';
    

    console.log("alt game start");

    if (!altStarted) {
        altUI = new easyHuntUI(); 
        currentUI = altUI;
        altStarted = true; 
    } else { 
        currentUI = altUI;
        altUI.running = true; 
        altUI.playAgain(); 
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


