const questions = [
  {
    question : "Which of the following is not a Java primitive data type?",
    answers:[
      {text: "int", correct: false},
      {text: "String", correct: true},
      {text: "boolean", correct: false},
      {text: "float", correct: false},

    ]
   
  },
  {
    question : "Which method is used to start a thread execution in Java?",
    answers:[
      {text: "Start()", correct: true},
      {text: "run()", correct: false},
      {text: "init() ", correct: false},
      {text: "main()", correct: false},

    ] 
  },
  {
    question : "What is the default value of a local variable in Java?",
    answers:[
      {text: "null", correct: false},
      {text: "0", correct: false},
      {text: "undefined", correct: false},
      {text: "No default value", correct: true},

    ]
  },
  {
    question : "Which of the following is used to handle exceptions in Java?",
    answers:[
      {text: "if-else", correct: false},
      {text: "try-catch", correct: true},
      {text: "switch-case", correct: false},
      {text: "for-loop", correct: false},

    ]
  }
];


const questionElement =document.getElementById("question");
const answerButton =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score =0;


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML ="Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex +1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach( answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
      
    }
    button.addEventListener("click", selectAnswer);
  });
}



function resetState() {
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);

  }
}

 function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display="block";


 }


 function showScore(){
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = " play Again";
  nextButton.style.display = " block";

 }

 function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore(); 
  }
 }

 nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }else{
    startQuiz();
  }
 });

startQuiz();