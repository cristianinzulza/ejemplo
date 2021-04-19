var lastButton = null, currentButton = null, lastOperator = null, currentOperator = null;
var clear = true, firstTime = true;
var acc = 0;
var fc = 10000; //

var buttons = document.querySelectorAll('[type="button"]');

for (let btn of buttons) {
    var btnText = btn.textContent;
    switch (btnText) {
        case "CE":
            btn.onclick = btnCEPressed;
            break;
        case "C":
            btn.onclick = btnCPressed;
            break;
        case "+/-":
            btn.onclick = btnSignPressed;
            break;
        case "=":
            btn.onclick = btnEqualPressed;
            break;
        case ".":
            btn.onclick = btnDotPressed;
            break;
        default:
            if (isNaN(btnText)) {
                btn.onclick = btnOperatorPressed;
                switch (btnText) {
                    case "+":
                        btn.calcular = (a, b) => (a*fc + b*fc)/fc;
                        break;
                    case "-":
                        btn.calcular = (a, b) => (a*fc - b*fc)/fc;
                        break;
                    case "*":
                        btn.calcular = (a, b) => a * b;
                        break;
                    case "/":
                        btn.calcular = (a, b) => a / b;
                        break;
                    case "%":
                        btn.calcular = (a, b) => a % b;
                        break;
                    default:
                        break;
                }
            }
            else
                btn.onclick = btnNumberPressed;
            break;
    }
}

function btnCEPressed(event) {
    lastButton = null, currentButton = null, lastOperator = null, currentOperator = null;
    clear = true, firstTime = true;
    salida.innerHTML = "0";
    operador.innerHTML = "";
}

function btnCPressed(event) {
    clear = true;
    salida.innerHTML = "0";
}

function btnSignPressed(event) {
    salida.innerHTML = salida.innerHTML * -1;
}

function btnEqualPressed(event) {
    operador.innerHTML = this.innerHTML;
    btnHistory(this);
    clear = true;
    firstTime = true;
    if (lastButton.innerHTML !== "=")
        salida.innerHTML = currentOperator.calcular(acc, Number(salida.innerHTML))
}

function btnOperatorPressed(event) {
    operador.innerHTML = this.innerHTML;
    btnHistory(this);
    opHistory(this);
    clear = true;
    if (firstTime) {
        firstTime = false;
        acc = Number(salida.innerHTML);
    } else
        if (lastButton.innerHTML !== lastOperator.innerHTML)
            acc = lastOperator.calcular(acc, Number(salida.innerHTML));
    salida.innerHTML = acc;
}

function btnNumberPressed(event) {
    btnHistory(this);
    if (clear) {
        if (this.innerHTML !== "0")
            clear = false;
        salida.innerHTML = this.innerHTML;
    } else {
        salida.innerHTML += this.innerHTML;
    }
}

function btnDotPressed(event) {
    btnHistory(this);
    if (clear) {
        clear = false;
        salida.innerHTML = "0" + this.innerHTML;
    } else if (!salida.textContent.includes("."))
        salida.innerHTML += this.innerHTML;

}

function opHistory(btn) {
    lastOperator = currentOperator;
    currentOperator = btn;
}

function btnHistory(btn) {
    lastButton = currentButton;
    currentButton = btn;
}