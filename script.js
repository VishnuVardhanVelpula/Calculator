const inputValue = document.getElementById("user-input");
let currentInput = "0";

// Load memory from localStorage (persisted memory)
let memory = parseFloat(localStorage.getItem("memory")) || 0;

function updateDisplay() {
  inputValue.innerText = currentInput;
}

// Number buttons
document.querySelectorAll(".numbers").forEach((item) => {
  item.addEventListener("click", (e) => {
    const value = e.target.innerText.trim();
    if (currentInput === "0" || currentInput === "NaN") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay();
  });
});

// Operator buttons
document.querySelectorAll(".key-operate").forEach((item) => {
  item.addEventListener("click", (e) => {
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

// Other operations: AC, DEL, %
document.querySelectorAll(".key-others-operations").forEach((item) => {
  item.addEventListener("click", (e) => {
    const value = e.target.innerText.trim();

    if (value === "AC") {
      currentInput = "0";
    } else if (value === "DEL") {
      currentInput =
        currentInput.length === 1 ? "0" : currentInput.slice(0, -1);
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

// Memory operations using localStorage

// MC (Memory Clear)
document.getElementById("mc").addEventListener("click", () => {
  memory = 0;
  localStorage.removeItem("memory");
});

// MR (Memory Recall)
document.getElementById("mr").addEventListener("click", () => {
  memory = parseFloat(localStorage.getItem("memory")) || 0;
  currentInput = memory.toString();
  updateDisplay();
});

// MS (Memory Store)
document.getElementById("ms").addEventListener("click", () => {
  memory = parseFloat(currentInput) || 0;
  localStorage.setItem("memory", memory.toString());
});

// M+ (Add to Memory)
document.getElementById("m-plus").addEventListener("click", () => {
  const stored = parseFloat(localStorage.getItem("memory")) || 0;
  memory = stored + (parseFloat(currentInput) || 0);
  localStorage.setItem("memory", memory.toString());
});

// M- (Subtract from Memory)
document.getElementById("m-minus").addEventListener("click", () => {
  const stored = parseFloat(localStorage.getItem("memory")) || 0;
  memory = stored - (parseFloat(currentInput) || 0);
  localStorage.setItem("memory", memory.toString());
});

updateDisplay();
