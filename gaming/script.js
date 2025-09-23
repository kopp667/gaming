const emojis = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁'];
let cards = [...emojis, ...emojis]; // 8 paires
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer = 0;
let interval = null;
let matchedPairs = 0;

const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const winMessage = document.getElementById('win-message');
const finalTime = document.getElementById('final-time');
const finalMoves = document.getElementById('final-moves');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  cards = shuffle(cards);
  grid.innerHTML = '';
  matchedPairs = 0;
  moves = 0;
  timer = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  movesEl.textContent = '0';
  timerEl.textContent = '0';
  winMessage.classList.add('hidden');
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', revealCard);
    grid.appendChild(card);
  });
}

function revealCard() {
  if (lockBoard) return;
  if (this.classList.contains('revealed')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('revealed');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesEl.textContent = moves;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === emojis.length) {
      clearInterval(interval);
      finalTime.textContent = timer;
      finalMoves.textContent = moves;
      winMessage.classList.remove('hidden');
    }

    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restartGame() {
  startGame();
}

startGame();
