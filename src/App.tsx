import { InformationCircleIcon, MenuIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { CopyAlert } from './components/alerts/CopyAlert'
import { WrongWordAlert } from './components/alerts/WrongWordAlert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { isWinningWord, solution, setWordOfDay } from './lib/words'
import aboutThisGame from './aboutThisGame.png'
import {
    getWordLengthFromLocalStorage,
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage,
} from './lib/localStorage'
import {knTokenize} from "./lib/kannada";
import {isValid} from "./lib/statuses";
import {SettingsModal} from "./components/modals/SettingsModal";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KfUA7nkVcivPV1ZinRQJRVX--oFRVoA",
  authDomain: "sanketi-wordle.firebaseapp.com",
  databaseURL: "https://sanketi-wordle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sanketi-wordle",
  storageBucket: "sanketi-wordle.appspot.com",
  messagingSenderId: "553055548163",
  appId: "1:553055548163:web:79792087901a57db16ef36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var rightNow = Date.now();
var isPlayed = localStorage.getItem("played");
if(isPlayed) {
  update(ref(database,'active'),{
    [isPlayed] : null
  });
} else {
  var uid = Math.random().toString().slice(2);
  localStorage.setItem("played",uid);
}
update(ref(database,'active'),{
  [isPlayed] : rightNow.toString()
});

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
  const [wordLength, setWordLength] = useState(getWordLengthFromLocalStorage()?? 5)
  const [settingsWordLength, setSettingsWordLength] = useState(getWordLengthFromLocalStorage()?? 5)
  const [enabled, setEnabled] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    var storedWordLength = getWordLengthFromLocalStorage()
    console.log(storedWordLength)//
    if(storedWordLength === 3 || storedWordLength === 4 || storedWordLength === 5) {
      setWordLength(storedWordLength)
      setWordOfDay(storedWordLength)
    }
    if (storedWordLength) {
        if (storedWordLength !== wordLength){
            setWordLength(storedWordLength)
            setCurrentGuess('')
        }
        const loaded = loadGameStateFromLocalStorage(storedWordLength)
        console.log("here")
        console.log(typeof solution)
        console.log(solution)
        const gameWasWon = loaded?.guesses.includes(solution)
        if (gameWasWon) {
            setIsGameWon(true)
        }
        if (loaded?.solution !== solution) {
            return []
        }
        console.log("returning guesses")
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
      setGuesses([])
      if (wordLength !== settingsWordLength)
      {
          console.log(wordLength)
          console.log(settingsWordLength)
          const loaded = loadGameStateFromLocalStorage(settingsWordLength)
          console.log(loaded?.solution)
          console.log(solution)
          setWordLength(settingsWordLength)
          setWordOfDay(settingsWordLength)
          setIsGameWon(false)
          setIsGameLost(false)
          if(loaded) {
                if (loaded?.solution !== solution) {
                  setGuesses([])
                  return
              }
              if (loaded?.guesses.includes(solution)) {
                  setGuesses(loaded?.guesses)
                  setIsGameWon(true)
                  return
              }
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
      <Alert message="????????????????????????" isOpen={isWordNotFoundAlertOpen} />
      <WrongWordAlert
        isOpen={isGameLost}
        solution={solution}
      />
      <CopyAlert
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-lg grow font-bold">?????????????????? <b>????????????????????????</b></h1>
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