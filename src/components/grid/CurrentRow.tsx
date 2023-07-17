import { Cell } from './Cell'
import {knTokenize} from "../../lib/kannada";

type Props = {
  guess: string
  wordLength: number
}

export const CurrentRow = ({ guess, wordLength }: Props) => {
  const splitGuess = knTokenize(guess).slice(0,wordLength) // fixes the problem that crashes the game when boxes are full and user switches to shorter word length
  const emptyCells = Array.from(Array(wordLength - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter.slice(1).join('')} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
