var gameHTML;
var counter = 30;
var questionArray = [
  "Whose posts appear on the Instagram Feed?",
  "How does Instagram order the posts that appear on your Instagram Feed?",
  "How can someone check the date of a post?",
  "How do we zoom photos and videos?",
  "When did Instagram become 5 years old? ",
  "How many hours will someone's post appear on the Instagram Story feature? ",
  "What do hastags represent?",
  "The following are photographic filters of Instagram except which one?"
];
var answerArray = [
  [
    "People you are following",
    "Your followers",
    "Celebrities",
    "Trending profiles"
  ],
  [
    "Status of the profile",
    "Date the post was created",
    "Past records",
    "Number of followers"
  ],
  [
    "Bottom of the post",
    "Upper part of the post",
    "Right side of the post",
    "Left side of the post"
  ],
  ["Double tap", "Single tap", "Tap then pinch", "Pinch using two fingers"],
  ["2015", "2016", "2017", "2018"],
  ["12 hours", "24 hours", "36 hours", "48 hours"],
  ["Information", "Trend", "Activity", "Update"],
  ["Amaro", "Earlybird", "Ink", "Brannan"]
];
var correctAnswers = [
  "A. People you are following",
  "B. Date the post was created",
  "C. Bottom of the post",
  "C. Pinch using two fingers",
  "D. 2015",
  "A. 12 hours",
  "B. Trend",
  "D. Ink"
];
var questionCounter = 0;
var selecterAnswer;
var clock;
var correctAns = 0;
var incorrectAns = 0;
var unansweredTally = 0;
function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    "</p>";
  $(".maincontent").html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML =
    "<p>Time Remaining: <span class='timer'> 30</span></p><p>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  $(".maincontent").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 30;
    timerWrapper();
  } else {
    finalScreen();
  }
}

function timerWrapper() {
  clock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(clock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>All done, here's how you did!" +
    "</p>" +
    "<p>Correct Answers: " +
    correctAns +
    "</p>" +
    "<p>Wrong Answers: " +
    incorrectAns +
    "</p>" +
    "<p>Unanswered: " +
    unansweredTally +
    "</p>" +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".maincontent").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctAns = 0;
  incorrectAns = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

$(document).ready(function() {
  $("body").on("click", ".start-button", function(event) {
    $(".main-button-container").text(" ");
    event.preventDefault();
    gameHTML =
      "<p>Time Remaining: <span class='timer'> 30 </span></p><p>" +
      questionArray[questionCounter] +
      "</p><p class='first-answer answer'>A. " +
      answerArray[questionCounter][0] +
      "</p><p class='answer'>B. " +
      answerArray[questionCounter][1] +
      "</p><p class='answer'>C. " +
      answerArray[questionCounter][2] +
      "</p><p class='answer'>D. " +
      answerArray[questionCounter][3] +
      "</p>";
    $(".maincontent").html(gameHTML);

    clock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(clock);
        unansweredTally++;
        $(".maincontent").html(
          "<p>Time Remaining:" +
            counter +
            "</p>" +
            "<p>You ran out of time!  The correct answer was: " +
            correctAnswers[questionCounter] +
            "</p>"
        );
        setTimeout(wait, 4000);
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  });

  $("body").on("click", ".answer", function(event) {
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(clock);
      correctAns++;
      $(".maincontent").html(
        "<p>Time Remaining: <span class='timer'>" +
          counter +
          "</span></p>" +
          "<p>Correct! The answer is: " +
          correctAnswers[questionCounter] +
          "</p>"
      );
      setTimeout(wait, 4000);
    } else {
      clearInterval(clock);
      incorrectAns++;
      $(".maincontent").html(
        "<p>Time Remaining: <span class='timer'>" +
          counter +
          "</span></p>" +
          "<p>Wrong! The correct answer is: " +
          correctAnswers[questionCounter] +
          "</p>"
      );
      setTimeout(wait, 4000);
    }
  });

  $("body").on("click", ".reset-button", function(event) {
    resetGame();
  });
});
