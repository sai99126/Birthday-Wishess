import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      // 🎯 Set unlock time for TODAY at 3:07 PM
      const unlockTime = new Date();
      unlockTime.setHours(15, 7, 0, 0);

      const diff = unlockTime - now;

      // If current time is past 3:07 PM, unlock immediately
      if (diff <= 0) {
        setIsUnlocked(true);
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
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
            Countdown to your special surprise 🎂💖
          </p>

          <div className="countdown-box">⏳ Unlocks at 3:07 PM</div>

          <p className="timer">
            Time left:{" "}
            <span className="time-values">
              {`${timeLeft.hours ?? "00"}h ${timeLeft.minutes ?? "00"}m ${
                timeLeft.seconds ?? "00"
              }s`}
            </span>
          </p>
        </div>
      ) : (
        <div className="unlocked-section">
          <h1 className="birthday-title">🎉 Happy Birthday Madam! 🎂</h1>
          <p className="birthday-subtitle">Your magical moment has arrived! 💕</p>

          <button onClick={handleOpen} className="open-button">
            Open Your Surprise 🎁
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

















