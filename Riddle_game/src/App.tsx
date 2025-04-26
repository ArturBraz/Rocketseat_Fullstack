import styles from "./app.module.css";

import { WORDS, Challenge } from "./utils/words";

import { useEffect, useState } from "react";

import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";
import { Tip } from "./components/Tip";

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>();

  const ATTEMPTS_MARGIN = 3;

  //reset game
  function handleRestartGame() {
    const isConfirmed = window.confirm("Você deseja reiniciar?");

    if (isConfirmed) {
      startGame();
    }
  }

  //start game
  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);

    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  //confirm button
  function handleConfirm() {
    if (!challenge) {
      return;
    }
    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (usedLetter) => usedLetter.value.toUpperCase() === value
    );

    if (exists) {
      setLetter("");
      return alert("Você ja usou a letra " + value + ",tente usar outra.");
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScores = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScores);
    setLetter("");
  }

  //finish game
  function endGame(message: string) {
    alert(message);
    startGame();
  }

  //start game on load
  useEffect(() => {
    startGame();
  }, []);

  //verify scores and attempts
  useEffect(() => {
    if (!challenge) {
      return;
    }
    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!");
      }
      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN;
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você zerou as tentativas!");
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge?.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
