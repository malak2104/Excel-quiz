document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const homepage = document.getElementById('homepage');
    const quizContainer = document.getElementById('quiz-container');
    
    startBtn.addEventListener('click', function() {
        homepage.classList.add('animate__fadeOut');
        setTimeout(() => {
            homepage.style.display = 'none';
            quizContainer.style.display = 'block';
            quizContainer.classList.add('animate__fadeIn');
            startQuiz(); 
        }, 500);
    });
    
    quizContainer.style.display = 'none';
});

const questions = [
    {
        question: "What does the following formula do? =B2-B3",
        answers: [
            {text: "Add the value of cells B2 and C3", correct: false},
            {text: "Subtract the value of C3 from that of B2", correct: true},
            {text: "Multiply the values of cells B2 and C3", correct: false},
        ]
    },
    {
        question: "What does the formula return if E1 contains the value 15? =IF(10<E1,OK,Pas OK)",
        answers: [
            {text: "OK", correct: true},
            {text: "Pas OK", correct: false},
            {text: "15", correct: false},
        ]
    },
    {
        question: "What does this formula mean if it returns the error #NAME? =SUM(A1...B10)",
        answers: [
            {text: "A missing cell in the spreadsheet", correct: false},
            {text: "A division by zero was attempted", correct: false},
            {text: "An incorrect reference or a typo was made", correct: true},
        ]
    },
    {
        question: "You have a list of names in column A and their scores in column B. Which formula allows you to calculate the average of the scores?",
        answers: [
            {text: "=AVERAGE(B1:B10)", correct: true},
            {text: "=SUM(B1:B10)", correct: false},
            {text: "=AVERAGE(A1:A10)", correct: false},
        ]
    },
    {
        question: "What does the following formula do? =TRIM(A1)",
        answers: [
            {text: "Removes all special characters in A1", correct: false},
            {text: "Removes extra spaces in A1", correct: true},
            {text: "Rounds the numeric values in A1", correct: false},
        ]
    },
    {
        question: "What does the following formula return? =LEFT(A1,5)",
        answers: [
            {text: "The first 5 characters of cell A1", correct: true},
            {text: "The last 5 characters of cell A1", correct: false},
            {text: "5 characters from the middle of cell A1", correct: false},
        ]
    },
    {
        question: "In human resources, which formula allows you to calculate an end date while excluding weekends?",
        answers: [
            {text: "=TODAY()", correct: false},
            {text: "=WORKDAY()", correct: true},
            {text: "=DAYS()", correct: false},
        ]
    },
    {
        question: "What does the PROPER function do in Excel?",
        answers: [
            {text: "Puts all the text in upper case", correct: false},
            {text: "Puts all the text in lower case", correct: false},
            {text: "Puts the first letter of each word in upper case", correct: true},
        ]
    },
    {
        question: "In which field is Excel commonly used to calculate budgets and financial forecasts?",
        answers: [
            {text: "Marketing", correct: false},
            {text: "Accounting and finance", correct: true},
            {text: "Human resources", correct: false},
        ]
    },
    {
        question: "Which Excel function is commonly used in project management to insert the current date?",
        answers: [
            {text: "=DATE()", correct: false},
            {text: "=NOW()", correct: false},
            {text: "=TODAY()", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next <i class='fas fa-arrow-right'></i>";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `<i class="fas fa-question-circle"></i> ${questionNo} ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    questionElement.classList.remove("question-transition");
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    questionElement.classList.add("question-transition");
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    nextButton.style.display = "block";
    
    setTimeout(() => {
        questionElement.classList.remove("question-transition");
    }, 500);
}

function showScore() {
    resetState();
    questionElement.innerHTML = `
        <i class="fas fa-trophy"></i> 
        You scored ${score} out of ${questions.length}!
        <i class="fas fa-chart-pie"></i>
    `;
    questionElement.classList.add("score-reveal");
    nextButton.innerHTML = '<i class="fas fa-redo"></i> Play Again';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        document.getElementById("quiz-container").classList.add("animate__fadeOut");
        setTimeout(() => {
            document.getElementById("quiz-container").style.display = "none";
            document.getElementById("homepage").style.display = "block";
            document.getElementById("homepage").classList.remove("animate__fadeOut");
            document.getElementById("homepage").classList.add("animate__fadeIn");
        }, 500);
    }
});
startQuiz();