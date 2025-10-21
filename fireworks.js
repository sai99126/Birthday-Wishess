"use strict";

// Clean Fireworks (5 bursts, transparent background, no dark overlay)
(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  // Canvas styles
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1";
  canvas.style.pointerEvents = "none";

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Firework {
    constructor(x, y, colors) {
      this.x = x;
      this.y = y;
      this.colors = colors;
      this.targetY = Math.random() * (height / 2);
      this.speed = 2 + Math.random() * 2;
      this.burst = false;
    }

    update() {
      if (!this.burst) {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.burst = true;
          for (let i = 0; i < 50; i++) {
            fireworks.push(new Particle(this.x, this.y, this.colors));
          }
        }
      }
    }

    draw() {
      if (!this.burst) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle =
          this.colors[Math.floor(Math.random() * this.colors.length)];
        ctx.fill();
      }
    }
  }

  class Particle {
    constructor(x, y, colors) {
      this.x = x;
      this.y = y;
      this.radius = 2 + Math.random() * 2;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = 1 + Math.random() * 4;
      this.friction = 0.98;
      this.gravity = 0.05;
      this.opacity = 1;
      this.decay = 0.01 + Math.random() * 0.02;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.opacity -= this.decay;
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace("1)", `${this.opacity})`);
      ctx.fill();
    }
  }

  let fireworks = [];
  let fireworkCount = 0;
  const maxFireworks = 100;
  let launchTimer = 0;

  function loop() {
    // Make background transparent (no black overlay)
    ctx.clearRect(0, 0, width, height);

    if (launchTimer <= 0 && fireworkCount < maxFireworks) {
      const x = Math.random() * width;
      const colors = [
        "rgba(255, 99, 132, 1)",
        "rgba(255, 205, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(153, 102, 255, 1)",
      ];
      fireworks.push(new Firework(x, height, colors));
      fireworkCount++;
      launchTimer = 8;
    } else {
      launchTimer--;
    }

    fireworks.forEach((fw, i) => {
      fw.update();
      fw.draw();
    });

    fireworks = fireworks.filter((fw) => !fw.burst || fw.opacity > 0);

    if (fireworkCount < maxFireworks || fireworks.length > 0) {
      requestAnimationFrame(loop);
    }
  }

  loop();
})();
