const keys = document.querySelectorAll(".keypad div");
const display = document.querySelector(".display .current-result");

let currentDisplay = [];

let num1;
let operator;
let num2;

function operate(num1, operator, num2){
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

keys.forEach(key => {
    key.addEventListener("click", (e) => {
        clickedKey = e.target.textContent;

        if (clickedKey === "C" || clickedKey === "⌫" || clickedKey === "=") return;

        updateDisplay(clickedKey);
    })
})

function updateDisplay(input){
    currentDisplay.push(input);
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