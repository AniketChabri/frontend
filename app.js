import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true,
  });

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await axios.post('https://server.com/bfhl', parsedJson);
      setResponseData(response.data);
    } catch (error) {
      console.error('Invalid JSON or server error:', error);
    }
  };

  const handleVisibilityChange = (section) => {
    setVisibleSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div className="App">
      <h1>{responseData ? responseData.roll_number : 'BFHL Challenge'}</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>

      {responseData && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.numbers}
                onChange={() => handleVisibilityChange('numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.alphabets}
                onChange={() => handleVisibilityChange('alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.highestAlphabet}
                onChange={() => handleVisibilityChange('highestAlphabet')}
              />
              Highest Alphabet
            </label>
          </div>

          {visibleSections.numbers && (
            <div>
              <h2>Numbers</h2>
              <pre>{JSON.stringify(responseData.numbers, null, 2)}</pre>
            </div>
          )}

          {visibleSections.alphabets && (
            <div>
              <h2>Alphabets</h2>
              <pre>{JSON.stringify(responseData.alphabets, null, 2)}</pre>
            </div>
          )}

          {visibleSections.highestAlphabet && (
            <div>
              <h2>Highest Alphabet</h2>
              <pre>{JSON.stringify(responseData.highest_alphabet, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
