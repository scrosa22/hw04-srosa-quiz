var quizContainer = document.getElementById("questionCard1");
var startButton1 = document.getElementById("start1");
var startCard = document.querySelector("#startCard1");
var scoreCard = document.getElementById("scoreCardUser");
var resultsContainer = document.getElementById("results");
var leaderBoardC = document.querySelector("#leaderBoardCard");


var timer1 = 100;
var timerInterval = setInterval(countdown, 1000)
var timeDisplay = document.querySelector("#timer1");



function displayTimer1() {
    timeDisplay.textContent = timer1 + " seconds remaining...";
}

function countdown(){
    timer1--;
    timeDisplay.textContent = timer1 + " seconds remaining...";
    displayTimer1();
    if (timer1 === 0) {
        clearInterval(timerInterval)
        quizContainer.setAttribute("hidden", true)
        scoreCard.removeAttribute("hidden", true);
    }
}

var questionsEl = [
  {
    questionText: "Question 1",
    options: ["1. A", "2. B", "3. C", "4. D"],
    answer: "2. B",
  },
  {
    questionText: "Question 2",
    options: ["1. A", "2. B", "3. C", "4. D"],
    answer: "2. B",
  },
  {
    questionText: "Question 3",
    options: ["1. A", "2. B", "3. C", "4. D"],
    answer: "2. B",
  },
  {
    questionText: "Question 4",
    options: ["1. A", "2. B", "3. C", "4. D"],
    answer: "2. B",
  },
  {
    questionText: "Question 5",
    options: ["1. A", "2. B", "3. C", "4. D"],
    answer: "2. B",
  },
];

function hideCards() {
  quizContainer.setAttribute("hidden", true);
  resultsContainer.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  leaderBoardC.setAttribute("hidden", true);
}

hideCards();


function startButtonF1() {
  startCard.setAttribute("hidden", true);
  quizContainer.removeAttribute("hidden", true);
  displayTimer1();
}

startButton1.addEventListener("click", function () {
  startButtonF1();
  currentQuestion = 0;
  renderQuestions();
});

function renderQuestions() {

  var question = questionsEl[currentQuestion];
  var options = question.options;
  var hQuestionEl = document.querySelector("#question1Text");
  hQuestionEl.textContent = question.questionText;

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var optionBtn = document.querySelector("#option" + i);
    optionBtn.textContent = option;
  }
}

document.querySelector("#quizOptions").addEventListener("click", verifyAnswer);

var resultsText1 = document.getElementById("results");

function optionIsCorrect(optionBtn) {
  return optionBtn.textContent === questionsEl[currentQuestion].answer;
}

function verifyAnswer(eventObject) {
  var optionBtn = eventObject.target;
  resultsContainer.style.display = "block";
  if (optionIsCorrect(optionBtn)) {
    resultsText1.textContent = "correct";
    setTimeout(timer1,1000)
  } else {
    resultsText1.textContent = "incorrect";
    setTimeout(timer1, 1000)
    if (timer1 >= 10) {
        timer1 = timer1 - 10
    }
  }

  currentQuestion++;

  var score1 = document.getElementById("score1");

  if (currentQuestion < questionsEl.length) {
    renderQuestions();
  } else {
    endQuiz();
    clearInterval(timerInterval);
    scoreCard.removeAttribute("hidden", true);
    score1.textContent = timer1;

  }
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.setAttribute("hidden", true);
}

var scoreButton = document.querySelector("#scoreBtn");
var userInput = document.querySelector("#inputFirstName");

scoreButton.addEventListener("click", storeScore);

function storeScore(x) {
    clearInterval(timerInterval);
  x.preventDefault();
  if (!userInput.value) {
    alert("Please enter your name before pressing submit!");
    return;
  }

  var leaderBoardItem = {
    userInputN: userInput.value,
    scoreN: score1.textContent,
  };
  
  updateStoredLeaderBoard(leaderBoardItem);
  hideCards();
  leaderBoardC.removeAttribute("hidden", true);
  renderLeaderBoard();
}

function updateStoredLeaderBoard(leaderBoardItem) {
  var leaderBoardList = getLeaderBoard();

  leaderBoardList.push(leaderBoardItem);
  localStorage.setItem("leaderBoardList", JSON.stringify(leaderBoardList));
}

function getLeaderBoard() {
  var storedLeaderBoard = localStorage.getItem("leaderBoardList");
  if (storedLeaderBoard !== null) {
    var leaderBoardList = JSON.parse(storedLeaderBoard);
    return leaderBoardList;
  } else {
    leaderBoardList = [];
  }
  return leaderBoardList;
}

function renderLeaderBoard() {
  var sortLeaderBoardList = sortLeaderBoard();
  var highScoreList = document.querySelector("#highScoreList");
  highScoreList.innerHTML = " ";
  for (let i = 0; i < sortLeaderBoardList.length; i++) {
    var leaderBoardEntry = sortLeaderBoardList[i];
    var newLeaderBoardItem = document.createElement("li");
    newLeaderBoardItem.textContent = leaderBoardEntry.userInputN + " : " + leaderBoardEntry.scoreN;
    highScoreList.append(newLeaderBoardItem);
  }
}

function sortLeaderBoard() {
  var leaderBoardList = getLeaderBoard();
  if (!leaderBoardList) {
    return;
  }

  leaderBoardList.sort(function (a, b) {
    return b.score1 - a.score1;
  });
  return leaderBoardList;
}

var backButton = document.querySelector("#backBTN");
backButton.addEventListener("click", returnToStart);

var clearButton = document.querySelector("#clearBTN");
clearButton.addEventListener("click", clearHighScores);

function clearHighScores() {
  localStorage.clear();
  renderLeaderBoard();
}

function returnToStart() {
  hideCards();
  console.log("cardhidden");
  startCard.removeAttribute("hidden", true);
}

var leaderBoardLink = document.querySelector("#LeaderBoardLink");
leaderBoardLink.addEventListener("click", showLeaderBoard);

function showLeaderBoard() {
  hideCards();
  startCard.setAttribute("hidden", true)
  leaderBoardC.removeAttribute("hidden", true);
  renderLeaderBoard();
}


