// Get references to various elements in the HTML document
var introEl = document.getElementById("intro");
var questionSectionEl = document.getElementById("question-section");
var initialInputEl = document.getElementById("initial-input");
var highscoreEl = document.getElementById("highscore");
var startQuizEl = document.getElementById("start-quiz");
var questionTitleEl = document.getElementById("question-title");
var choiceListEl = document.getElementById("choice-list");
var timerEl = document.getElementById("timer");
var messageEl = document.getElementById("message");
var scoreEl = document.getElementById("score");
var highscoreListEl = document.querySelector("#highscore ol");
var submitBtn = document.getElementById("submit");
var goBackBtn = document.getElementById("goback-btn");
var clearHighscoreBtn = document.getElementById("clearHighscore");
var highscoresBtn = document.querySelector("header button"); // Highscores button
var setIntervalId; // Timer interval ID
var timeRemaining = questionData.length * 15; // Total time allowed for the quiz
var index = 0; // Index to track the current question

// Function to start the quiz
function startQuiz() {
    introEl.classList.add("hide");
    questionSectionEl.classList.remove("hide");
    renderQuestion();

    // Start the timer
    setIntervalId = setInterval(startTimer, 1000);
}

// Function to render a question
function renderQuestion() {
    messageEl.innerHTML = "";
    questionTitleEl.textContent = questionData[index].title;
    choiceListEl.textContent = "";

    // Create buttons for each choice of the current question
    for (var i = 0; i < questionData[index].choices.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = questionData[index].choices[i];
        li.appendChild(button);
        choiceListEl.appendChild(li);
    }
}

// Function to start the timer
function startTimer() {
    timerEl.textContent = timeRemaining--;
    // If time runs out, end the quiz
    if (timeRemaining < 0) {
        endQuiz();
    }
}

// Function to handle the next question or end the quiz
function nextQuestion(event) {
    var currentChoiceBtn = event.target;
    var solution = questionData[index].solution;
    index++;

    if (index < questionData.length) {
        // Check if the selected answer is correct or wrong
        if (currentChoiceBtn.textContent === solution) {
            messageEl.innerHTML = "<h4>Correct!</h4>";
        } else {
            messageEl.innerHTML = "<h4>Wrong!</h4>";
            timeRemaining -= 10; // Deduct time for a wrong answer
        }
        setTimeout(renderQuestion, 500);
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(setIntervalId); // Stop the timer
    questionSectionEl.classList.add("hide");
    initialInputEl.classList.remove("hide");
    scoreEl.textContent = timerEl.textContent; // Display final score
}

// Function to submit the score
function submitScore() {
    var initials = document.getElementById("initial").value.trim();
    if (initials !== "") {
        var score = parseInt(scoreEl.textContent);
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials: initials, score: score });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
        initialInputEl.classList.add("hide");
        highscoreEl.classList.remove("hide");
    } else {
        alert("Please enter your initials.");
    }
}

// Function to display high scores
function displayHighScores() {
    highscoreListEl.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score); // Sort high scores in descending order
    // Display high scores on the page
    highScores.forEach(function (score) {
        var li = document.createElement("li");
        li.textContent = score.initials + " - " + score.score;
        highscoreListEl.appendChild(li);
    });
}

// Function to clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}

// Event listeners for various buttons
startQuizEl.addEventListener("click", startQuiz);
choiceListEl.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitScore);
goBackBtn.addEventListener("click", function () {
    highscoreEl.classList.add("hide");
    introEl.classList.remove("hide");
});
clearHighscoreBtn.addEventListener("click", clearHighScores);

// Event listener for highscores button
highscoresBtn.addEventListener("click", function () {
    introEl.classList.add("hide");
    highscoreEl.classList.remove("hide");
});

// Display high scores on page load
displayHighScores();
