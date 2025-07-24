const keys = document.querySelectorAll(".keypad div");
const display = document.querySelector(".display .current-result");
const currentOperation = document.querySelector(".display .current-operation");

const operators = ["÷", "x", "-", "+"];

let currentDisplay = [];

let num1;
let operator;
let num2;

let result;

function operate(num1, operator, num2){
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = (num2 === 0) ? "ERROR" : divide(num1, num2);
            break;
    };
    updateDisplay(result);
}

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        clickedKey = e.target.textContent;

        if (clickedKey === "C"){
            currentDisplay = [];
            currentOperation.textContent = "-"
            num1 = null;
            operator = null;
            num2 = null;
            result = 0;
            display.textContent = "0";
            return;
        }

        if (clickedKey === "⌫"){
            currentDisplay.splice(-1, 1);
            updateDisplay();
            return;
        }

        if (operators.includes(clickedKey)){
            if (currentDisplay.some(elem => operators.includes(elem))) return;
            operator = clickedKey;
        }

        if (clickedKey === "="){
            let operation = currentDisplay.join("").split(operator);
            num1 = operation[0];
            num2 = operation[1];
            currentOperation.textContent = currentDisplay.join("");
            currentDisplay = [];
            operate(+num1, operator, +num2);
            return;
        }

        updateDisplay(clickedKey);
    })
})

function updateDisplay(input){
    if (input) currentDisplay.push(input);
    display.textContent = currentDisplay.join("");
}

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}