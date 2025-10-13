// Возможные варианты
const choices = ['rock', 'paper', 'scissors'];

// Переменные для подсчета очков
let playerScore = 0;
let computerScore = 0;

// Элементы интерфейса
let resultElement = document.getElementById('result');
let playerScoreDisplay = document.getElementById('playerScore');
let computerScoreDisplay = document.getElementById('computerScore');

// Получаем Telegram ID пользователя
window.Telegram.WebApp.onReady(() => {
    const userID = window.Telegram.WebApp.initDataUnsafe.user.id;
    const username = window.Telegram.WebApp.initDataUnsafe.user.username || '';

    // Устанавливаем значения в hidden input
    document.getElementById('telegramUserID').value = userID;

    // Регистрация пользователя (отправляем данные на сервер)
    $.ajax({
        method: 'POST',
        url: '/register-user', // Адрес сервера
        dataType: 'json',
        data: {
            telegram_id: userID,
            username: username
        },
        success: function(response) {
            alert('Регистрация успешно завершена!');
        },
        error: function(error) {
            alert('Ошибка при регистрации.');
        }
    });
});

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
    
    // Показываем результат текущего раунда
    resultElement.innerHTML = `
        ${choice === 'rock' ? '🪨' : choice === 'scissors' ? '✂️' : '📄'}
        против
        ${compChoice === 'rock' ? '🪨' : compChoice === 'scissors' ? '✂️' : '📄'}
        →
        ${result}
    `;
    
    // Обновляем счёт
    playerScoreDisplay.textContent = `Игрок: ${playerScore}`;
    computerScoreDisplay.textContent = `Компьютер: ${computerScore}`;
}

// Назначаем обработчики кликов на кнопки
document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', () => {
        playGame(button.dataset.choice);
    });
});
