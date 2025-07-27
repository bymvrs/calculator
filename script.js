const keys = document.querySelectorAll(".keypad div");
const display = document.querySelector(".display .current-result");
const currentOperation = document.querySelector(".display .current-operation");

const operators = ["÷", "x", "-", "+"];

let currentDisplay = [];

let num1 = null;
let operator = null;
let num2 = null;

let result = null;

let hasADecimalPoint = false;

let equalsWasClicked = false;

function operate(num1, operator, num2){
    switch (operator) {
        case "+":
        default:
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

    if (!Number.isInteger(result) && result !== "ERROR"){
        result = result.toFixed(2);
        hasADecimalPoint = true;
    }

    result = String(result).split("");

    for (let num of result){
        updateDisplay(num);
    };
}

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        const clickedKey = e.target.textContent;

        if (equalsWasClicked){
            if (!isNaN(clickedKey)) {
                clearData();
            }
            equalsWasClicked = false;
        };

        if (display.textContent === "ERROR") clearData();

        if (clickedKey === "C"){
            clearData();
            return;
        }

        if (clickedKey === "⌫"){
            const removedValue = currentDisplay.pop();
            
            if (removedValue === ".") {
                hasADecimalPoint = false;
            };

            if (operators.includes(removedValue) && currentDisplay.includes(".")) {
                hasADecimalPoint = true;
            };

            updateDisplay();
            return;
        }

        if (clickedKey === "."){
            if (hasADecimalPoint) return;
            if (currentDisplay.length == 0 || operators.includes(currentDisplay.at(-1))){
                currentDisplay.push("0")
            };
            hasADecimalPoint = true;
        }

        if (operators.includes(clickedKey)){
            if ((clickedKey === "x" || clickedKey === "÷") && currentDisplay.length === 0) return;

            if (operators.includes(currentDisplay.at(-1))){
                if(currentDisplay.length === 1 && (clickedKey === "x" || clickedKey === "÷")) return;
                currentDisplay.pop();
            };

            if (currentDisplay.at(-1) == ".") return;

            const operatorIndex = currentDisplay.findIndex((elem, i) => operators.includes(elem) && !(i === 0 && elem === "-"));

            if (operatorIndex > 0 && operatorIndex < currentDisplay.length - 1) {
                getResult();
            };
            
            num1 = currentDisplay.join("");
            hasADecimalPoint = false;
            operator = clickedKey;
        }

        if (clickedKey === "="){
            if (operators.includes(currentDisplay.at(-1)) || currentDisplay.at(-1) == ".") return;
            if (currentDisplay.length === 0) return;
            equalsWasClicked = true;
            getResult();
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

function clearData(){
    currentDisplay = [];
    currentOperation.textContent = "";
    num1 = null;
    operator = null;
    num2 = null;
    hasADecimalPoint = false;
    result = 0;
    display.textContent = "0";
}

function getResult(){
    if (operator === null || num1 === null) return;
    let operation = currentDisplay.join("").split(operator);
    num1 ??= currentDisplay.join("");
    num2 = operation[1] ?? num2;
    currentOperation.textContent = currentDisplay.join("");
    currentDisplay = [];
    operate(+num1, operator, +num2);
}