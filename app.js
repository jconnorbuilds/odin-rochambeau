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

function highlightBtn() {
  this.classList.add('selected');
};

function unhighlightBtn() {
  this.classList.remove('selected');
};

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
};

function checkForWinner(playerScore, computerScore) {
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

function waitForSpacebar() {
  window.addEventListener('keydown', (e) => {
    if (e.code = "Space") {
      initializeRound();
      getPlayerChoice();
    }
  });
}

function gameOver() {
  console.log('Game over!')
}

function prepareNextRound() {
  window.addEventListener('keydown', waitForSpacebar);
};

function updateScore(winner) {
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
    gameOver();
  } else {
    prepareNextRound();
  };
};

function playRound() {
  /*
  Once player makes their choice, buttons are no longer selectable
  Player and computer make their choices, and a winner is evaluated.
  */
  this.classList.add('selected')
  this.removeEventListener('mouseout', unhighlightBtn)
  p1Buttons.forEach(btn => btn.removeEventListener('click', playRound));

  playerChoice = this.value;
  computerChoice = getComputerChoice();

  p2Buttons.forEach((btn) => {
    console.log(btn.value);
    if (btn.value === computerChoice)  {
      btn.classList.add('selected');
    }
  });

  let winner = evaluateRoundWinner(computerChoice, playerChoice);
  updateScore(winner);
};

function getPlayerChoice() {
  p1Message.textContent = "Make your move!"
  p1Buttons.forEach(btn => btn.addEventListener('click', playRound));

};

function initializeRound() {
  p1Buttons.forEach(btn => btn.addEventListener('mousedown', highlightBtn));
  p1Buttons.forEach(btn => btn.addEventListener('mouseup', unhighlightBtn));
  p1Buttons.forEach(btn => btn.addEventListener('mouseout', unhighlightBtn));

  p1Buttons.forEach(btn => btn.classList.remove('winner', 'loser', 'selected'))
  p2Buttons.forEach(btn => btn.classList.remove('winner', 'loser', 'selected'))
}

function initializeGame() {
  playerScore = 0;
  computerScore = 0;
  tieCount = 0;
  window.removeEventListener('keydown', waitForSpacebar)
};


function declareOverallWinner(playerScore, computerScore, tieCount) {
  if (playerScore > computerScore) {
    return 'Player wins the game!';
  } else if (computerScore > playerScore) {
    return 'Computer wins the game!';
  } else {
    return 'It was a tie!!'
  };
};

function game() {
  initializeGame();
  getPlayerChoice();
  while (playerScore < 5 && computerScore < 5) {
    // initializeRound();
    getPlayerChoice();
  }

  let winnerDeclaration = declareOverallWinner(playerScore, computerScore)

  console.log(winnerDeclaration);
  console.log(`
      Final score:
      Player: ${playerScore}
      Computer: ${computerScore}
      Tie: ${tieCount}
      `
  );
};

initializeGame();
getPlayerChoice();

// game();