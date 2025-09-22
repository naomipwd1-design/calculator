const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const historyList = document.getElementById('historyList');
const historyPanel = document.getElementById('historyPanel');
const toggleHistoryBtn = document.getElementById('toggleHistory');

let currentInput = "";

// Load history from localStorage
function loadHistory() {
    const saved = JSON.parse(localStorage.getItem('calcHistory')) || [];
    historyList.innerHTML = '';
    saved.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Save a new entry to history
function saveToHistory(entry) {
    const saved = JSON.parse(localStorage.getItem('calcHistory')) || [];
    saved.unshift(entry); // Add to top
    localStorage.setItem('calcHistory', JSON.stringify(saved.slice(0, 20))); // Keep last 20
    loadHistory();
}

// Handle calculator button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            try {
                const result = eval(currentInput);
                display.value = result;
                saveToHistory(`${currentInput} = ${result}`);
                currentInput = result.toString();
            } catch (error) {
                display.value = "Error";
            }
        } else if (value === 'DEL') {
            currentInput = "";
            display.value = "";
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// Toggle calculator visibility
const toggleBtn = document.getElementById('toggleCalc');
const calculator = document.querySelector('.calculator');

toggleBtn.addEventListener('click', () => {
    calculator.classList.toggle('visible');
});

// Toggle history panel visibility
toggleHistoryBtn.addEventListener('click', () => {
    historyPanel.classList.toggle('visible');
    toggleHistoryBtn.textContent = historyPanel.classList.contains('visible') 
        ? 'Hide History?' 
        : 'Show history?';
});

// Load history on page load
loadHistory();

