const keys = document.querySelectorAll(".keypad div");
const display = document.querySelector(".display .current-result");
const currentOperation = document.querySelector(".display .current-operation");

const operators = ["÷", "x", "-", "+"];

let currentDisplay = [];

let num1 = null;
let operator = null;
let num2 = null;

let result = null;

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

    if (!Number.isInteger(result) && result !== "ERROR"){
        result = result.toFixed(2);
    }
    
    updateDisplay(result);
}

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        const clickedKey = e.target.textContent;
        
        if (display.textContent === "ERROR") clearData();

        if (clickedKey === "C"){
            clearData();
            return;
        }

        if (clickedKey === "⌫"){
            currentDisplay.splice(-1, 1);
            updateDisplay();
            return;
        }

        if (operators.includes(clickedKey)){
            if (currentDisplay.some(elem => operators.includes(elem))){
                getResult();
            };
            num1 = currentDisplay.join("");
            operator = clickedKey;
        }

        if (clickedKey === "="){
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
    result = 0;
    display.textContent = "0";
}

function getResult(){
    let operation = currentDisplay.join("").split(operator);
    num2 = operation[1];
    currentOperation.textContent = currentDisplay.join("");
    currentDisplay = [];
    operate(+num1, operator, +num2);
}