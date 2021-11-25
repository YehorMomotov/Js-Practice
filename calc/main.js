const current = document.querySelector(".current"),
  previous = document.querySelector(".previous");

const btns = document.querySelector(".btns"),
  ac = document.querySelector(".ac");

let result = "",
  second = "",
  sign = "",
  finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  action = ["-", "+", "X", "/", "+/-", "%"];

const clearAll = () => {
  result = "";
  second = "";
  sign = "";
  finish = false;
  previous.textContent = "";
  current.textContent = 0;
};
ac.addEventListener("click", clearAll);

btns.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;

  current.textContent = "";
  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (second === "" && sign === "") {
      result += key;
      current.textContent = result;
      previous.textContent = result.toString() + " ";
    } else if (result !== "" && second !== "" && finish) {
      second = key;
      finish = false;
      current.textContent = second;
      previous.textContent += second.toString();
    } else {
      second += key;
      current.textContent = second;
      previous.textContent += second.toString();
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    current.textContent = sign;
    previous.textContent += " " + sign.toString() + " ";
    return;
  }



          1000 - 7?



  if (key === "=") {
    previous.textContent += " " + key.toString() + " ";
    if (second === "") {
      second = result;
    }
    switch (sign) {
      case "+":
        result = +result + +second;
        break;
      case "-":
        result = result - second;
        break;
      case "X":
        result = result * second;
        break;
      case "/":
        if (second === "0") {
          current.textContent = "\u221E";
          result = "";
          second = "";
          sign = "";
          return;
        }
        result = result / second;
        break;
      case "+/-":
        result = -result;
        break;
      case "%":
        result = result % second;
        break;
    }
    finish = true;
    current.textContent = result;
  }
});
