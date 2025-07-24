import { useState } from 'react';

function App() {
  const [started, setStarted] = useState(false);
  const [text, setText] = useState('');
  const [input, setInput] = useState('');

  const sampleText = `The quick brown fox jumps over the lazy dog.`;

  const handleStart = () => {
    setStarted(true);
    setInput('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Typing Speed Tester ⌨️</h1>

      {!started && (
        <button onClick={handleStart}>Start Typing Test</button>
      )}

      {started && (
        <>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            {sampleText}
          </p>

          <textarea
            rows={5}
            cols={60}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing here..."
          />
        </>
      )}
    </div>
  );
}

export default App;
