
var quizContainer = document.getElementById("questionCard1");
var startButton1 = document.getElementById("start1");
var resultsContainer = document.getElementById("results");
var startCard = document.getElementById("startCard1");



// var quizContainer = $('#quiz');

var timer1 = 60;

var timeDisplay = document.querySelector("#timer1")

function displayTimer1() {
  var timerInterval = setInterval(function() {
      timer1--;
      timeDisplay.textContent = timer1 + " seconds remaining...";

      if(timer1 === 0) {
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

            
    
];

function hideCards() {
    quizContainer.setAttribute("hidden", true)
    resultsContainer.setAttribute("hidden", true)

}

hideCards();


function startButtonF1() {
    
    startCard.setAttribute("hidden", true)
    quizContainer.removeAttribute("hidden", true)
}

startButton1.addEventListener("click", function() {
    
    startButtonF1();
    displayTimer1();
    renderQuestions();
})



var currentQuestion;

function renderQuestions() {
    currentQuestion = 0;
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





// function renderQuestions() {
//     chosenQuestion = questionsEl[math.floor(math.random() * questionsEl.length)];

//     for (var i = 0; i < 'variable'; i++){  }

// }


//  function createing question cards
// var quest1 = document.createElement("div");
// quest1.text("question 1 loading")
// quizContainer.appendChild(quest1)

// function saveLastScore() {
//     var userScore = {
//     userName: userName.value,
//     score: score.value,
    
// };
//     localStorage.setItem("userScore", JSON.stringify(userScore));
// }

