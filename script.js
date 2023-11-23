const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator_keys');
const display = calculator.querySelector('.calculator_display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {  // if a button is clicked, determine the type of key that is clicked 

        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {  // number key
            if (displayedNum === "0" || previousKeyType === "operator") {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
            console.log("Number key!");
        } else {  // action

            if (action == "add" || action === "subtract" || action === "multiply" || action === "divide") {
                key.classList.add("is-depressed");  // saved state
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                if (firstValue && operator && previousKeyType !== "operator") {
                    const calcValue = calculate(firstValue, operator, secondValue);
                    display.textContent = calcValue;
                    // Update calculated value as firstValue
                    calculator.dataset.firstValue = calcValue
                } else {
                    // If there are no calculations, set displayedNum as the firstValue
                    calculator.dataset.firstValue = displayedNum
                }

                key.classList.add("is-depressed");
                calculator.dataset.previousKeyType = "operator";
                calculator.dataset.operator = action;
                console.log("Operator key!");

            } else if (action === "decimal") {

                if (!displayedNum.includes(".")) {
                    display.textContent = displayedNum + ".";
                }
                if (previousKeyType === "operator") {
                    display.textContent = "0.";
                }
                calculator.dataset.previousKey = "decimal";
                calculator.dataset.previousKeyType = "decimal";
                console.log("Decimal key!");

            } else if (action === "clear") {
                calculator.dataset.previousKeyType = "clear";
                console.log("Clear key!");

            } else if (action === "calculate") {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                if (firstValue && operator && previousKeyType !== "operator") {
                    // FLOW: number, operator, number, operator, calculate first before moving to second operator
                    display.textContent = calculate(firstValue, operator, secondValue);
                    calculator.dataset.previousKeyType = "calculate";
                    console.log("Equal key!");
                }
            }
        }
        Array.from(key.parentNode.children)  // remove .is-depressed class from all keys
            .forEach(k => k.classList.remove("is-depressed"));
    }
})

const calculate = (n1, operator, n2) => {
    let result = "";
    if (operator === "add") {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "subtract") {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "multiply") {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "divide") {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;

}