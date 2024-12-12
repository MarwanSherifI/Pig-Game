'use strict';
const setScoreP1 = document.querySelector('#score--0');
const setScoreP2 = document.querySelector('#score--1');
const setCurrentP1 = document.querySelector('#current--0');
const setCurrentP2 = document.querySelector('#current--1');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const diceImages = document.querySelector('.dice');
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');

let diceValue, scores, activePlayer, playing, total;

const newGame = function () {
  diceValue;
  total = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  setScoreP1.textContent = 0;
  setScoreP2.textContent = 0;
  setCurrentP1.textContent = 0;
  setCurrentP2.textContent = 0;
  diceImages.classList.add('hidden');
  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  playerZero.classList.add('player--active');
  playerOne.classList.remove('player--active');
};

newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  total = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

//NEEDS-REFACTORING
// const switchPlayerForcefully = function () {
//   if (playerZero.classList.contains('player--active')) {
//     total = 0;
//     playerZero.classList.remove('player--active');
//     playerOne.classList.add('player--active');
//   } else if (!playerZero.classList.contains('player--active')) {
//     total = 0;
//     playerOne.classList.remove('player--active');
//     playerZero.classList.add('player--active');
//   }
// };

//NEEDS-REFACTORING - ( TO-BE-DONE adding the init from the course -- DONE )

//REFACTORED DICE ROLL

const diceRoll = function () {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 6 + 1);
    diceImages.classList.remove('hidden');
    diceImages.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      total += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent = total;
      console.log(` total = ${total}`);
    } else {
      switchPlayer();
    }
  }
};
//REFACTORED - HOLD VALUE
const holdValue = function () {
  if (playing) {
    //1. add current score to active player
    scores[activePlayer] += total;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if score >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImages.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

newGameButton.addEventListener('click', newGame);
rollDiceButton.addEventListener('click', diceRoll);
holdButton.addEventListener('click', holdValue);
console.log(total);

//NEEDS-REFACTORING- HOLD VALUE
// const holdValue = function () {
//   if (playerZero.classList.contains('player--active')) {
//     s1Total = s1Total + total;
//     setCurrentP1.textContent = s1Total;
//     console.log(s1Total);
//     total = 0;
//     playerZero.classList.remove('player--active');
//     playerOne.classList.add('player--active');
//   } else if (!playerZero.classList.contains('player--active')) {
//     s2Total = s2Total + total;
//     setCurrentP2.textContent = s2Total;
//     console.log(s2Total);
//     total = 0;
//     playerOne.classList.remove('player--active');
//     playerZero.classList.add('player--active');
//   }

//   console.log(total);
// };
