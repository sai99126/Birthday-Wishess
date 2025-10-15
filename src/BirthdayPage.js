import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./BirthdayPage.css";
import birthdayImage from "./snapedit_17597754104468.jpeg.jpg";
import catImage from "./cat.jpg.png";
import musicFile from "./audio.mp3";

export default function BirthdayPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    const audio = new Audio(musicFile);
    audio.play().catch((err) => console.log("Audio autoplay blocked:", err));

    return () => {
      audio.pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="birthday-page">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={250}
        recycle={true}
      />

      {/* 🎈 Balloons rising from bottom */}
      <div className="balloons">
        <div className="balloon red"></div>
        <div className="balloon blue"></div>
        <div className="balloon yellow"></div>
        <div className="balloon green"></div>
      </div>

      {/* 🎁 Swipeable Slides */}
      <div className="slides-wrapper">
        {/* First Box */}
        <div className="birthday-card">
          <h1 className="card-title">🎉 Happy Birthday Nandini! 💖</h1>
          <img src={birthdayImage} alt="Birthday" className="birthday-photo" />
          <p className="card-subtitle">To the most amazing person ever 💕</p>
          <p className="card-message">
            “Every moment with you is a gift, and today we celebrate the
            greatest gift of all — YOU!”
          </p>
        </div>

        {/* Second Box */}
        <div className="birthday-card">
          <img src={catImage} alt="Cute Cat" className="birthday-photo" />
          <h1 className="card-title">🐾 Many More Happy Returns of the Day! 🎂</h1>
          <p className="card-message">
            “May your days be filled with purrs, laughter, and endless joy.
            You’re loved more than you know 💗”
          </p>
        </div>
      </div>
    </div>
  );
}










