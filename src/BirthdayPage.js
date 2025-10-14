import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./BirthdayPage.css";
import birthdayImage from "./snapedit_17597754104468.jpeg.jpg";
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
        numberOfPieces={180}
        recycle={true}
      />

      <div className="birthday-card">
        <h1 className="card-title">Happy Birthday My Love! 💖</h1>
        <img
          src={birthdayImage}
          alt="Happy Birthday"
          className="birthday-photo"
        />
        <p className="card-subtitle">
          To the most amazing woman in my life 💐
        </p>
        <p className="card-message">
          “Every moment with you is a gift, and today we celebrate the greatest gift of all — YOU!” ✨
        </p>
      </div>
    </div>
  );
}






