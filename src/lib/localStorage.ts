const gameState5Key = 'gameState5'
const gameState4Key = 'gameState4'
const gameState3Key = 'gameState3'
const wordLengthKey = 'wordLength'

type StoredGameState = {
  guesses: string[]
  solution: string
}


export const saveGameStateToLocalStorage = (gameState: StoredGameState, wordLength : number) => {
  console.log(wordLength);
  localStorage.setItem(wordLengthKey, JSON.stringify(wordLength))
  if(wordLength === 4) {
    localStorage.setItem(gameState4Key, JSON.stringify(gameState))
  }
  else if(wordLength === 3) {
    localStorage.setItem(gameState3Key, JSON.stringify(gameState))
  }
  else {
    localStorage.setItem(gameState5Key, JSON.stringify(gameState))
  }
}

export const getWordLengthFromLocalStorage = () => {
  const state = localStorage.getItem(wordLengthKey)
  return state ? (JSON.parse(state) as number) : 5
}

export const loadGameStateFromLocalStorage = (wordLength : number) => {
  var key;
  if(wordLength === 4) {
    key = gameState4Key
  }
  else if(wordLength === 3) {
    key = gameState3Key
  }
  else {
    key = gameState5Key
  }
  console.log(key);
  const state = localStorage.getItem(key);
  console.log(state);
  return state ? (JSON.parse(state) as StoredGameState) : null;
}
