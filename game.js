var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function(event){
    

    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePresss(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePresss(currentColour){

    $("#" + currentColour).addClass("pressed");    

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  
      } else {
  
        console.log("wrong");
  
        playSound("wrong");
  
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
      }
}

function startOver() {
    
    level = 0;
    gamePattern = [];
    started = false;
  }
  