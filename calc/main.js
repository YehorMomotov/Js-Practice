const current = document.querySelector(".current"),
  previous = document.querySelector(".previous");

const btns = document.querySelector(".btns"),
  ac = document.querySelector(".ac");

const history = {
  first: "",
  second: "",
  sign: "",
  equal: "=",
};

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
  previous.textContent = 0;
  current.textContent = 0;
  history.first = "";
  history.second = "";
  history.sign = "";
};
ac.addEventListener("click", clearAll);

btns.addEventListener("click", (event) => {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;

  current.textContent = "";
  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (second === "" && sign === "") {
      key && result > 0 ? (result += key) : (result = key);
      current.textContent = result;
      history.first = Math.round(Number(result));
      history.second = "";
      history.sign = "";
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
    } else if (result !== "" && second !== "" && finish) {
      second = key;
      finish = false;
      history.second = second;
      current.textContent = second;
      console.log(second);
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
    } else {
      second += key;
      second = Math.round(Number(second));
      current.textContent = second;
      history.second = second;
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    if (key === "+/-") {
      if (finish) {
        result = -result;
        current.textContent = result;
        return;
      }
      if (result !== "" && second === "") {
        result = -result;
        current.textContent = result;
        history.first = result;
        result > 0
          ? (history.first = result)
          : (history.first = "(" + result + ")");
      }
      if (second !== "") {
        second = -second;
        current.textContent = second;
        second > 0
          ? (history.second = second)
          : (history.second = "(" + second + ")");
      }
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
      return;
    }
    if (result !== "" && second !== "" && finish) {
      second = "";
      result = Math.round(Number(result));
      history.first = result;
      history.sign = sign;
      history.second = "";
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
      current.textContent = result;
      return;
    }
    second = "";
    history.sign = sign;
    history.first = Math.round(Number(result));
    current.textContent = sign;
    previous.textContent =
      history.first + " " + history.sign + " " + history.second;
    return;
  }

  if (key === "=") {
    previous.textContent =
      history.first +
      " " +
      history.sign +
      " " +
      history.second +
      " " +
      history.equal;

    if (second === "" && action.includes(sign)) {
      result = Math.round(Number(result));
      second = result;
      history.second = Math.round(Number(result));
      previous.textContent =
        history.first + " " + history.sign + " " + history.second;
    }
    switch (sign) {
      case "+":
        result = +result + +second;
        result = Math.round(Number(result));
        if (result !== history.first) {
          history.first = Math.round(Number(result)) - second;
        }
        break;
      case "-":
        result = result - second;
        result = Math.round(Number(result));
        if (result !== history.first) {
          history.first = Math.round(Number(result)) + second;
        }
        break;
      case "X":
        result = result * second;
        result = Math.round(Number(result));
        if (result !== history.first) {
          history.first = Math.round(Number(result)) / second;
        }
        break;
      case "/":
        if (second === 0) {
          current.textContent = "\u221E";
          result = "";
          second = "";
          sign = "";
          return;
        }
        result = result / second;
        result = Math.round(Number(result));
        if (result !== history.first) {
          history.first = Math.round(Number(result)) * second;
        }
        break;
      case "%":
        if (result !== history.first) {
          console.log(
            `${result} - ${second} *(${result}%${second}) = ${
              result - second * (result % second) + second * 2
            }`
          );
          result % second !== 0
            ? result > second
              ? (history.first =
                  result - second * (result % second) + second * 2)
              : (history.first = result)
            : (history.first = result - second * (result % second));
        }

        result === 0 || second === 0
          ? (result = 0)
          : (result = result % second);
        break;
    }
    finish = true;
    current.textContent = result;
    previous.textContent =
      history.first +
      " " +
      history.sign +
      " " +
      history.second +
      " " +
      history.equal;
  }
});
