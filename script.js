alert("JS works");
console.log("game started");
// Quiz data
const quizzes = [
  {
    question: "Which Resident Evil game is set in a mansion?",
    answers: ["RE7: Biohazard", "RE1: Director's Cut", "RE5: Gold Edition", "RE8: Village"],
    correct: 1
  },
  {
    question: "What is a key tool for digital artists to create detailed work?",
    answers: ["Paint brush", "Graphics tablet", "Fountain pen", "Charcoal stick"],
    correct: 1
  },
  {
    question: "In Resident Evil, what is the viral infection called?",
    answers: ["T-virus", "X-virus", "C-virus", "V-virus"],
    correct: 0
  },
  {
    question: "What artistic technique creates depth using light and shadow?",
    answers: ["Stippling", "Chiaroscuro", "Pointillism", "Glazing"],
    correct: 1
  },
  {
    question: "Which horror game features iconic zombie encounters?",
    answers: ["Silent Hill", "The Witcher", "Resident Evil series", "Outlast"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('quizScreen').classList.add('active');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const question = quizzes[currentQuestion];

  document.getElementById('questionNumber').textContent =
    `Question ${currentQuestion + 1} of ${quizzes.length}`;

  document.getElementById('questionText').textContent = question.question;

  const progressPercent = (currentQuestion / quizzes.length) * 100;
  document.getElementById('progressFill').style.width =
    progressPercent + '%';

  const answersGrid = document.getElementById('answersGrid');
  answersGrid.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = answer;
    button.onclick = () => selectAnswer(index);
    answersGrid.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;

  answered = true;

  const question = quizzes[currentQuestion];
  const buttons = document.querySelectorAll('.answer-button');

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === question.correct) {
      btn.classList.add('correct');
    } else if (i === index && index !== question.correct) {
      btn.classList.add('incorrect');
    }
  });

  if (index === question.correct) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < quizzes.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  document.getElementById('quizScreen').classList.remove('active');

  const percentage = (score / quizzes.length) * 100;

  document.getElementById('scoreDisplay').textContent =
    `${score}/${quizzes.length}`;

 document.getElementById('keysScreen').classList.add('active');
return; 

  document.getElementById('resultsScreen').classList.add('active');

  let message = '';

  if (percentage >= 80) {
    message = "AMAZING! You crushed this birthday challenge! 🎮";
  } else if (percentage >= 60) {
    message = "NICE TRY! Pretty solid knowledge there! 🎯";
  } else if (percentage >= 40) {
    message = "Good start! Want to give it another shot? 💪";
  } else {
    message = "No worries! Every legend has to start somewhere. 🌟";
  }

  document.getElementById('resultsMessage').textContent = message;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  document.getElementById('resultsScreen').classList.remove('active');
  document.getElementById('victoryScreen').classList.remove('active');
  document.getElementById('nearVictoryScreen').classList.remove('active');

  document.getElementById('welcomeScreen').style.display = 'block';
}
let keysFound = 0;

function collectKey(key){

  if(key.classList.contains("collected")) return;

  key.classList.add("collected");

  keysFound++;

  document.getElementById("keyCounter").textContent =
    `Keys Found: ${keysFound}/3`;

  if(keysFound === 3){
    document.getElementById("chestBtn").style.display = "inline-block";
  }
}

function openChest(){

  document.getElementById("keysScreen")
    .classList.remove("active");

  document.getElementById("victoryScreen")
    .classList.add("active");
}
function showPrizePage(){

  document.getElementById("victoryScreen")
    .classList.remove("active");

  document.getElementById("prizeScreen")
    .classList.add("active");

}
