import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function Balloon({ left, delay, color, size }) {
  // Each balloon is a div positioned absolutely and floats up with CSS
  const style = {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    background: color,
    width: size,
    height: size,
  };
  return (
    <div className="balloon" style={style}>
      <div className="balloon-string" />
    </div>
  );
}

function ConfettiCanvas({ play }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const piecesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);

    function createPieces() {
      const pieces = [];
      const colors = ["#f94144", "#f8961e", "#f9c74f", "#90be6d", "#577590", "#9b5de5"];
      for (let i = 0; i < 140; i++) {
        pieces.push({
          x: Math.random() * w,
          y: Math.random() * -h,
          vx: (Math.random() - 0.5) * 4,
          vy: 2 + Math.random() * 4,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.2,
        });
      }
      piecesRef.current = pieces;
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const pieces = piecesRef.current;
      for (let p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.rot += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        if (p.y > h + 20) {
          // recycle
          p.x = Math.random() * w;
          p.y = -10 - Math.random() * h;
          p.vy = 2 + Math.random() * 4;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    createPieces();
    if (play) tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [play]);

  // Only draw when `play` true; we implement a start/stop effect by toggling `play`
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!play) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(rafRef.current);
    } else {
      // restart drawing by triggering the effect above (it will run tick)
    }
  }, [play]);

  return <canvas className="confetti-canvas" ref={canvasRef} />;
}

export default function App() {
  const [name, setName] = useState("Friend");
  const [message, setMessage] = useState("Wishing you a day filled with love and cheer!");
  const [playConfetti, setPlayConfetti] = useState(false);
  const [theme, setTheme] = useState("light");
  const audioRef = useRef(null);

  // Toggle confetti briefly
  const triggerCelebrate = () => {
    setPlayConfetti(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    // stop confetti after 5 seconds
    setTimeout(() => setPlayConfetti(false), 5500);
  };

  useEffect(() => {
    // set CSS theme class on body
    document.body.classList.toggle("theme-dark", theme === "dark");
  }, [theme]);

  return (
    <div className="app-root">
      <ConfettiCanvas play={playConfetti} />
      <div className="container">
        <header className="header">
          <h1>🎉 Personalized Birthday Wishes</h1>
          <div className="controls">
            <label className="small-label">
              Theme
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="pastel">Pastel</option>
              </select>
            </label>
            <button className="btn subtle" onClick={() => { setName("Friend"); setMessage("Wishing you a day filled with love and cheer!"); }}>
              Reset
            </button>
          </div>
        </header>

        <main className="main-grid">
          <section className="card-preview">
            {/* floating balloons */}
            <div className="balloons-layer" aria-hidden>
              <Balloon left={10} delay={0.2} color="linear-gradient(120deg,#ff6b6b,#ff9a9e)" size="72px" />
              <Balloon left={25} delay={0.6} color="linear-gradient(120deg,#ffd166,#ffb4a2)" size="86px" />
              <Balloon left={60} delay={0.4} color="linear-gradient(120deg,#8ec5fc,#e0c3fc)" size="72px" />
              <Balloon left={78} delay={1.2} color="linear-gradient(120deg,#90f7ec,#33ccff)" size="96px" />
            </div>

            <article className={`card ${theme}`}>
              <div className="card-content">
                <h2 className="card-title">Happy Birthday, <span className="highlight">{name}!</span></h2>
                <p className="card-message">{message}</p>

                <div className="card-footer">
                  <button className="btn primary" onClick={triggerCelebrate}>
                    🎉 Celebrate
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => {
                      // quick small animation: toggle confetti a short time
                      setPlayConfetti(true);
                      setTimeout(() => setPlayConfetti(false), 2000);
                    }}
                  >
                    ✨ Sparkle
                  </button>
                </div>
              </div>
              <div className="card-decor" aria-hidden>
                <div className="cake">
                  <div className="flame" />
                </div>
              </div>
            </article>
          </section>

          <aside className="editor">
            <h3>Edit the Wishes</h3>
            <label>
              Recipient's name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type the name..."
              />
            </label>

            <label>
              Personal message
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday message..."
              />
            </label>

            <div className="small-note">Tip: Keep message short for the best layout.</div>

            <div className="editor-actions">
              <button className="btn primary" onClick={triggerCelebrate}>
                Preview & Celebrate
              </button>
              <button
                className="btn subtle"
                onClick={() => {
                  // Copy message to clipboard
                  const text = `Happy Birthday ${name}!\n\n${message}`;
                  navigator.clipboard?.writeText(text);
                  alert("Message copied to clipboard!");
                }}
              >
                Copy Message
              </button>
            </div>

            <hr />

            <div>
              <h4>Optional: Add background music</h4>
              <p className="small-note">Place a file named <code>birthday.mp3</code> into your project's <code>public/</code> folder, then press Play.</p>
              <div className="audio-controls">
                <audio ref={audioRef} src="/birthday.mp3" preload="auto" />
                <button
                  className="btn outline"
                  onClick={() => {
                    if (audioRef.current) audioRef.current.play().catch(() => alert("Add a file named 'birthday.mp3' to public/ or allow autoplay."));
                  }}
                >
                  ▶ Play
                </button>
                <button
                  className="btn subtle"
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                  }}
                >
                  ■ Pause
                </button>
              </div>
            </div>
          </aside>
        </main>

        <footer className="footer">
          <small>Made with ❤️ using React — customize and share!</small>
        </footer>
      </div>
    </div>
  );
}














