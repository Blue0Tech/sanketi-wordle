import { InformationCircleIcon, MenuIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import {isWinningWord, solution, setWordOfDay, ans, isSame} from './lib/words'
import {
    getWordLengthFromLocalStorage,
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage,
} from './lib/localStorage'
import {knTokenize} from "./lib/kannada";
import {isValid} from "./lib/statuses";
import {SettingsModal} from "./components/modals/SettingsModal";
import "./Stylesheet.css";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAs6iK9jEwv063DR9c3WNnhs6rCx7m48tE",
    authDomain: "sanketi-wordle.firebaseapp.com",
    databaseURL: "https://sanketi-wordle-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sanketi-wordle",
    storageBucket: "sanketi-wordle.appspot.com",
    messagingSenderId: "553055548163",
    appId: "1:553055548163:web:2fa0af6b3eab82b716ef36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var rightNow = Date.now();
var isPlayed = localStorage.getItem("played");
if(!isPlayed) {
    var uid = Math.random().toString().slice(2);
    isPlayed = uid;
    localStorage.setItem("played", uid);
}
update(ref(database, 'active'), {
    [isPlayed]: rightNow.toString()
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
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [shiftPressed, setShiftPresser] = useState(false)
  const [wordLength, setWordLength] = useState(getWordLengthFromLocalStorage()?? 5)
  const [settingsWordLength, setSettingsWordLength] = useState(getWordLengthFromLocalStorage()?? 5)


  const [guesses, setGuesses] = useState<string[]>(() => {
    var storedWordLength = getWordLengthFromLocalStorage()
    if(storedWordLength === 4 || storedWordLength === 5 || storedWordLength === 3) {
      setWordLength(storedWordLength)
      setWordOfDay(storedWordLength)
    }
    if (storedWordLength) {
      console.log(isSame);
        if (storedWordLength !== wordLength){
            setWordLength(storedWordLength)
        }
        const loaded = loadGameStateFromLocalStorage(storedWordLength)
        if (loaded?.solution !== solution && solution!="ಕಕಕಕಕ" && solution!="ಕಕಕಕ" && solution!="ಕಕಕ") {
            return []
        }
        if (loaded!.guesses.includes(solution) && solution!="ಕಕಕಕಕ" && solution!="ಕಕಕಕ" && solution!="ಕಕಕ") {
            setIsGameWon(true)
        }
        if(isSame) {
          return loaded!.guesses
        } else {
          localStorage.setItem('gameState4',JSON.stringify({guesses:[],solution:ans.four}));
          localStorage.setItem('gameState5',JSON.stringify({guesses:[],solution:ans.five}));
          localStorage.setItem('gameState3',JSON.stringify({guesses:[],solution:ans.three}));
          return []
        }
    }
    return []
  })

  useEffect(() => {
    if(isSame) {
      saveGameStateToLocalStorage({ guesses, solution}, wordLength )
    }
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

  const changeWordLength = () => {
    console.log(solution);
      if (wordLength !== settingsWordLength || solution=="ಕಕಕಕಕ" || solution=="ಕಕಕಕ" || solution=="ಕಕಕ")
      {
          if(!isSame) {
            console.log('not the same');
            localStorage.setItem('gameState4',JSON.stringify({guesses:[],solution:ans.four}));
            localStorage.setItem('gameState5',JSON.stringify({guesses:[],solution:ans.five}));
            localStorage.setItem('gameState3',JSON.stringify({guesses:[],solution:ans.three}));
          };
          const loaded = loadGameStateFromLocalStorage(settingsWordLength)
          console.log(loaded);
          setWordLength(settingsWordLength)
          setWordOfDay(settingsWordLength)
          setIsGameWon(false)
          setIsGameLost(false)
          if(loaded) {
            var sameWords = false;
            if(loaded?.solution == ans['three'] || loaded?.solution == ans['four'] || loaded?.solution == ans['five']) {
              sameWords = true;
            }
              if(sameWords) {
                console.log(loaded)
                setGuesses(loaded?.guesses)
                console.log('done')
                return
              }
              if (loaded?.solution !== solution && solution!="ಕಕಕಕಕ" && solution!="ಕಕಕಕ" && solution!="ಕಕಕ" && !sameWords) {
                  setGuesses([])
                  return
              }
              if (loaded?.guesses.includes(solution) && solution!="ಕಕಕಕಕ" && solution!="ಕಕಕಕ" && solution!="ಕಕಕ") {
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

      if (winningWord && solution!="ಕಕಕಕಕ" && solution!="ಕಕಕಕ" && solution!="ಕಕಕ") {
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
      <Alert
        message={`ತಪ್ಪೢ, ಇಂಡೆಎಸತ್ತೆ ಚೊಲ್ಲೢ" ${solution} "`}
        isOpen={isGameLost}
      />
      <Alert
        message="ಕಾಪಿ ಆಯಿರಾಂಸದೢ"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 style={{fontFamily:"Sanketi", marginLeft:25}} className="text-lg grow font-bold">ಸಂಕೇತಿ ವಾರ್ಚೊಲ್</h1>
        <div style={{marginRight:25,display:'flex'}}>
            <InformationCircleIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsInfoModalOpen(true)}
            />
            <MenuIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setIsSettingsModalOpen(true)}
            />
        </div>
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
        handleClose={() => {setIsInfoModalOpen(false); changeWordLength()}}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
        <button
            style={{fontFamily:"Sanketi"}}
            type="button"
            className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsAboutModalOpen(true)}
        >
            ವುಳಯಾಟಽ ಕುರಿಚೢ
        </button>
    </div>
  )
}

export default App;
