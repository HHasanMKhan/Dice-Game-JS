'use strict';

// Selecting elements
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

let currentScore = 0;

rollDiceBtn.addEventListener('click', function () {
  const diceNum = Math.trunc(Math.random() * 6 + 1);

  console.log(diceNum);

  diceImg.classList.remove('hidden');

  for (let i = 1; i <= 6; i++) {
    if (diceNum === i) {
      diceImg.src = `img/dice-${i}.png`;

      if (diceNum !== 1) {
        currentScore += diceNum;
        currentScore0.textContent = currentScore;
      } else {
        currentScore = 0;
        currentScore0.textContent = currentScore;
      }
    }
  }
});
