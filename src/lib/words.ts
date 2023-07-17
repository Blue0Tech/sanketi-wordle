import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

import { getWordLengthFromLocalStorage } from "./localStorage";

var wordL = getWordLengthFromLocalStorage();

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

export const isWinningWord = (word: string) => {
  return solution === word
}

// export const getWordOfDayIndex = () => {
//   // January 1, 2022 Game Epoch IST 5am
//   const epochMs = 1641013200000 - 19800000
//   const now = Date.now()
//   const msInDay = 86400000
//   const index = Math.floor((now - epochMs) / msInDay) % 60 // temporary edit to allow program to be tested so null word is not returned
//   return index
// }

export const getWordOfDay = () => {
  return solution
}

export const setWordOfDay = async (wordLength:number) => {
  wordL = wordLength;
  // solution = wordLength===5?WORDS[solutionIndex]:WORDS4[solutionIndex]
  if(ans.five=='') {
    const dbref = ref(database);
    await get(child(dbref,'current')).then((snapshot)=>{
    const result = snapshot.val();
    var answers = JSON.parse(localStorage.getItem('answers')!);
    if(JSON.stringify(answers)==JSON.stringify(result)) {
      console.log('answers same');
      isSame = true;
    } else {
      console.log('answers changed');
      isSame = false;
      localStorage.setItem('gameState4',JSON.stringify({guesses:[],solution:result.four}));
      localStorage.setItem('gameState5',JSON.stringify({guesses:[],solution:result.five}));
      localStorage.setItem('gameState3',JSON.stringify({guesses:[],solution:result.three}));
      window.location.reload();
    }
    localStorage.setItem('answers',JSON.stringify(result));
    ans = result;
    solution = wordLength===3?result.three:wordLength===5?result.five:result.four
    }).catch((error)=>{
      console.log("error:");
      console.error(error);
    });
  } else {
    solution = wordLength===3?ans.three:wordLength===5?ans.five:ans.four
  }
}

// export const solutionIndex = getWordOfDayIndex()
// export var solution = WORDS[solutionIndex]
// export var solution = "default"
export var solution = wordL==4?"ಕಕಕಕ":wordL==3?"ಕಕಕ":"ಕಕಕಕಕ"; // workaround to save guesses
export var ans = {"five":'',"four":'',"three":''};
export var isSame = true;