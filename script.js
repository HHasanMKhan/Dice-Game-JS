'use strict';

// Selecting elements
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

// Setting default score values
score0El.textContent = 0;
score1El.textContent = 0;

//Adding hidden class to the dice image
diceImg.classList.add('hidden');

const finalScores = [0, 0];

// Score for the current turn
let currentScore = 0;

let activePlayer = 0;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

const hideButton = function (element) {
  element.style.display = 'none';
};

rollDiceBtn.addEventListener('click', function () {
  const diceNum = Math.trunc(Math.random() * 6 + 1);

  console.log(diceNum);

  diceImg.classList.remove('hidden');

  for (let i = 1; i <= 6; i++) {
    if (diceNum === i) {
      // Display correct dice image
      diceImg.src = `img/dice-${i}.png`;

      if (diceNum !== 10) {
        // Add dice to current score
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  }
});

holdBtn.addEventListener('click', function () {
  finalScores[activePlayer] += currentScore;
  document.getElementById(`score--${[activePlayer]}`).textContent =
    finalScores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (finalScores[activePlayer] >= 10) {
    (document.getElementById(`score--${[activePlayer]}`).textContent =
      finalScores[activePlayer]),
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'),
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    hideButton(diceImg);
    hideButton(rollDiceBtn);
    hideButton(holdBtn);
    for (let i = 0; i < document.querySelectorAll('.current').length; i++) {
      document.querySelectorAll('.current')[i].style.display = 'none';
    }
    const winner = document.createElement('div');
    const winnerText = document.createTextNode(
      `Player ${activePlayer + 1} wins!`
    );
    winner.appendChild(winnerText);
    document.getElementsByTagName('main')[0].appendChild(winner).style.cssText =
      'position: absolute; top: 46.1rem; color: rgba(255, 255, 255, 0.6); left: 50%; transform: translateX(-50%); font-size: 5rem; text-transform: uppercase;';
  } else {
    switchPlayer();
  }
});
