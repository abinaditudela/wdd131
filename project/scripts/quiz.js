// quiz.js
const quizData = [
    {
        question: "What is the minimum recommended cage size for an adult rabbit?",
        options: ["30x30x30 cm", "60x60x60 cm", "90x90x90 cm"],
        correct: 1
    },
    {
        question: "Which of the following is NOT a recommended bedding material for rabbits?",
        options: ["Untreated wood shavings", "Straw", "Treated sawdust"],
        correct: 2
    },
    {
        question: "How often should rabbit cages be thoroughly cleaned?",
        options: ["Daily", "Weekly", "Monthly"],
        correct: 1
    },
    {
        question: "What is the average protein content of rabbit meat?",
        options: ["15.5%", "18.5%", "21.5%"],
        correct: 2
    },
    {
        question: "Compared to other meats, rabbit meat is particularly low in:",
        options: ["Protein", "Sodium", "Vitamins"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function loadQuiz() {
    const quizElement = document.getElementById('quiz');
    const currentQuizData = quizData[currentQuestion];

    quizElement.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <div class="options">
            ${currentQuizData.options.map((option, index) => 
                `<div class="option" data-index="${index}">${option}</div>`
            ).join('')}
        </div>
    `;

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });

    document.getElementById('submit').disabled = true;
}

function selectOption(e) {
    if (selectedOption !== null) {
        document.querySelectorAll('.option')[selectedOption].classList.remove('selected');
    }
    selectedOption = parseInt(e.target.getAttribute('data-index'));
    e.target.classList.add('selected');
    document.getElementById('submit').disabled = false;
}

function submitQuiz() {
    if (selectedOption !== null) {
        const options = document.querySelectorAll('.option');
        options[selectedOption].classList.add(selectedOption === quizData[currentQuestion].correct ? 'correct' : 'incorrect');
        options[quizData[currentQuestion].correct].classList.add('correct');

        if (selectedOption === quizData[currentQuestion].correct) {
            score++;
        }

        document.querySelectorAll('.option').forEach(option => {
            option.removeEventListener('click', selectOption);
        });

        document.getElementById('submit').innerHTML = currentQuestion === quizData.length - 1 ? 'Show Results' : 'Next Question';
        document.getElementById('submit').onclick = currentQuestion === quizData.length - 1 ? showResults : nextQuestion;
    }
}

function nextQuestion() {
    currentQuestion++;
    selectedOption = null;
    loadQuiz();
}

function showResults() {
    const quizElement = document.getElementById('quiz');
    quizElement.innerHTML = `
        <div class="result">
            <h2>You scored ${score} out of ${quizData.length}</h2>
            <button onclick="location.reload()">Restart Quiz</button>
        </div>
    `;
    document.getElementById('submit').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    document.getElementById('submit').addEventListener('click', submitQuiz);
});