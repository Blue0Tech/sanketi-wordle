import { getGuessStatuses } from './statuses';
import { solutionIndex } from './words';
import {knTokenize} from "./kannada";

export const shareStatus = (guesses: string[], wordLength: number) => {
  navigator.clipboard.writeText(
    'ಕನ್ನಡ #ವರ್ಡಲ್ಲ ' +
     solutionIndex +
      ' (' + wordLength + ' ಅಕ್ಷರದ ಪದ) ' +
      guesses.length +
      '/8\n\n' +
      generateEmojiGrid(guesses)
  );
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return knTokenize(guess)
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            case 'inplace':
              return '🟦'
            case 'absent':
              return '⬛'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
