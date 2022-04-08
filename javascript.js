// array of the questions and answers
var questions = [{
        question: "What does DOM stand for?",
        choices: ["Document Object Model ", "Desktop Oriented Mode ", "Digital Overload Marketing ", "Dessert On Milo "],
        answer: "Document Object Model "
    },

    {
        question: "What attribute is used in HTML to decorate content?",
        choices: ["class", "rel", "style ", "src", ],
        answer: "style "
    },

    {
        question: "Commonly used data types DO NOT include?",
        choices: ["booleans", "alerts ", "numbers ", "strings "],
        answer: "alerts "
    }

]

//variables for the quiz.
var startContainer = document.getElementById("startcontainer");
var score = 0;
var questionIndex = 0;
var startBtn = document.getElementById("startbtn");
var restartBtn = document.getElementById("restartbtn");
var submitBtn = document.getElementById("sumbitbtn");
var backBtn = document.getElementById("backbtn");

var timeLeft = document.getElementById("timeLeft");
var secsLeft = 75;
var timer = document.getElementById("timer");
var timesOver = document.getElementById("timesover")


var questionDiv = document.getElementById("quizContainer");
var questionTitle = document.getElementById("questionTitle");
var answer1 = document.getElementById("btn1");
var answer2 = document.getElementById("btn2");
var answer3 = document.getElementById("btn3");
var answer4 = document.getElementById("btn4");
var answerCheck = document.getElementById("answerCheck");

var highscores = document.getElementById("highscores");
var viewHighScore = document.getElementById("get-score");
var scoreList = document.getElementById("scoreList");

var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var initials = document.getElementById("initials");

var correctAns = 0;
var questionNum = 0;
var scoreResult = 0;
var questionIndex = 0;
var questionRandom;

mainScreen();
//function to show the main screen only
function mainScreen() {
    startContainer.style.display = "block"
    summary.style.display = "none"
    highscores.style.display = "none"
    questionDiv.style.display = "none"
    timesOver.style.display = "none"
}
//newquiz function for the timer to start and quiz to begin
function newQuiz() {


    questionIndex = 0;
    scoreResult = 0;
    secsLeft = 75;
    timeLeft.textContent = secsLeft;
    initials.textContent = "";
    startContainer.style.display = "none";
    summary.style.display = "none";
    questionDiv.style.display = "block";

    var timerCount = setInterval(function() {
        secsLeft--;
        timeLeft.textContent = secsLeft;

        if (secsLeft === 0) {
            console.log("timer")
            clearInterval(secsLeft);
            clearInterval(timerCount);
            timesOver.style.display = "block";
            timer.style.display = "none";
            timeLeft.style.display = "none";
            gameOver();

        }


    }, 1000);

    showQuiz();

}


function showQuiz() {
    nextQuestion();
    console.log("working")
}
//function for the questions to pop up
function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    answer1.textContent = questions[questionIndex].choices[0];
    answer2.textContent = questions[questionIndex].choices[1];
    answer3.textContent = questions[questionIndex].choices[2];
    answer4.textContent = questions[questionIndex].choices[3];
}

// function to correctly check the answers giving you green "correct".
function checkAns(answer) {
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        scoreResult++;
        answerCheck.textContent = "Correct"
        answerCheck.style.color = "green";
        console.log("corr")
    } else { // to show red and "incorrect"
        secsLeft -= 5;
        answerCheck.textContent = "Incorrect";
        answerCheck.style.color = "red";
        console.log("incorr")

    }
    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
        timesOver.style.display = "block"
        timer.style.display = "none";
        timeLeft.style.display = "none"
    }
    //if the timer reaches zero gameOver
    if (secsLeft === 0) {
        gameOver();
    }

}

function choose0() { checkAns(0) };

function choose1() { checkAns(1) };

function choose2() { checkAns(2) };

function choose3() { checkAns(3) };

//function to show your final score of the quiz
function gameOver() {

    console.log("jkjkjkkjkj")

    startContainer.style.display = "none";
    summary.style.display = "block";
    highscores.style.display = "none";
    questionDiv.style.display = "none";
    timer.style.display = "none";
    timesOver.style.display = "block";

    finalScore.textContent = scoreResult
}
// local storage wont save
function storeScores(event) {
    event.preventDefault();

    var storeHighScore = localStorage.getItem("high scores");
    var arrayScores;

    if (!storeHighScore) {
        arrayScores = [];
    } else {
        arrayScores = JSON.parse(storeHighScore)
    }
    var userScore = {
        initials: initials.value,
        score: finalScore.textContent
    };
    console.log(userScore)
    arrayScores.push(userScore);

    var scoreString = JSON.stringify(arrayScores);
    window.localStorage.setItem("high scores", scoreString);

    showScore();
}

var i = 0

function showScore() {
    startContainer.style.display = "none";
    summary.style.display = "none";
    highscores.style.display = "block";
    questionDiv.style.display = "none";
    timesOver.style.display = "none";
    timer.style.display = "none";
    var saveScore = localStorage.getItem("high scores");
    if (saveScore === null) {
        return;
    }
    var storeHighScore = JSON.parse(saveScore);

    for (; i < storeHighScore.length; i++) {
        var newScore = document.createElement("p");
        newScore = storeHighScore[i].initials + "- Score:" + storeHighScore[i].score;
        // problem
        scoreList.appendChild(newScore);
    }
}

//addEventListener on click to start quiz and choose your answers
startBtn.addEventListener("click", newQuiz);
answer1.addEventListener("click", choose0);
answer2.addEventListener("click", choose1);
answer3.addEventListener("click", choose2);
answer4.addEventListener("click", choose3);
//addEventListener on click to submit your score in local storage
submitBtn.addEventListener("click", function(event) {
    storeScores(event)
});
//addEventListener on click to restart the quiz.
restartBtn.addEventListener("click", function() {
    startContainer.style.display = "block";
    highscores.style.display = "none";
});
//add EventListener on click to view highscores.
viewHighScore.addEventListener("click", function(event) {
    showScore(event)
});
// add EventListener on click to exit high scores and return to quiz.
backBtn.addEventListener("click", function() {
    startContainer.style.display = "block";
    highscores.style.display = "none";
});