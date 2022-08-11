import { InformationCircleIcon, MenuIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { CopyAlert } from './components/alerts/CopyAlert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { isWinningWord, solution, setWordOfDay} from './lib/words'
import aboutThisGame from './aboutThisGame.png'
import {
    getWordLengthFromLocalStorage,
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage,
} from './lib/localStorage'
import {knTokenize} from "./lib/kannada";
import {isValid} from "./lib/statuses";
import {SettingsModal} from "./components/modals/SettingsModal";

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(() => {
      var storedWordLength = getWordLengthFromLocalStorage()
      if(!storedWordLength) {
          return true
      } else {
          return false
      }
  })
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [shiftPressed, setShiftPresser] = useState(false)
  const [wordLength, setWordLength] = useState(5)
  const [settingsWordLength, setSettingsWordLength] = useState(5)
  const [enabled, setEnabled] = useState(false)


  const [guesses, setGuesses] = useState<string[]>(() => {
    var storedWordLength = getWordLengthFromLocalStorage()
    if(storedWordLength === 3 || storedWordLength === 4 || storedWordLength === 5) {
      setWordLength(storedWordLength)
      setWordOfDay(storedWordLength)
    }
    if (storedWordLength) {
        if (storedWordLength !== wordLength){
            setWordLength(storedWordLength)
        }
        const loaded = loadGameStateFromLocalStorage(storedWordLength)
        if (loaded?.solution !== solution) {
            return []
        }
        if (loaded.guesses.includes(solution)) {
            setIsGameWon(true)
        }
        return loaded.guesses
    }
    return []
  })

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution}, wordLength )
  })

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (knTokenize(currentGuess.concat(value)).length <= wordLength && guesses.length < 8 && isValid(currentGuess, value) && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onChange = () => {
      setEnabled(false)
  }

  const changeWordLength = () => {
      if (wordLength !== settingsWordLength)
      {
          console.log(settingsWordLength);
          const loaded = loadGameStateFromLocalStorage(settingsWordLength)
          setWordLength(settingsWordLength)
          setWordOfDay(settingsWordLength)
          setIsGameWon(false)
          setIsGameLost(false)
          if(loaded) {
              console.log('loaded');
              // if (loaded?.solution !== solution && knTokenize(loaded.solution).length === knTokenize(solution).length) {
                if (loaded?.solution !== solution) {
                  console.log('solution change');
                  setGuesses([]) // feature, not a bug
                  return
              }
              if (loaded?.guesses.includes(solution)) {
                  console.log('correct guess');
                  setGuesses(loaded?.guesses)
                  setIsGameWon(true)
                  return
              }
              console.log(loaded?.guesses);
              setGuesses(loaded?.guesses)
          }
          else {
              setGuesses([])
          }
      }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onShift = () => {
      setShiftPresser(!shiftPressed)
  }

  const onEnter = () => {

    const winningWord = isWinningWord(currentGuess)
    if (knTokenize(currentGuess).length === wordLength && guesses.length < 8 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === 7) {
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 5000)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="ವಾರ್ಚೊಲ್" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`ತಪ್ಪು, ಇಂಡೇಸತ್ತೆ ಪದು " ${solution} "`}
        isOpen={isGameLost}
      />
      <CopyAlert
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-lg grow font-bold">ಸಂಕೇತಿ <b>ವಾರ್ಚೊಲ್</b></h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
          <MenuIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsSettingsModalOpen(true)}
          />
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        onShift={onShift}
        shiftPressed={shiftPressed}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => {setIsSettingsModalOpen(false); changeWordLength()}}
        enabled={enabled}
        onChange={onChange}
        wordLength={settingsWordLength}
        setWordLength={setSettingsWordLength}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
        wordLength={wordLength}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
        <button
            type="button"
            className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsAboutModalOpen(true)}
        >
            <img src={aboutThisGame} alt="About this game" />
        </button>
    </div>
  )
}

export default App;