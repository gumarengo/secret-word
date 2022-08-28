import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { wordsList } from "./data/words";

import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/GameScreen/Game";
import GameOver from "./components/GameOverScreen/GameOver";

import SilvioSantos from "./data/silvio.png";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    //pega a categoria
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pega uma palavra da categoria acima
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    //cria o array de letras de word
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    console.log(letter);
  };

  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div>
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage === "end" && <GameOver retry={retry} />}
      </div>
      <div className="image">
        <img src={SilvioSantos} alt="Silvio Santos" />
      </div>
    </div>
  );
}

export default App;
