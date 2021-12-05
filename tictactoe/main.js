const areaWrapper = document.querySelector(".area-wrapper"),
  modalOverlay = document.querySelector(".modal-window"),
  result = document.querySelector(".result"),
  restart = document.getElementById("restart"),
  scoreList = document.querySelector(".score");
let turn = 0;

let score =
  localStorage.getItem("score") !== null
    ? JSON.parse(localStorage.getItem("score"))
    : [0, 0];

areaWrapper.addEventListener("click", (event) => {
  if (
    (event.target.classList.contains = "box" && event.target.textContent === "")
  ) {
    turn % 2 === 0
      ? (event.target.textContent = "X")
      : (event.target.textContent = "0");
    turn++;
    check();
  }
});

const check = () => {
  const boxes = document.getElementsByClassName("box");
  const array = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < array.length; i++) {
    if (
      boxes[array[i][0]].innerHTML === "X" &&
      boxes[array[i][1]].innerHTML === "X" &&
      boxes[array[i][2]].innerHTML === "X"
    ) {
      prepareResult("Выиграл первый игрок");
      return;
    } else if (
      boxes[array[i][0]].innerHTML === "0" &&
      boxes[array[i][1]].innerHTML === "0" &&
      boxes[array[i][2]].innerHTML === "0"
    ) {
      prepareResult("Выиграл второй игрок");
      return;
    }
  }
  if (turn === 9) {
    prepareResult("Ничья!");
    return;
  }
};

const prepareResult = (winner) => {
  console.log(winner);
  winner === "Выиграл первый игрок" ? score[0]++ : score[1]++;
  result.textContent = winner;
  scoreList.innerHTML = `
            <li>Счет первого игрока: ${score[0]}</li>
            <li>Счет второго игрока: ${score[1]}</li>`;
  localStorage.setItem("score", JSON.stringify(score));
  modalOverlay.style.display = "flex";
};

restart.addEventListener("click", () => {
  window.location.reload();
});
