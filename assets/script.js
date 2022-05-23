
var quizContainer = document.getElementById("questionCard1");
var startButton1 = document.getElementById("start1");
var startCard = document.querySelector("#startCard1");
var scoreCard = document.getElementById("scoreCardUser");
var resultsContainer = document.getElementById("results");
var leaderBoardC = document.querySelector("#leaderBoardCard")


// var quizContainer = $('#quiz');


var timer1 = 6;
var timerInterval;
var timeDisplay = document.querySelector("#timer1")

function displayTimer1() {
  var timerInterval = setInterval(function() {
      timer1--;
      timeDisplay.textContent = timer1 + " seconds remaining...";

      if(timer1 === 0) {
            endQuiz();
            console.log("end time")
            clearInterval(timerInterval);
            
      }
  },1000);

}


var questionsEl = [
    {
        questionText: "Question 1",
        options: ["1. A", "2. B","3. C","4. D"],
        answer: "2. B",
    },
    {
        questionText: "Question 2",
        options: ["1. A", "2. B","3. C","4. D"],
        answer: "2. B",
    },
    {
        questionText: "Question 3",
        options: ["1. A", "2. B","3. C","4. D"],
        answer: "2. B",
    },
    {
        questionText: "Question 4",
        options: ["1. A", "2. B","3. C","4. D"],
        answer: "2. B",
    },        
    {
        questionText: "Question 5",
        options: ["1. A", "2. B","3. C","4. D"],
        answer: "2. B",
    },
];

function hideCards() {
    quizContainer.setAttribute("hidden", true)
    resultsContainer.setAttribute("hidden", true)
    scoreCard.setAttribute("hidden", true)
    leaderBoardC.setAttribute("hidden", true)

}

hideCards();


function startButtonF1() {
    
    startCard.setAttribute("hidden", true)
    quizContainer.removeAttribute("hidden", true)
}

startButton1.addEventListener("click", function() {
    
    startButtonF1();
    displayTimer1();
    currentQuestion = 0;
    renderQuestions();
})





function renderQuestions() {
    
    var question = questionsEl[currentQuestion];
    var options = question.options;
    var hQuestionEl = document.querySelector("#question1Text");
    hQuestionEl.textContent = question.questionText

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

function verifyAnswer (eventObject) {
    var optionBtn = eventObject.target;
    resultsContainer.style.display = "block";
if (optionIsCorrect(optionBtn)) {
    resultsText1.textContent = "correct"

} else {
    resultsText1.textContent = "incorrect";

}


currentQuestion ++;

var score1 = document.getElementById("score1")


if (currentQuestion < questionsEl.length) {
    renderQuestions();
} else {
    endQuiz();
    scoreCard.removeAttribute("hidden", true);
    score1.textContent = timer1;
}

}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.setAttribute("hidden", true);


}

var scoreButton = document.querySelector("#scoreBtn");
var userInput = document.querySelector("#inputFirstName")

scoreButton.addEventListener("click", storeScore)


function storeScore(x) {
    x.preventDefault();
    if (!userInput.value) {
        alert("Please enter your name before pressing submit!")
        return
    }

    var leaderBoardItem = {
        userInputN: userInput.value,
        scoreN: timer1,
    };

    updateStoredLeaderBoard(leaderBoardItem);
    hideCards();
    leaderBoardC.removeAttribute("hidden", true)
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
        var leaderBoardList = JSON.parse(storedLeaderBoard)
        return leaderBoardList;
    } else {
        leaderBoardList = [];
    
    }
    return leaderBoardList;
}



function renderLeaderBoard() {
    var sortLeaderBoardList = sortLeaderBoard();
    var highScoreList = document.querySelector("#highScoreList")
    highScoreList.innerHTML = " ";
    for (let i = 0; i < sortLeaderBoardList.length; i++) {
        var leaderBoardEntry = sortLeaderBoardList[i];
        var newLeaderBoardItem = document.createElement("li");
        newLeaderBoardItem.textContent = leaderBoardEntry.userInputN + " : " + leaderBoardEntry.score1;
        highScoreList.append(newLeaderBoardItem);
    }
}

function sortLeaderBoard() {
    var leaderBoardList = getLeaderBoard();
    if (!leaderBoardList) {
        return;
    }

    leaderBoardList.sort(function (a,b) {
        return b.score1 - a.score1;
    });
    return leaderBoardList
}

var backButton = document.querySelector("#backBTN");
backButton.addEventListener("click", returnToStart);

var clearButton = document.querySelector("#clearBTN")
clearButton.addEventListener("click", clearHighScores);

function clearHighScores () {
    localStorage.clear();
    renderLeaderBoard();
}



function returnToStart() {
    hideCards();
    console.log("cardhidden")
    startCard.removeAttribute("hidden", true)
}


var leaderBoardLink = document.querySelector("LeaderBoardLink")
leaderBoardLink.addEventListener("click", showLeaderBoard);

function showLeaderBoard() {
    hideCards();
    leaderBoardC.removeAttribute("hidden")
    clearInterval(timer1)
    renderLeaderBoard();
}





backButton?.addEventListener('click', () => {
    console.log('button clicked');
    returnToStart();
});

// function saveLastScore() {
//     var userScore = {
//     userName: userName.value,
//     score: score.value,
    
// };
//     localStorage.setItem("userScore", JSON.stringify(userScore));
// }

