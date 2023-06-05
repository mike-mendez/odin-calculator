// OPERATIONS

const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2,
};

const calculate = (operation, num1, num2) => {
  if (operation in operations) {
    const result = operations[operation](num1, num2);
    return result;
  }
  return null;
};
// 12 + 7 - 5 * 3 = 42

// NUMBER HOLDERS
let number1 = null;
let number2 = null;

let operatorActive = false;

// DISPLAY
const numberDisplay = document.getElementById("number-display");

// BUTTONS
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = Array.from(
  document.querySelectorAll(".operators")
).filter((element) => element.id != "equals");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

const backspaceButton = document.getElementById("backspace");

// Populate display when number button is pressed
numberButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText == "." && numberDisplay.innerText.includes("."))
      return;

    if (operatorActive) {
      numberDisplay.innerText = element.innerText;
      number2 = numberDisplay.innerText;
      operatorActive = false;
    } else {
      if (numberDisplay.innerText != "0" || element.innerText == ".") {
        // ACCUMULATE DISPLAY
        numberDisplay.innerText += element.innerText;

        // CHECK IF OPERATOR IS ACTIVE
        operatorButtons.filter((element) =>
          element.classList.contains("button-active")
        ).length
          ? (number2 = numberDisplay.innerText)
          : (number1 = numberDisplay.innerText);
      } else {
        // IF DISPLAY HAS 0 ONLY

        // REPLACE DISPLAY
        numberDisplay.innerText = element.innerText;

        operatorButtons.filter((element) =>
          element.classList.contains("button-active")
        ).length
          ? (number2 = numberDisplay.innerText)
          : (number1 = numberDisplay.innerText);
      }
    }
    // IF DISPLAY DOESN'T HAVE 0 OR IF DECIMAL IS PRESSED

    console.log("Number 1", number1);
    console.log("Number 2", number2);
  });
});

// Operators
operatorButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (number1 != null) {
      if (
        operatorButtons.filter((btn) => btn.classList.contains("button-active"))
          .length
      ) {
        console.log("hi");
        const activeOperator = operatorButtons.filter((element) =>
          element.classList.contains("button-active")
        )[0].dataset.operation;
        console.log(activeOperator);

        let result = calculate(
          activeOperator,
          Number(number1),
          Number(number2)
        );
        numberDisplay.innerText = result;
        number1 = numberDisplay.innerText;
        number2 = null;
      }
      if (!element.classList.contains("button-active")) {
        operatorButtons.forEach((btn) => btn.classList.remove("button-active"));
      }
      element.classList.add("button-active");
      operatorActive = true;
    }
  });
});

// Remove last number when backspace is pressed
backspaceButton.addEventListener("click", () => {
  if (numberDisplay.innerText.length == 1) {
    numberDisplay.innerText = "0";
  } else {
    numberDisplay.innerText = numberDisplay.innerText.slice(0, -1);
  }
});

// Clear display when clear button is pressed
clearButton.addEventListener("click", () => {
  numberDisplay.innerText = "0";
  operatorButtons.forEach((element) => {
    element.classList.remove("button-active");
  });
  operatorActive = false;
  number1 = null;
  number2 = null;
});

// Evaluate operation when equals button is pressed
equalsButton.addEventListener("click", () => {
  const activeOperator = operatorButtons.filter((element) =>
    element.classList.contains("button-active")
  )[0].dataset.operation;
  if (activeOperator == "divide" && number2 == "0") {
    numberDisplay.innerText = "STOP THAT SHIT";
    return
  }
  let result = calculate(activeOperator, Number(number1), Number(number2));
  numberDisplay.innerText = result;

  operatorButtons.forEach((element) => {
    element.classList.remove("button-active");
  });
  operatorActive = false;

  number1 = numberDisplay.innerText;
  number2 = null;
});
