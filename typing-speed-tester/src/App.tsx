import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const sampleText = `The quick brown fox jumps over the lazy dog.`;

  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // seconds
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);

  // 🟩 Starts the test
  const handleStart = () => {
    setStarted(true);
    setIsTimeRunning(true);
    setInput("");
    setTimeLeft(60);
    setWpm(null);
  };

  // 🕒 TIMER EFFECT

  useEffect(() => {
    let timer: number;

    if (isTimeRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimeRunning && timeLeft === 0) {
      setIsTimeRunning(false);
      calculateWPM();
    }

    return () => clearTimeout(timer);
  }, [isTimeRunning, timeLeft]);

  const handleRestart = () => {
    setStarted(false);
    setIsTimeRunning(false);
    setInput("");
    setTimeLeft(60);
    setWpm(null);
  };

  // 🧮 WPM Calculation
  const calculateWPM = () => {
    const words = input
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;
    const wpmValue = Math.round(words);
    setWpm(wpmValue);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Typing Speed Tester ⌨️</h1>

      {!started && <button onClick={handleStart}>Start Typing Test</button>}

      {started && (
        <>
          <h3>Time Left: {timeLeft}s</h3>

          <div
            style={{
              fontSize: "1.2rem",
              marginBottom: "1rem",
              lineHeight: "1.6",
              fontFamily: "monospace",
            }}
          >
            {sampleText.split("").map((char, index) => {
              let color;

              if (!input[index]) {
                color = "black"; // not typed yet
              } else if (input[index] === char) {
                color = "green"; // correct
              } else {
                color = "red"; // wrong
              }

              return (
                <span key={index} style={{ color }}>
                  {char}
                </span>
              );
            })}
          </div>
          <textarea
            rows={5}
            cols={60}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing here..."
            disabled={!isTimeRunning}
          />

          {wpm !== null && (
            <>
              <h2>⏱️ Your WPM: {wpm}</h2>
              <button onClick={handleRestart}>Restart</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
