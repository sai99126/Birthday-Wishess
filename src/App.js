import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [showWish, setShowWish] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setShowWish(true);
    }
  };

  const handleReset = () => {
    setShowWish(false);
    setName("");
  };

  return (
    <div className="birthday-container">
      {!showWish ? (
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>🎉 Create Birthday Wishes 🎂</h1>
          <input
            type="text"
            placeholder="Enter the name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Generate Wish</button>
        </form>
      ) : (
        <div className="wish-card">
          <h1>🎂 Happy Birthday {name}! 🎉</h1>
          <p>
            May your day be filled with love, laughter, and all your favorite things.
            Wishing you a year full of happiness and success! 💖
          </p>
          <div className="balloons">
            🎈 🎈 🎈 🎈 🎈
          </div>
          <button onClick={handleReset}>Back</button>
        </div>
      )}
    </div>
  );
}

export default App;













