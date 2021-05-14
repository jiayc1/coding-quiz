
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var currentQuestionIndex = 0
var time = 85 

function startQuiz() {
    let startScreenEl = document.getElementById("start-screen");
    startScreenEl.classList.add('hide'); 


    questionsEl.classList.remove('hide');

    timerId = setInterval(clockTick, 1000);


    function getQuestion() {
        var currentQuestion = questions[currentQuestionIndex];

        var titleEl = document.getElementById("question-title");
        titleEl.textContent = currentQuestion.title;

        choicesEl.innerHTML = "";

        currentQuestion.choices.forEach(function (choice, i) {
            var li = document.createElement("li")
            li.classList.add("list-group-item")

            var choiceNode = document.createElement("button");
            choiceNode.classList.add('choice');
            choiceNode.setAttribute("value", choice);

            choiceNode.textContent = i + 1 + ". " + choice;

            choiceNode.onclick = questionClick;
            li.appendChild(choiceNode);


            choicesEl.appendChild(li);
        });
    }

    function questionClick() {
        if (this.value !== questions[currentQuestionIndex].answer) {
            time -= 5;
            if (time < 0) {
                time = 0;
            }

            timerEl.textContent = time;

        }
        else {
            currentQuestionIndex++
            moveOn()
        }

    }

   

    function moveOn() {
        if (currentQuestionIndex === questions.length) {
            quizEnd();
        } else {
            getQuestion();
        }

    }
   moveOn()
}

function quizEnd() {
    clearInterval(timerId);

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.classList.remove('hide');


    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.classList.add('hide');
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        if (window.localStorage != null) {
            var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

            var newScore = {
                score: time,
                initials: initials
            };

            highscores.push(newScore);
            window.localStorage.setItem("highscores", JSON.stringify(highscores));

            window.location.href = "highscores.html";
        }
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
