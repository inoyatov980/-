// Выбор возможных вариантов
const choices = ['rock', 'paper', 'scissors'];

// Элемент результата
let resultElement = document.getElementById('result');

// Генерация случайного хода компьютера
function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Сравнение результатов игрока и компьютера
function compareChoices(playerChoice, compChoice) {
    let resultText;
    switch (playerChoice + '|' + compChoice) {
        // Случаи победы игрока
        case 'rock|scissors':   // камень побеждает ножницы
        case 'scissors|paper':  // ножницы побеждают бумагу
        case 'paper|rock':      // бумага побеждает камень
            resultText = 'Победил игрок!';
            break;
        
        // Случаи поражения игрока
        case 'rock|paper':     // камень проигрывает бумаге
        case 'scissors|rock':  // ножницы проигрывают камню
        case 'paper|scissors': // бумага проигрывает ножницам
            resultText = 'Компьютер победил.';
            break;
            
        // Остальные случаи — ничья
        default:
            resultText = 'Ничья!';
    }
    return resultText;
}

// Основная логика игры
function playGame(choice) {
    const compChoice = computerChoice();  // Ход компьютера
    const result = compareChoices(choice, compChoice);  // Результат сравнения
    
    // Отображаем итоговый результат
    resultElement.innerHTML = `
        ${choice === 'rock' ? '🪨' : choice === 'scissors' ? '✂️' : '📄'}
        против
        ${compChoice === 'rock' ? '🪨' : compChoice === 'scissors' ? '✂️' : '📄'}
        →
        ${result}
    `;
}

// Инициализация Telegram WebApp
window.Telegram.WebApp.ready();
