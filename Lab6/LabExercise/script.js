//Questions array related to Web-Based Interface Design
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks Texting Modern Layout", "High Transfer Modular Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "Which tag is used for adding CSS inside HTML?",
        options: ["<javascript>", "<style>", "<css>", "<link>"],
        answer: 1
    },
    {
        question: "What does CSS primarily control?",
        options: ["Web logic", "Database", "Page layout & design", "Server connection"],
        answer: 2
    },
    {
        question: "Which language is used for web interactivity?",
        options: ["CSS", "JavaScript", "SQL", "PHP"],
        answer: 1
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 30;
let TimerID;

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timeLeft = 30;
    TimerID = setInterval(() => {
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(TimerID);
            checkAnswer();
        }
        timeLeft--;
    }, 1000);
}

function displayQuestion() {
    const current = questions[currentIndex];
    document.getElementById("question").textContent = current.question;
    document.getElementById("options").innerHTML = "";

    current.options.forEach((opt, idx) => {
        const li = document.createElement("li");
        li.textContent = opt;
        li.onclick = () => selectAnswer(idx);
        document.getElementById("options").appendChild(li);
    })
}

let selectedOption = null;
function selectAnswer(selectedIndex) {
    selectedOption = selectedIndex;

    const options = document.querySelectorAll("#options li");
    options.forEach(opt => opt.classList.remove("selected"));
    options[selectedIndex].classList.add("selected");

    document.getElementById("submitBtn").disabled = false;
}
function checkAnswer() {
    clearInterval(TimerID);
    const feedback = document.getElementById("feedback");

    if (selectedOption === questions[currentIndex].answer) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";
    }

    document.getElementById("submitBtn").disabled = true;
    document.getElementById("nextBtn").disabled = false;
    document.getElementById("score").textContent = "Score: " + score;
}

function nextQuestion() {
    currentIndex++;
    selectedOption = null;
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("feedback").textContent = "";

    if (currentIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function startQuiz() {
    shuffleQuestions();
    currentIndex = 0;
    score = 0;
    document.getElementById("score").textContent = "";
    document.getElementById("startBtn").style.display = "none";
    displayQuestion();
    startTimer();
}

function endQuiz() {
    document.getElementById("question").textContent = "Quiz Finished!";
    document.getElementById("options").innerHTML =  "";
    document.getElementById("score").textContent = `Your Score: ${score}/${questions.length}`;
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("startBtn").style.display = "inline-block";
}

//Button Event Listeners
document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("submitBtn").addEventListener("click", checkAnswer);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);