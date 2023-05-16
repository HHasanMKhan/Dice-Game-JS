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

let activePlayer, finalScores, winner;

// Score for the current turn
let currentScore = 0;

// Reset the current score to 0 and display it
const showCurrentScore = function () {
  // Score for the current turn
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const switchPlayer = function () {
  showCurrentScore();
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

const hideElement = function (element) {
  element.classList.add('hidden');
};

const showElement = function (element) {
  element.classList.remove('hidden');
};

const init = function () {
  //Add hidden class to the dice image
  hideElement(diceImg);

  // Setting default score values
  score0El.textContent = 0;
  score1El.textContent = 0;

  finalScores = [0, 0];

  activePlayer = 0;

  player1El.classList.add('player--active');
};

// Initialise new game
init();

rollDiceBtn.addEventListener('click', function () {
  showElement(diceImg);
  const diceNum = Math.trunc(Math.random() * 6 + 1);

  for (let i = 1; i <= 6; i++) {
    if (diceNum === i) {
      // Display correct dice image
      diceImg.src = `img/dice-${i}.png`;

      if (diceNum !== 1) {
        // Add dice to current score
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        // Make roll dice button unclickable while dice number 1 is displayed, switch to next player
        rollDiceBtn.disabled = true;
        setTimeout(function () {
          hideElement(diceImg);
          switchPlayer();
          rollDiceBtn.disabled = false;
        }, 2000);
      }
    }
  }
});

holdBtn.addEventListener('click', function () {
  hideElement(diceImg);

  finalScores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    finalScores[activePlayer];

  showCurrentScore();

  if (finalScores[activePlayer] >= 100) {
    (document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer]),
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'),
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

    hideElement(diceImg);
    hideElement(rollDiceBtn);
    hideElement(holdBtn);

    for (let i = 0; i < document.querySelectorAll('.current').length; i++) {
      hideElement(document.querySelectorAll('.current')[i]);
    }

    // Create and display winning message when game finishes
    winner = document.createElement('div');
    winner.setAttribute('style', '');
    const winnerText = document.createTextNode(
      `Player ${activePlayer + 1} wins!`
    );
    winner.appendChild(winnerText);
    document.getElementsByTagName('main')[0].appendChild(winner).style.cssText =
      'position: absolute; top: 42rem; color: rgba(255, 255, 255, 0.6); left: 50%; transform: translateX(-50%); font-size: 6rem; text-transform: uppercase;';
  } else {
    switchPlayer();
    hideElement(diceImg);
  }
});

newGameBtn.addEventListener('click', function () {
  init();
  showCurrentScore();

  currentScore1.textContent = currentScore;
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');

  winner.remove();

  showElement(rollDiceBtn);
  showElement(holdBtn);
  for (let i = 0; i < document.querySelectorAll('.current').length; i++) {
    showElement(document.querySelectorAll('.current')[i]);
  }
});
