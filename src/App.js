import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unlockDate = new Date("2025-07-08T00:00:00"); // 🎯 Unlock time — 12:00 AM, July 8, 2025

    const updateCountdown = () => {
      const now = new Date();
      const diff = unlockDate - now;

      if (diff <= 0) {
        // If current time is past July 8, 2025 → permanently unlocked
        setIsUnlocked(true);
        return;
      }

      // Calculate remaining time
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    navigate("/birthday");
  };

  return (
    <div className="birthday-container">
      {!isUnlocked ? (
        <div className="locked-section">
          <h1 className="title">Wait madam... 😊💫</h1>
          <p className="subtitle">
            You’re not born yet! <br /> The magic begins on <strong>8th July 2025 🎂💖</strong>
          </p>

          <div className="countdown-box">⏳ Countdown to unlock</div>

          <p className="timer">
            Time left:{" "}
            <span className="time-values">
              {`${timeLeft.days ?? "00"}d ${timeLeft.hours ?? "00"}h ${timeLeft.minutes ?? "00"}m ${timeLeft.seconds ?? "00"}s`}
            </span>
          </p>
        </div>
      ) : (
        <div className="unlocked-section">
          <h1 className="birthday-title">🎉 Happy Birthday Madam! 🎂</h1>
          <p className="birthday-subtitle">Your magical day has begun! 💕</p>

          <button onClick={handleOpen} className="open-button">
            Open Your Surprise 🎁
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

















