// OPERATIONS

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => operator(num1, num2);

// TEST
// console.log(operate(add, 3, 7));

// NUMBER HOLDERS
let number1 = null;
let number2 = null;

const numberDisplay = document.getElementById("number-display");
console.log(numberDisplay.innerText);

// Populate display when number button is pressed
const numberButtons = document.querySelectorAll(".numbers");

numberButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (numberDisplay.innerText == "0") {
      numberDisplay.innerText = element.innerText;
      (number1 == null)
        ? (number1 = numberDisplay.innerText)
        : (number2 = numberDisplay.innerText);
    } else {
      numberDisplay.innerText += element.innerText;
      (number1 == null)
        ? (number1 = numberDisplay.innerText)
        : (number2 = numberDisplay.innerText);
    }

    console.log("Number 1", number1);
    console.log("Number 2", number2);
  });
});

// Clear display when clear button is pressed
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  numberDisplay.innerText = "0";
});
