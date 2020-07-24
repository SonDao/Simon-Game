const colors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;
var userLevel = 0;
//keypressed, start game
  $(document).keypress(function() {
    if (gameLevel === 0){
      console.log("game started");
      newSequence();
    }
});
//click
$(".btn").click(function() {
  var clickedColor = $(this).attr("id");
  userPattern.push(clickedColor);
  playSound(clickedColor);
  playAnimation(clickedColor);

  userLevel++;
  if (gameLevel !== 0) {
    compareAtIndex(userLevel);
  }
})
//add new sequence
function newSequence() {
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);
  // push a random color to gamePattern[]
  var index = Math.floor(Math.random() * 4);
  var randomColor = colors[index];
  gamePattern.push(randomColor);
  // console.log(gamePattern);
  playSound(randomColor);
  playAnimation(randomColor);
}
//compareAt(index)
function compareAtIndex(index) {
  if (userPattern[index - 1] === gamePattern[index - 1]) {
    if (index === gameLevel) {
      //reset the player inputs
      userLevel = 0;
      userPattern = [];
      //user got the patttern corect, create a new Level
      setTimeout(function () {
       newSequence();
     }, 1000);
    }
  }
  else {
    gameOver();
  }
}
//playSound
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
//playAnimation
function playAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed"); }, 100);
}
//game over, reset the board
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200)
  // reset board
  gamePattern = [];
  userPattern = [];
  gameLevel = 0;
  userLevel = 0;
}
