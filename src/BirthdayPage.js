import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./BirthdayPage.css";
import musicFile from "./audio.mp3";

// 🖼️ Import 5 images for the slides
import img1 from "./snapedit_17597754104468.jpeg.jpg";
import img2 from "./cat.jpg.png";
import img3 from "./slide3.jpg";
import img4 from "./slide4.jpg";
import img5 from "./slide5.jpg";

export default function BirthdayPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { title: "🎉 Happy Birthday! 💖", img: img1, msg: "To the most amazing person 💕" },
    { title: "🐾 Many More Happy Returns! 🎂", img: img2, msg: "May your days be filled with laughter 💗" },
    { title: "🌸 You Shine Bright!", img: img3, msg: "Your smile lights up every room ✨" },
    { title: "🌈 Keep Being You!", img: img4, msg: "You make life so colorful 🌼" },
    { title: "💫 A Small effort from my side to make your day SPECIAL!", img: img5, msg: "Always stay this wonderful 💕" },
    { title: "🎉 Let's Celebrate! 🎂", type: "cake" },
  
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    const audio = new Audio(musicFile);
    audio.play().catch(() => console.log("Autoplay blocked"));

    return () => {
      audio.pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Swipe effect handler
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.clientWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <div className="birthday-page">
      {/* Confetti 🎊 */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={true}
      />

      {/* Balloons 🎈 */}
      <div className="balloons">
        <div className="balloon red"></div>
        <div className="balloon blue"></div>
        <div className="balloon yellow"></div>
        <div className="balloon green"></div>
      </div>

      {/* Slides Carousel */}
      <div className="carousel" onScroll={handleScroll}>
        {slides.map((slide, i) => (
  <div
    key={i}
    className={`card ${i === activeIndex ? "active" : "blurred"} ${
      slide.type === "cake" ? "cake-slide" : ""
    }`}
  >
    {slide.type === "cake" ? (
      <>
        <h1 className="cake-title">Let's Celebrate! 🎉</h1>

        {/* 🎂 Cake */}
        <div className="cake">
          <div className="candle">
            <div className="flame"></div>
          </div>
          <div className="layer layer-top"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-bottom"></div>
        </div>

        <button className="celebrate-btn">
          Continue to Next Page →
        </button>
      </>
    ) : (
      <>
        <h1 className="card-title">{slide.title}</h1>
        {slide.img && (
          <img src={slide.img} alt={`slide-${i}`} className="card-img" />
        )}
        <p className="card-text">{slide.msg}</p>
      </>
    )}
  </div>
))}

      </div>
      {/* ➡️ Arrow indicator (visible until last slide) */}
{activeIndex < slides.length - 1 && (
  <div className="arrow-indicator">
    <span className="arrow">→</span>
  
  </div>
)}

    </div>
  );
}







