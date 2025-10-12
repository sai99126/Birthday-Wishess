import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./BirthdayPage.css";
import birthdayImage from "./snapedit_17597754104468.jpeg.jpg";
import musicFile from "./happybirthday.mp3"; // <-- Add your song in src folder

export default function BirthdayPage() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    const audio = new Audio(musicFile);
    audio.play();

    return () => {
      audio.pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="birthday-page">
      <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} recycle={true} />
      <div className="balloons">
        <div className="balloon red"></div>
        <div className="balloon blue"></div>
        <div className="balloon yellow"></div>
      </div>
      <img
        src={birthdayImage}
        alt="Happy Birthday Nandini"
        className="birthday-photo"
      />
      <h1 className="celebrate-text">🎉 Happy Birthday, Madam! 💖</h1>
      <p className="wish-text">May your day be filled with joy, laughter, and all your favorite things! 🎂✨</p>
    </div>
  );
}

