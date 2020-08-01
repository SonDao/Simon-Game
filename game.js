const colors = ["red", "green", "blue", "yellow"];
let compChoice = [];
let userChoice = [];
let gameLevel = 0;
let userLevel = 0;

$(".btn").click(function() {

  let clickedColor = $(this).attr("id");
  userChoice.push(clickedColor);

  playSound(clickedColor);
  playAnimation(clickedColor);

  userLevel++;
  compareAt(userLevel);

});

$(document).keypress(function() {
  // stuff
  if (gameLevel === 0) {
    newCompChoice();
  }
});

function gameOver() {
  // reset board
  compChoice = [];
  userChoice = [];
  gameLevel = 0;
  userLevel = 0;

  playSound("wrong");

  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);


}

function newCompChoice() {
  gameLevel++;
  const newText = "Level " + gameLevel;
  $("#level-title").text(newText);
  const randomIndex = Math.floor(Math.random() * 4);
  const randomColor = colors[randomIndex];
  compChoice.push(randomColor);
  playSound(randomColor);
  playAnimation(randomColor);
}

function compareAt(index) {
  if (userChoice[index - 1] === compChoice[index - 1]) {
    if (userLevel === gameLevel) {
      userLevel = 0;
      userChoice = [];
      setTimeout(function() {
        newCompChoice();
      }, 500);
    }

  } else {
    gameOver();
  }

}

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function playAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
