const cardValues = ['🐶', '🐱', '🐵', '🦊', '🐻', '🐯', '🦁', '🐮'];
let gameBoard = document.getElementById('game-board');
let restartButton = document.getElementById('restart');
let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

function createCards() {
    const cards = [...cardValues, ...cardValues];
    shuffle(cards);
    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cardElements.push(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        resetFlippedCards();
        if (matchedPairs === cardValues.length) {
            setTimeout(() => alert('Congratulations! You Won'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            resetFlippedCards();
        }, 1000);
    }
}

function resetFlippedCards() {
    flippedCards = [];
}

function restartGame() {
    cardElements.forEach(card => {
        card.classList.remove('flipped', 'matched');
        card.innerText = '';
    });
    matchedPairs = 0;
    flippedCards = [];
    createCards();
}

createCards();
restartButton.addEventListener('click', restartGame);