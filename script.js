'use strict';
const btnNew = document.querySelector('.btn--new');
const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Scores ID
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

//Showing Score 0 at begin!
score_0.textContent = 0;
score_1.textContent = 0;

//Score holder and Active Player !
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
//Hidden the Dice.
diceImg.classList.add('hidden');
//Function Part........................
const switchPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};
//......................................
//Roll Dice Function.
btnDice.addEventListener('click', function () {
  diceImg.classList.remove('hidden');
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

//Button Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player1.classList.remove('player--active');
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  playing = true;
});
