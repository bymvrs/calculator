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
    }

    result = String(result).split("");

    for (let num of result){
        updateDisplay(num);
    };
}

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        const clickedKey = e.target.textContent;

        if (equalsWasClicked) clearData();
        
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

            updateDisplay();
            return;
        }

        if (clickedKey === "."){
            if (hasADecimalPoint) return;
            hasADecimalPoint = true;
        }

        if (operators.includes(clickedKey)){
            if (operators.includes(currentDisplay.at(-1))) return;
            if (currentDisplay.some(elem => operators.includes(elem))){
                getResult();
            };
            num1 = currentDisplay.join("");
            hasADecimalPoint = false;
            operator = clickedKey;
        }

        if (clickedKey === "="){
            if (operators.includes(currentDisplay.at(-1))) return;
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
    equalsWasClicked = false;
    result = 0;
    display.textContent = "0";
}

function getResult(){
    let operation = currentDisplay.join("").split(operator);
    num1 ??= currentDisplay.join("");
    num2 = operation[1] ?? 0;
    currentOperation.textContent = currentDisplay.join("");
    currentDisplay = [];
    operate(+num1, operator, +num2);
}