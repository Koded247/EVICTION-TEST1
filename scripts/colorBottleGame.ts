
const MAX_ATTEMPTS: number = 5;
const MAX_COLORS: number = 5;

interface GameState {
  attempts: { [key: string]: number };
}


const gameState: GameState = {
  attempts: {},
};

type WinEvent = {
  message: string;
};


function generateRandomNumber(): number {

  return Math.floor(Math.random() * 5) + 1; 
}


function generateColors(): number[] {
  const colors: number[] = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    colors.push(generateRandomNumber());
  }
  return colors;
}


function play(playerAddress: string, colors: number[]): { correct: number; won: boolean; message?: string } {

  if (!playerAddress || playerAddress === '0x0') {
    throw new Error('Invalid player address');
  }

  if (colors.length !== MAX_COLORS) {
    throw new Error('Invalid number of colors');
  }

  for (let color of colors) {
    if (color < 1 || color > 5) {
      throw new Error('Invalid color value');
    }
  }

  if (!gameState.attempts[playerAddress]) {
    gameState.attempts[playerAddress] = 0;
  }

  if (gameState.attempts[playerAddress] >= MAX_ATTEMPTS) {
    gameState.attempts[playerAddress] = 0; 
  }


  const solution: number[] = generateColors();
  let correct: number = 0;


  for (let i = 0; i < MAX_COLORS; i++) {
    if (colors[i] === solution[i]) {
      correct++;
    } else {
      break; 
    }
  }

  // Check if player won
  let won: boolean = false;
  let message: string | undefined;

  if (correct === MAX_COLORS) {
    gameState.attempts[playerAddress] = 0; 
    won = true;
    message = "You win!";

    console.log("Win Event:", { message });
  } else {
    gameState.attempts[playerAddress]++;
  }

  return { correct, won, message };
}

// Example usage
function runExample() {
  const playerAddress: string = "0x1234567890abcdef";
  const playerGuess: number[] = [1, 2, 3, 4, 5]; 

  try {
    const result = play(playerAddress, playerGuess);
    console.log(`Player ${playerAddress} guessed ${playerGuess}`);
    console.log(`Correct positions: ${result.correct}`);
    if (result.won) {
      console.log(result.message);
    } else {
      console.log(`Attempts remaining: ${MAX_ATTEMPTS - gameState.attempts[playerAddress]}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}


runExample();


export { play, generateColors, MAX_ATTEMPTS, MAX_COLORS };