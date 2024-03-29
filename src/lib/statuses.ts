import { solution } from './words'
import {knTokenize, halantExp, vyanjanaExp, swaraExp, vowel_signsExp, anuswara_visargeExp} from "./kannada";

export type CharStatus = 'absent' | 'present' | 'correct' | 'inplace'

const charLevel : { [key:string]:number; } = { 'undefined':0, 'absent':0, 'present':1, 'inplace':2, 'correct':3 };

export type CharValue =
  | 'ಟ' | 'ಠ'
  | 'ಡ' | 'ಢ'
  | 'ಎ' | 'ಏ'
  | 'ರ' | 'ಋ'
  | 'ತ' | 'ಥ'
  | 'ಯ'| 'ಐ'
  | 'ಉ'| 'ಊ'
  | 'ಇ' | 'ಈ'
  | 'ಒ' | 'ಓ'
  | 'ಪ' | 'ಫ'
  | 'ೡ' | '॒'
  | 'ಅ' | 'ಆ'
  | 'ಸ' | 'ಶ'
  | 'ದ' | 'ಧ'
  | '್' | 'ಌ'
  | 'ಗ' | 'ಘ'
  | 'ಹ' | 'ಃ'
  | 'ಜ' | 'ಝ'
  | 'ಕ' | 'ಖ'
  | 'ಲ' | 'ಳ'
  | 'ಞ'| 'ಙ'
  | 'ಷ'| 'ಀ'
  | 'ಚ'| 'ಛ'
  | 'ವ'| 'ಔ'
  | 'ಬ'| 'ಭ'
  | 'ನ'| 'ಣ'
  | 'ಮ'| 'ಂ'


export const enToKnMap = new Map();
enToKnMap.set('R','ೃ')
enToKnMap.set('Y','ೈ')
enToKnMap.set('u','ು')
enToKnMap.set('U','ೂ')
enToKnMap.set('i','ಿ')
enToKnMap.set('I','ೀ')
enToKnMap.set('o','ೊ')
enToKnMap.set('O','ೋ')
enToKnMap.set('a','ಾ')
enToKnMap.set('A','ಾ')
enToKnMap.set('V','ೌ')
enToKnMap.set('e','ೆ' )
enToKnMap.set('E','ೇ')
enToKnMap.set('[','ೣ')
enToKnMap.set('{','॒')
enToKnMap.set('q','ಟ')
enToKnMap.set('Q','ಠ')
enToKnMap.set('w','ಡ' )
enToKnMap.set('W','ಢ')
enToKnMap.set('r','ರ' )
enToKnMap.set('t','ತ' )
enToKnMap.set('T','ಥ')
enToKnMap.set('y','ಯ')
enToKnMap.set('p','ಪ')
enToKnMap.set('P','ಫ')
enToKnMap.set('s','ಸ')
enToKnMap.set('S','ಶ')
enToKnMap.set('d','ದ')
enToKnMap.set('D','ಧ')
enToKnMap.set('f','್')
enToKnMap.set('F','ೢ')
enToKnMap.set('g','ಗ')
enToKnMap.set('G','ಘ')
enToKnMap.set('h','ಹ')
enToKnMap.set('H','ಃ')
enToKnMap.set('j','ಜ')
enToKnMap.set('J','ಝ')
enToKnMap.set('k','ಕ')
enToKnMap.set('K','ಖ')
enToKnMap.set('l','ಲ')
enToKnMap.set('L','ಳ')
enToKnMap.set('z','ಞ')
enToKnMap.set('Z','ಙ')
enToKnMap.set('x','ಷ')
enToKnMap.set('X','ಀ')
enToKnMap.set('c','ಚ')
enToKnMap.set('C','ಛ')
enToKnMap.set('v','ವ')
enToKnMap.set('b','ಬ')
enToKnMap.set('B','ಭ')
enToKnMap.set('n','ನ')
enToKnMap.set('N','ಣ')
enToKnMap.set('m','ಮ')
enToKnMap.set('M','ಂ')


export const enToKnVowelMap = new Map();
enToKnVowelMap.set('a','ಅ')
enToKnVowelMap.set('A','ಆ')
enToKnVowelMap.set('i','ಇ')
enToKnVowelMap.set('I','ಈ')
enToKnVowelMap.set('u','ಉ')
enToKnVowelMap.set('U','ಊ')
enToKnVowelMap.set('R','ಋ')
enToKnVowelMap.set('e','ಎ')
enToKnVowelMap.set('E','ಏ')
enToKnVowelMap.set('Y','ಐ')
enToKnVowelMap.set('o','ಒ')
enToKnVowelMap.set('O','ಓ')
enToKnVowelMap.set('V','ಔ')
enToKnVowelMap.set('F','ಌ')
enToKnVowelMap.set('[','ೡ')

export const vowelToVowelMap = new Map();
vowelToVowelMap.set('ಅ','')
vowelToVowelMap.set('ಆ','ಾ')
vowelToVowelMap.set('ಇ','ಿ')
vowelToVowelMap.set('ಈ','ೀ')
vowelToVowelMap.set('ಉ','ು')
vowelToVowelMap.set('ಊ','ೂ')
vowelToVowelMap.set('ಋ','ೃ')
vowelToVowelMap.set('ಎ','ೆ')
vowelToVowelMap.set('ಏ','ೇ')
vowelToVowelMap.set('ಐ','ೈ')
vowelToVowelMap.set('ಒ','ೊ')
vowelToVowelMap.set('ಓ','ೋ')
vowelToVowelMap.set('ಔ','ೌ')
vowelToVowelMap.set('ಌ','ೢ')
vowelToVowelMap.set('ೡ','ೣ')

export const isValid = (
    currentGuess: string, character: string
): boolean => {
  const prev = currentGuess.length>0? currentGuess.slice(-1):""
  if(prev && prev.length>0) {
    // If halant or vowel sign, previous must be a vyanjana
    if (character.match(halantExp) || character.match(vowel_signsExp)) {
      if(!prev.match(vyanjanaExp))
        return false
    }
  }else {
    // First character must be a swara or a vyanjana
    if(!(character.match(swaraExp) || character.match(vyanjanaExp))) {
      return false
    }
  }
  return true
}

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = knTokenize(solution)
  const splitSolutionVyanjana  = getVyanjana(splitSolution)

  guesses.forEach((word) => {
    const splitGuessVyanjana = getVyanjana(knTokenize(word))
    knTokenize(word).forEach((letter, i) => {
      if (letter.slice(1).join('') ===  splitSolution[i].slice(1).join('') && charLevel[charObj[getVyanjana(new Array(letter))[0]]] < 3 ) {
        return (charObj[getVyanjana(new Array(letter))[0]] = 'correct')
      }
    })
    splitGuessVyanjana.forEach((letter, i) => {
      if (splitSolutionVyanjana[i] === letter && charLevel[charObj[letter]] < 2 ) {
        return (charObj[letter] = 'inplace')
      }
    })
    splitGuessVyanjana.forEach((letter, i) => {
      if (splitSolutionVyanjana.includes(letter) && charLevel[charObj[letter]] < 1) {
        // make status present
        return (charObj[letter] = 'present')
      }
    })
    splitGuessVyanjana.forEach((letter, i) => {
      if (!splitSolutionVyanjana.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }
    })
  })
  return charObj
}

export const getVyanjana = (in_str: RegExpMatchArray[])
    : string[] => {
  let ret_str : string[] = [];
  in_str.forEach((regexMatch, i) => {
    var str_idx = 0
    for (var partOfWord of regexMatch)   {
      if(str_idx===0) {
        str_idx+=1
        continue
      }
      if(partOfWord) {
        if ((str_idx === 1 || str_idx === 3) && partOfWord.length > 0) {
          ret_str.push(partOfWord)
          break
        }
        if (str_idx === 2 && partOfWord.length > 0) {
          ret_str.push(partOfWord.slice(0,1) || "")
          break
        }
      }
      str_idx+=1
    }
    return
  })
  return ret_str
}

export const getGuessSwaraStatuses = (guess: string): CharStatus[] => {
  var splitSolution = knTokenize(solution)
  var splitGuess = knTokenize(guess)
  splitSolution.forEach((o, i, a) => {
    if(i === 0){
      var ii = 0
      for(var oi of o)
      {
        if(vowelToVowelMap.has(oi)){
          a[i][ii] = vowelToVowelMap.get(oi) + a[i][ii].slice(1)
          ii+=1
        }
      }
    }
  })
  splitGuess.forEach((o, i, a) => {
    if(i === 0){
      var ii = 0
      for(var oi of o)
      {
        if(vowelToVowelMap.has(oi)){
          a[i][ii] = vowelToVowelMap.get(oi) + a[i][ii].slice(1)
          ii+=1
        }
      }
    }
  })

  const statuses: CharStatus[] = Array.from(Array(guess.length))
  splitGuess.forEach((letter, i) => {
    statuses[i] = 'absent'
    const solVowelExp = splitSolution[i].slice(0,1).join('').match(vowel_signsExp)
    const gusVowelExp = letter.slice(0,1).join('').match(vowel_signsExp)
    const solAVExp = splitSolution[i].slice(0,1).join('').match(anuswara_visargeExp)
    const gusAVExp = letter.slice(0,1).join('').match(anuswara_visargeExp)
    var compareVowel = false
    var compareAV = false

    // swara validation
    if (solVowelExp !== null) {
      if(gusVowelExp) {
        if (solVowelExp.join('').slice(0, 1) === gusVowelExp.join('').slice(0, 1)) {
          compareVowel = true
        }
      } else {
        statuses[i] = 'absent'
        return
      }
    } else {
      if(gusVowelExp) {
        statuses[i] = 'absent'
        return
      }
      else {
        compareVowel = true
      }
    }

    // anuswara-visarge validation
    if (solAVExp !== null){
      if(gusAVExp) {
        if (solAVExp.join('').slice(0, 1) === gusAVExp.join('').slice(0, 1)) {
          compareAV = true
        }
      } else {
        statuses[i] = 'absent'
        return
      }
    } else {
      if(gusAVExp) {
        statuses[i] = 'absent'
        return
      }
      else
        compareAV = true
    }

    // Combined check
    if(compareAV && compareVowel) {
      statuses[i] = 'correct'
    }
    else if(gusAVExp === null && gusVowelExp === null) {
      statuses[i] = 'correct'
    }
  })
  return statuses
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = knTokenize(solution)
  const splitGuess = knTokenize(guess)
  const splitSolutionVyanjana  = getVyanjana(splitSolution)
  const splitGuessVyanjana = getVyanjana(splitGuess)

  const statuses: CharStatus[] = Array.from(Array(splitGuess.length))

  splitSolution.forEach((letter, i) => {
    if (letter.slice(1).join('') === splitGuess[i].slice(1).join('')) {
      statuses[i] = 'correct'
    }
  })

  splitSolutionVyanjana.forEach((letter, i) => {
    if (letter === splitGuessVyanjana[i] && typeof statuses[i] === 'undefined') {
      statuses[i] = 'inplace'
    }
  })

  // Take care of more than one case
  var counts : { [key:string]:number; } = {};
  var sol_idx = 0
  for (const num of splitSolutionVyanjana) {
    if(!statuses[sol_idx])
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    sol_idx += 1
  }

  for (const count in counts) {
    var gus_idx = 0
    while (counts[count] > 0) {
      for (var vyanjana of splitGuessVyanjana.slice(gus_idx)) {
        if(vyanjana === count && !statuses[gus_idx]) {
          statuses[gus_idx] = 'present'
          break
        }
        gus_idx+=1
      }
      counts[count] -= 1
    }
  }

  statuses.forEach((letter, i) => {
    if(!statuses[i]){
      statuses[i] = 'absent'
    }
  })

  return statuses
}
