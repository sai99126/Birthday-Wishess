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
        numberOfPieces={200}
        recycle={true}
      />

      <div className="birthday-box">
        <img
          src={birthdayImage}
          alt="Happy Birthday"
          className="birthday-photo"
        />

        <h1 className="celebrate-text">🎉 Happy Birthday! 💖</h1>
        <p className="wish-text">
          May your day be filled with joy, laughter, and all your favorite things! 🎂✨
        </p>
      </div>
    </div>
  );
}





