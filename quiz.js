const readline = require('readline');

const questions = [
  {
    question: "What is the capital of France?",
    options: ["1) Berlin", "2) Madrid", "3) Paris", "4) Rome"],
    correctAnswer: 3
  },
  {
    question: "What is 2 + 2?",
    options: ["1) 3", "2) 4", "3) 5", "4) 6"],
    correctAnswer: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["1) Atlantic", "2) Indian", "3) Pacific", "4) Arctic"],
    correctAnswer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timeRemaining = 10;
let intervalId;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  const question = questions[currentQuestion];
  console.log(`\n${question.question}`);
  question.options.forEach(option => console.log(option));

  timeRemaining = 10;
  intervalId = setInterval(() => {
    timeRemaining--;
    console.log(`Time remaining: ${timeRemaining}s`);
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      console.log('Time is up!');
      moveToNextQuestion(false);
    }
  }, 1000);

  rl.question('Your answer (1-4): ', answer => {
    clearInterval(intervalId);
    if (answer >= 1 && answer <= 4) {
      if (parseInt(answer) === question.correctAnswer) {
        console.log('Correct!');
        score++;
      } else {
        console.log('Wrong answer!');
      }
      moveToNextQuestion(true);
    } else {
      console.log('Invalid input. Moving to next question.');
      moveToNextQuestion(false);
    }
  });
}

function moveToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    askQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  console.log(`\nQuiz finished! Your score is ${score} out of ${questions.length}.`);
  rl.close();
}

// Start the quiz
console.log('Welcome to the Quiz! You have 10 seconds to answer each question.');
askQuestion();
