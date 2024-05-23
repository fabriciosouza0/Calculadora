var numbers = document.querySelectorAll('.number'); // Vetor dos elementos númericos.
var operators = document.querySelectorAll('.operator'); // Vetor dos elementos de operação.
var display = document.getElementById("display"); // Elemento display responsavel por mostrar os resultados e números inseridos pelo usuário.
var buffer = 0; // Armazena o número inserido previamente.
var currentOperation; // Armazena a operação matemática atual.
var currentStatus = false; // Se verdadeiro reseta o display e começa a concatenar novos números inseridos pelo usuário.
var result; // Armazena o resultado da operação.

operators.forEach((nodeElement) => {// Percorrendo o vetor de elementos operators.
    nodeElement.addEventListener("click", (event) => { // Adicionando evendo de click a cada um dos elementos do vetor operators.
        operations(event.target.innerText, event); // Chamada da função responsável por realizar as operações matemáticas.
    });
});

numbers.forEach((nodeElement) => { // Percorre o vetor numbers que contém os elementos referentes aos dígitos.
    nodeElement.addEventListener("click", (event) => { // Adicionando evento de click a cada um dos elementos do vetor numbers.
        const number = event.target.innerText; // Constante que armazena o número contido no elemento clicado.
        /* Verifica se o display pode ser atualizado, 
        verificando o currentStatus a quantidade de caracteres no display
         e se o ultimo caracter é ".".*/
        if(!currentStatus && display.innerText.length >= 9 
        || (number === "." && display.innerText.includes("."))
        || (display.innerText.length === 8 && number === ".")) {
            return;
        }

        if(display.innerText[0] === "0" && number === ".") {
            display.innerText = "0"+number;
            return;
        }

        if((display.innerText[0] === "0" && display.innerText[1] !== "." && number === "0")) {
            display.innerText = "0";
            return;
        }

        if(display.innerText[0] === "0" && !(display.innerText[1] === ".") || currentStatus) {
            display.innerText = number;
            currentStatus = false;
            return;
        }

        display.innerText += number;
    });
});

function operations(operation) {
    switch (operation) {
        case "AC":
            display.innerText = 0;
            buffer = 0;
            result = 0;
            currentStatus = false;
            currentOperation = '';
            break;
        case "C":
            let innerDisplay = display.innerText.split("");
            innerDisplay.shift();
            display.innerText = innerDisplay.toString().replaceAll(",", "");
            if(!display.innerText.length) { // Se o tamanho do texto do display for 0 então seu texto será setado para 0.
                display.innerText = 0;
            }
            break;
        case "%":
            currentStatus = true;
            currentOperation = "%";
            if(buffer == 0) {
                buffer = parseFloat(display.innerText);
                return;
            }
            result = buffer * (parseFloat(display.innerText) / 100);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
        case "/":
            currentStatus = true;
            currentOperation = "/";
            if(buffer == 0) {
                buffer = parseFloat(display.innerText);
                return;
            }
            result = buffer / parseFloat(display.innerText);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
        case "*":
            currentStatus = true;
            currentOperation = "*";
            if(buffer == 0) {
                buffer = parseFloat(display.innerText);
                return;
            }
            result = buffer * parseFloat(display.innerText);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
        case "-":
            currentStatus = true;
            currentOperation = "-";
            if(buffer == 0) {
                buffer = parseFloat(display.innerText);
                return;
            }
            result = buffer - parseFloat(display.innerText);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
        case "+":
            currentStatus = true;
            currentOperation = "+";
            if(buffer == 0) {
                buffer = parseFloat(display.innerText);
                return;
            }
            result = buffer + parseFloat(display.innerText);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
        default:
            currentStatus = true;
            if(buffer == 0) return;
            if(currentOperation == "%") {
                result = buffer * (parseFloat(display.innerText) / 100);
                display.innerText = result;
                buffer = 0;
                result = 0;
                return;
            }
            result = eval(buffer + currentOperation + display.innerText);
            display.innerText = result;
            buffer = 0;
            result = 0;
            break;
    }
    if(display.innerText.length >= 13 && display.innerText.length <= 15) {
        display.style.fontSize = "2.2rem";
        return;
    }
    if(display.innerText.length >= 15 && display.innerText.length <= 17) {
        display.style.fontSize = "1.7rem";
        return;
    }
    if(display.innerText.length > 17) {
        display.style.fontSize = "1.5rem";
        return;
    }
    display.style.fontSize = "2.5rem";
}