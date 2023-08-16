const choices = ['Rock', 'Paper', 'Scissors'];
let computerChoice;
let playerChoice;
let playerWinCount = 0;
let computerWinCount = 0;
let tieCount = 0;
const numOfRounds = 5;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
};

function getPlayerChoice() {
  choice = prompt('Rock, Paper, or Scissors?');
  if (typeof choice === 'string') {
    choice = capitalize(choice);
  };
  return choice;
};

function capitalize(str) {
  return (str[0].toUpperCase() + str.slice(1).toLowerCase());
};

function evaluateRoundWinner(computerChoice, playerChoice) {
  let winner;
  let resultMessage;
  if ((playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')) {
    winner = 'Player';
    resultMessage = `Player wins! ${playerChoice} beats ${computerChoice}.`;
  } else if (playerChoice === computerChoice) {
    winner = 'Tie'
    resultMessage = `It's a tie! Both players played ${playerChoice}.`
  } else if (!playerChoice) {
    winner = 'Computer'
    resultMessage = `Player forfeits this round! Computer wins.`
  } else {
    winner = 'Computer';
    resultMessage = `Computer wins! ${computerChoice} beats ${playerChoice}.`;
  };
  console.log(resultMessage);
  return winner;
};

function initGame() {
  playerWinCount = 0;
  computerWinCount = 0;
  tieCount = 0;
};

function playRound() {
  let winner;
  computerChoice = getComputerChoice();
  do {
    playerChoice = getPlayerChoice();
  } while (!(choices.includes(playerChoice)) && playerChoice != null);
  winner = evaluateRoundWinner(computerChoice, playerChoice)
  return winner;
};

function declareOverallWinner(playerWinCount, computerWinCount, tieCount) {
  if (playerWinCount > computerWinCount) {
    return 'Player wins the game!';
  } else if (computerWinCount > playerWinCount) {
    return 'Computer wins the game!';
  } else {
    return 'It was a tie!!'
  };
};

function game() {
  initGame();
  while (playerWinCount < 5 && computerWinCount < 5) {
    let roundWinner = playRound();
    if (roundWinner === 'Player') {
      ++playerWinCount;
    } else if (roundWinner === 'Computer') {
      ++computerWinCount;
    } else {
      ++tieCount;
    };
  }

  let winnerDeclaration = declareOverallWinner(playerWinCount, computerWinCount, tieCount)

  console.log(winnerDeclaration);
  console.log(`
      Final score:
      Player: ${playerWinCount}
      Computer: ${computerWinCount}
      Tie: ${tieCount}
      `
  );
};

// game();