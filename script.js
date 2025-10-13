// Возможные варианты
const choices = ['rock', 'paper', 'scissors'];

// Переменные для подсчета очков
let playerScore = 0;
let computerScore = 0;

// Элементы интерфейса
let resultElement = document.getElementById('result');
let historyList = document.getElementById('history');
let playerScoreDisplay = document.getElementById('playerScore');
let computerScoreDisplay = document.getElementById('computerScore');

// Генерируем выбор компьютера
function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Сравниваем выборы игрока и компьютера
function compareChoices(playerChoice, compChoice) {
    let resultText;
    switch (playerChoice + '|' + compChoice) {
        case 'rock|scissors':   // камень побеждает ножницы
        case 'scissors|paper':  // ножницы побеждают бумагу
        case 'paper|rock':      // бумага побеждает камень
            resultText = 'Победил игрок!';
            playerScore++;
            break;
        case 'rock|paper':     // камень проигрывает бумаге
        case 'scissors|rock':  // ножницы проигрывают камню
        case 'paper|scissors': // бумага проигрывает ножницам
            resultText = 'Компьютер победил.';
            computerScore++;
            break;
        default:
            resultText = 'Ничья!';
    }
    return resultText;
}

// Игра
function playGame(choice) {
    const compChoice = computerChoice();  // Компьютер выбирает вариант
    const result = compareChoices(choice, compChoice);  // Сравниваем выбор
    
    // Сообщаем игроку о результате раунда
    resultElement.innerHTML = `
        ${choice === 'rock' ? '🪨' : choice === 'scissors' ? '✂️' : '📄'}
        против
        ${compChoice === 'rock' ? '🪨' : compChoice === 'scissors' ? '✂️' : '📄'}
        →
        ${result}
    `;
    
    // Обновляем очки
    playerScoreDisplay.textContent = `Игрок: ${playerScore}`;
    computerScoreDisplay.textContent = `Компьютер: ${computerScore}`;
    
    // Сохраняем историю партий
    const matchResult = `<li>${choice} (${choice === 'rock' ? '🪨' : choice === 'scissors' ? '✂️' : '📄'}) vs ${compChoice} (${compChoice === 'rock' ? '🪨' : compChoice === 'scissors' ? '✂️' : '📄'}) → ${result}</li>`;
    historyList.insertAdjacentHTML('afterbegin', matchResult);
}

// Активируем кнопки выбора
document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        playGame(button.dataset.choice);
    });
});

// Инициализация Telegram WebApp
window.Telegram.WebApp.ready();
