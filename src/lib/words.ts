//import { WORDS } from '../constants/wordlist'
//import { WORDS4 } from '../constants/wordlist4'
//import { WORDS3 } from '../constants/wordlist3'
import { VALIDGUESSES } from '../constants/validGuesses'
import { VALIDGUESSES4 } from '../constants/validGuesses4'
import { VALIDGUESSES3 } from '../constants/validGuesses3'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
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

var data;

const dbref = ref(database);
get(child(dbref,'current')).then((snapshot)=>{
  const result = snapshot.val();
  data = result;
}).catch((error)=>{
  console.error(error);
});

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
  //solution = wordLength===3?WORDS3[solutionIndex]:wordLength===5?WORDS[solutionIndex]:WORDS4[solutionIndex]
  solution = wordLength===3?data.three:wordLength===5?data.five:data.four
}

export const solutionIndex = getWordOfDayIndex()
export var solution = "ಆಟಸಾಮಾನು"

