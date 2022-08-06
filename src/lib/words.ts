import { WORDS } from '../constants/wordlist'
import { WORDS4 } from '../constants/wordlist4'
import { WORDS3 } from '../constants/wordlist3'
import { VALIDGUESSES } from '../constants/validGuesses'
import { VALIDGUESSES4 } from '../constants/validGuesses4'
import { VALIDGUESSES3 } from '../constants/validGuesses3'

export const isWordInWordList = (word: string, wordLength: number) => {
  return (
    wordLength===3?VALIDGUESSES3.includes(word):wordLength===5?VALIDGUESSES.includes(word):VALIDGUESSES4.includes(word)
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDayIndex = () => {
  // January 1 now August 3rd, 2022 Game Epoch IST 5am
  const epochMs = (214*86400000) + 1641013200000 - 19800000
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  return index
}

export const getWordOfDay = () => {
  return solution
}

export const setWordOfDay = (wordLength:number) => {
  solution = wordLength===3?WORDS3[solutionIndex]:wordLength===5?WORDS[solutionIndex]:WORDS4[solutionIndex]
}

export const solutionIndex = getWordOfDayIndex()
export var solution = WORDS[solutionIndex]

