const choices = ['Rock', 'Paper', 'Scissors'];
let computerChoice;
let playerChoice;
let playerScore = 0;
let computerScore = 0;
let tieCount = 0;
let turnEnd = true;

const p1Rock = document.querySelector('.p1 .rock');
const p1Paper = document.querySelector('.p1 .paper');
const p1Scissors = document.querySelector('.p1 .scissors');
const p2Rock = document.querySelector('.p2 .rock');
const p2Paper = document.querySelector('.p2 .paper');
const p2Scissors = document.querySelector('.p2 .scissors');

const p1Message = document.querySelector('.p1-messagebox');
const p2Message = document.querySelector('.p2-messagebox');
const scoreMessage = document.querySelector('.score-message');

const p1Buttons = document.querySelectorAll('.p1 button');
const p2Buttons = document.querySelectorAll('.p2 button');

const p1Scoreboard = document.querySelector('.p1-scoreboard');
const p2Scoreboard = document.querySelector('.p2-scoreboard');

const newGameButton = document.querySelector('.new-game.btn')
const showHideCredits = document.querySelector('.show-credits')
const credits = document.querySelector('.credits')

newGameButton.addEventListener('click', initializeGame)
showHideCredits.addEventListener('click', () => {
  credits.classList.toggle('hidden');
  showHideCredits.textContent === "Show credits" ? showHideCredits.textContent = "Hide credits" : showHideCredits.textContent = "Show credits"
  
})

function highlightBtn() {
  this.classList.add('selected');
};

function unhighlightBtn() {
  this.classList.remove('selected');
};

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
};

function displayEndSequence() {
  if (playerScore > computerScore) {
    scoreMessage.textContent = 'You win the game! Play again?';
  } else {
    scoreMessage.textContent = 'Computer wins this game. Play again?'
  };
  newGameButton.classList.remove('hidden')
};

function checkForWinner() {
  return (playerScore >= 5 || computerScore >= 5);
};

function setOutcomeStyling(winner) {
  if (!winner) return;
  let winnerButtons;
  let loserButtons;
  if (winner === 'Player') {
    winnerButtons = p1Buttons;
    loserButtons = p2Buttons;
  } else {
    winnerButtons = p2Buttons;
    loserButtons = p1Buttons;
  };
  winnerButtons.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      btn.classList.add('winner');
    };
  });
  loserButtons.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      btn.classList.add('loser');
    };
  });
};

function evaluateRoundWinner(computerChoice, playerChoice) {
  let winner;
  if ((playerChoice === 'Rock' && computerChoice === 'Scissors') ||
  (playerChoice === 'Paper' && computerChoice === 'Rock') ||
  (playerChoice === 'Scissors' && computerChoice === 'Paper')) {
    winner = 'Player';
    scoreMessage.textContent = `Player wins! ${playerChoice} beats ${computerChoice}.`;
  } else if (playerChoice === computerChoice) {
    winner = null
    scoreMessage.textContent = `It's a tie! Both players played ${playerChoice}.`
  } else if (!playerChoice) {
    winner = 'Computer'
    scoreMessage.textContent = `Player forfeits this round! Computer wins.`
  } else {
    winner = 'Computer';
    scoreMessage.textContent = `Computer wins! ${computerChoice} beats ${playerChoice}.`;
  };
  return winner;
};

function triggerNextRound(e) {
  if (e.code === 'KeyA') initializeRound();
};

function gameOver() {
  
}

function updateScoreboard(winner) {
  if (winner === 'Player') {
    playerScore++;
    p1Message.textContent = 'Nice one!';
    p2Message.textContent = ':(';
  } else if (winner == 'Computer') {
    computerScore++;
    p1Message.textContent = 'Computer wins this round';
    p2Message.textContent = '>;)';
  } else {
    p1Message.textContent = 'Tie!';
    p2Message.textContent = '';
  };

  setOutcomeStyling(winner)
  p1Scoreboard.textContent = playerScore;
  p2Scoreboard.textContent = computerScore;

  if (checkForWinner()) {
    window.removeEventListener('keydown', triggerNextRound);
    displayEndSequence();
  } else {
    window.addEventListener('keydown', triggerNextRound);
    const nextRoundText = document.createElement('p');
    nextRoundText.textContent += 'Press "A" to play next round.';
    scoreMessage.appendChild(nextRoundText);
  };
};

function determineRoundWinner() {
  /*
  Once player makes their choice, buttons are no longer selectable
  Winner is evaluated from the player and computer choices.
  */
  this.classList.add('selected')
  p1Buttons.forEach(btn => btn.removeEventListener('mousedown', highlightBtn));
  p1Buttons.forEach(btn => btn.removeEventListener('mouseup', unhighlightBtn));
  p1Buttons.forEach(btn => btn.removeEventListener('mouseout', unhighlightBtn));
  p2Buttons.forEach((btn) => {
    if (btn.value === computerChoice) {
      btn.classList.add('selected');
    }
  p1Buttons.forEach(btn => btn.removeEventListener('click', determineRoundWinner));
  playerChoice = this.value;

  });

  let winner = evaluateRoundWinner(computerChoice, playerChoice);
  updateScoreboard(winner);
};

function getPlayersChoices() {
  p1Message.textContent = "Make your move!"
  p2Message.textContent = "";
  p1Buttons.forEach(btn => btn.addEventListener('click', determineRoundWinner));
  computerChoice = getComputerChoice();
};

function initializeRound() {
  scoreMessage.textContent = "";
  // scoreMessage.removeChild(scoreMessage.firstChild);
  p1Buttons.forEach(btn => btn.addEventListener('mousedown', highlightBtn));
  p1Buttons.forEach(btn => btn.addEventListener('mouseup', unhighlightBtn));
  p1Buttons.forEach(btn => btn.addEventListener('mouseout', unhighlightBtn));

  p1Buttons.forEach(btn => btn.classList.remove('winner', 'loser', 'selected'))
  p2Buttons.forEach(btn => btn.classList.remove('winner', 'loser', 'selected'))
  getPlayersChoices();
}

function initializeGame() {
  playerScore = 0;
  computerScore = 0;
  tieCount = 0;
  p1Scoreboard.textContent = "0";
  p2Scoreboard.textContent = "0";
  newGameButton.classList.add('hidden');
  window.removeEventListener('keydown', triggerNextRound);
  initializeRound();
};

initializeGame();