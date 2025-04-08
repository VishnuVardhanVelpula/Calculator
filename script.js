const inputValue = document.getElementById("user-input");
let currentInput = "0";

function updateDisplay() {
  inputValue.innerText = currentInput;
}

document.querySelectorAll(".numbers").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const value = e.target.innerText.trim();

    if (currentInput === "0" || currentInput === "NaN") {
      currentInput = value;
    } else {
      currentInput += value;
    }

    updateDisplay();
  });
});

document.querySelectorAll(".key-operate").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const value = e.target.innerText.trim();

    if (value === "=") {
      try {
        const result = eval(currentInput);
        currentInput = isNaN(result) ? "NaN" : result.toString();
      } catch {
        currentInput = "NaN";
      }
    } else {
      const lastChar = currentInput.slice(-1);
      if ("+-*/".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
    }

    updateDisplay();
  });
});

document.querySelectorAll(".key-others-operations").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const value = e.target.innerText.trim();

    if (value === "AC") {
      currentInput = "0";
    } else if (value === "DEL") {
      if (currentInput.length === 1) {
        currentInput = "0";
      } else {
        currentInput = currentInput.slice(0, -1);
      }
    } else if (value === "%") {
      try {
        const result = eval(currentInput) / 100;
        currentInput = result.toString();
      } catch {
        currentInput = "NaN";
      }
    }

    updateDisplay();
  });
});

updateDisplay();
