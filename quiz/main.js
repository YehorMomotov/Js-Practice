const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question");

const numberOfQuestions = document.getElementById("number-of-question"),
  numberOfAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion = 0,
  indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer"),
  numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"),
  btnTryAgain = document.getElementById("btn-try-again");

const questions = [
  {
    question: "Как назывался Стамбул при Византийской империи?",
    options: ["Константинополь", "Андрианополь", "Стамбул", "Анкара"],
    rightAnswer: 0,
  },
  {
    question: "Какая столица Турции на момент 2021 года?",
    options: ["Стамбул", "Бейазан", "Анкара", "Анталья"],
    rightAnswer: 2,
  },
  {
    question: "С какими странами соседствует Польша?",
    options: [
      "Россия, Литва, Беларусь, Украина, Словения, Чехия, Германия",
      "Хорватия, Литва, Беларусь, Украина, Словакия, Чехия, Германия",
      "Литва, Беларусь, Украина, Словакия, Чехия, Германия",
      "Россия, Латвия, Беларусь, Словакия, Украина, Чехия, Германия",
    ],
    rightAnswer: 3,
  },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestions.innerHTML = indexOfPage + 1;
  indexOfQuestion++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }

      if (completedAnswers.length == 0) {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    completedAnswers.push(indexOfQuestion - 1);
  }
};
const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion - 1].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOpitons();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOpitons = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    console.log(item.dataset.id, questions[indexOfQuestion - 1].rightAnswer);
    if (item.dataset.id == questions[indexOfQuestion - 1].rightAnswer) {
      item.classList.add("correct");
    }
  });
};
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Выберите вариант ответа.");
  } else {
    indexOfPage++;
    randomQuestion();
    enableOptions();
  }
};
const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  load();
  randomQuestion();
  answerTracker();
});
