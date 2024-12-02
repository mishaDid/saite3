let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
const cardsContainer = document.getElementById("cards-container");
const scoreDisplay = document.getElementById("score");
const gameStatus = document.getElementById("game-status");
const startButton = document.getElementById("start-button");
const endButton = document.getElementById("end-button");

scoreDisplay.innerText = score;

// Модальні вікна
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Кнопка для показу правил гри
document.getElementById("rules-button").addEventListener('click', () => {
    openModal('rules-modal');
});

// Кнопка для виведення грошей
document.getElementById("withdraw-button").addEventListener('click', () => {
    openModal('withdraw-modal');
});

// Початок гри
startButton.addEventListener('click', () => {
    score = 0;
    scoreDisplay.innerText = score;
    gameStatus.innerText = "Гра почалась!";
    startGame();
});

// Завершення гри
endButton.addEventListener('click', () => {
    gameStatus.innerText = "Гру завершено!";
    startButton.style.display = 'block';
    endButton.style.display = 'none';
});

// Вивести картки
function startGame() {
    startButton.style.display = 'none';
    endButton.style.display = 'block';
    gameStatus.innerText = "Гра триває...";
    createCards();
}

// Створення карток
function createCards() {
    cardsContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = i;
        if (Math.random() < 0.3) {
            card.classList.add('red'); // Бомба
            card.addEventListener('click', () => {
                gameStatus.innerText = "Гра завершена! Ви натиснули на бомбу.";
                score = 0;
                scoreDisplay.innerText = score;
                startButton.style.display = 'block';
                endButton.style.display = 'none';
            });
        } else {
            card.classList.add('green'); // Картка з грошима
            card.addEventListener('click', () => {
                score += 10;
                scoreDisplay.innerText = score;
                localStorage.setItem('score', score);
            });
        }
        cardsContainer.appendChild(card);
    }
}

// Функція для показу секцій
function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
}
