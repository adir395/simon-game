//// Made by Adir Melker

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //save all the button that computer random select
var userClickedPattern = []; //save all the buttun that user select
var notPressA = true; //check if the user press on the button a
var level = 0; //var that save the level that the user have reach
var checklLvl = 0; //var for checking if the gamePattern array and the userClickedPattern is equal
var j = 0; //for stupiedMan array
var c = 0; //var to the for loop in nextSequence


$(document).keypress(function(event) {
  if (event.code.replace("Key", "").toLowerCase() == "a" && notPressA == true) {
    notPressA = false;
    nextSequence();
  }

});


$(".btn").click(function() {
  if (notPressA == false) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer();
  } else {
    var stupidMan = ["Press A!!", "That Not So Hard", "Just Press A👎", "I Give Up..."];
    $("#level-title").text(stupidMan[j]);
    j++;
  }

});


function nextSequence() {
  level++;
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  c = 0;
  for (var i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      $("#" + gamePattern[c]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[c]);
      c++;

    }, 300 * (i + 1));

  }
  $("#level-title").text("Level " + level);
}


function checkAnswer() {

  if (userClickedPattern[checklLvl] == gamePattern[checklLvl] && checklLvl == level - 1) {
    checklLvl = 0;
    userClickedPattern = [];
    setTimeout(nextSequence, 500);
    return;
  }
  if (userClickedPattern[checklLvl] == gamePattern[checklLvl]) {
    checklLvl++;
    return;

  }
  if (userClickedPattern[checklLvl] != gamePattern[checklLvl]) {
    gamePattern = [];
    userClickedPattern = [];
    checklLvl = 0;
    level = 0;
    notPressA = true;
    worng();

  }
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function worng() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 250);
  $("#level-title").text("Game Over, Press A to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function animatePress(currentColour) {
  var self = $("." + currentColour);
  self.addClass("pressed");
  setTimeout(function() {
    self.removeClass("pressed");
  }, 100);

}
