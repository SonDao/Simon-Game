
var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;
var numberOfClick = 0;

// start the game at any keypress
$(document).keypress(function() {
  if (gameLevel === 0) {
    newSequence();
  }
})

// choose a random color and add it to the game pattern
function newSequence() {
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  playAnimation(randomColor);
  // console.log(gamePattern)
}

// listen for the click and then compare it to the game pattern
$(".btn").click(function() {
  var clickedColor = $(this).attr("id");
  userPattern.push(clickedColor);
  playSound(clickedColor);
  playAnimation(clickedColor);

  numberOfClick++;
  compareAt(numberOfClick);
  // console.log(userPattern);
});

function playSound(color) {
  var audio = new Audio("sounds/" + color +'.mp3');
  audio.play();
}

function playAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// the function resets the board and modifies some css elements
function gameOver () {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  // reset the board
  gameLevel = 0;
  numberOfClick = 0;
  gamePattern = [];
  userPattern = [];
}
// this function compares the user input to the game pattern at given index
function compareAt(index) {
  if(userPattern[index - 1] === gamePattern[index - 1]) {
    if (index === gameLevel) {
      // reset the user inputs and start newSequence
      userPattern = [];
      numberOfClick = 0;
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  }
  else
   gameOver();
}
