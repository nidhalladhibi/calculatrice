let display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = "";

// Ajouter un chiffre à l'affichage
function appendNumber(number) {
  if (currentInput === "0" && number === 0) return;
  currentInput += number;
  updateDisplay(currentInput);
}

// Ajouter un opérateur
function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") calculate();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

// Effacer l'affichage
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
}

// Calculer et afficher le résultat
function calculate() {
  if (previousInput === "" || currentInput === "") return;
  let result;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Erreur" : prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay(currentInput);
}

// Mettre à jour l'affichage
function updateDisplay(value) {
  display.innerText = value;
}
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  // Gérer les chiffres (0-9)
  if (!isNaN(key)) {
    appendNumber(key);
  }

  // Gérer les opérateurs (+, -, *, /)
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendOperator(key);
  }

  // Gérer la touche "Entrée" ou "=" pour calculer
  if (key === "=" || key === "Enter") {
    calculate();
  }

  // Gérer la touche "C" ou "Escape" pour effacer
  if (key === "c" || key === "C" || key === "Escape") {
    clearDisplay();
  }

  // Gérer la touche "Backspace" pour supprimer le dernier chiffre
  if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

