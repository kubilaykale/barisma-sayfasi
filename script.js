let noBtnClicked = false;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const heartWrapper = document.getElementById("heart-wrapper");
const boomSound = document.getElementById("boom");
const fireworks = document.getElementById("fireworks");
const heartRain = document.getElementById("heart-rain");
const emojis = document.getElementById("emojis");
const finalMessage = document.getElementById("final-message");

const questions = [
  "Barışmak ister misin? 🥺",
  "Beni birazcık özledin mi? 😢",
  "Sarılınca geçer mi sence? 🤗",
  "Bir kahve içip barışalım mı? ☕️"
];

const loveMessages = [
  "Senin gülüşün barışmaya yeter 😍",
  "Birlikte gülmek daha güzel 😘",
  "Sarılsak geçer aslında 💕",
  "Trip bitti. Aşk kazandı 😎",
  "Sen + Ben = 💖"
];

let currentIndex = 0;

function initAudio() {
  try {
    boomSound.play();
    boomSound.pause();
    boomSound.currentTime = 0;
    document.body.onclick = null;
  } catch (e) {}
  createFallingEmojis();
}

yesBtn.addEventListener("click", () => {
  dropHeart();
  emojiBoom();

  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  if (currentSize < 80) {
    yesBtn.style.fontSize = (currentSize + 5) + "px";
  }

  noBtn.style.position = "relative";
  noBtn.style.transform = "none";

  currentIndex++;

  if (currentIndex === 3) {
    heartWrapper.style.display = "flex";
    setTimeout(() => heartWrapper.style.display = "none", 1500);
  }

  if (currentIndex < questions.length) {
    question.textContent = questions[currentIndex];
  } else {
    question.innerHTML = '<span class="final-text">Tamam barıştık! ❤️</span>';
    showFireworks();
    showFinalMessage();
    startHeartDrawing();
    setupGiftBox();
    startNameRain();
  }
});

noBtn.addEventListener("click", () => {
  noBtnClicked = true;
  const percentX = Math.floor(Math.random() * 80) + 10;
  const percentY = Math.floor(Math.random() * 70) + 10;

  noBtn.style.position = "fixed";
  noBtn.style.left = "0";
  noBtn.style.top = "0";
  noBtn.style.transform = `translate(${percentX}vw, ${percentY}vh)`;
});

function dropHeart() {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "fixed";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = "-50px";
  heart.style.fontSize = `${Math.random() * 20 + 20}px`;
  heart.style.animation = `fall 2s linear forwards`;
  heartRain.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

function emojiBoom() {
  const em = document.createElement("div");
  em.textContent = ["😍", "😂", "💥", "❤️", "🎉", "🤗", "😚"][Math.floor(Math.random() * 7)];
  em.style.position = "absolute";
  em.style.left = `${Math.random() * window.innerWidth}px`;
  em.style.top = `${Math.random() * window.innerHeight}px`;
  em.style.fontSize = `${Math.random() * 40 + 20}px`;
  em.style.opacity = "1";
  em.style.transition = "all 1s ease-out";
  emojis.appendChild(em);
  setTimeout(() => {
    em.style.top = `${parseInt(em.style.top) - 50}px`;
    em.style.opacity = "0";
  }, 50);
  setTimeout(() => em.remove(), 1100);
}

function showFinalMessage() {
  document.body.classList.add("shake");
  finalMessage.textContent = noBtnClicked
    ? loveMessages[Math.floor(Math.random() * loveMessages.length)]
    : "Sen zaten içinden evet dedin 🥰";

  finalMessage.classList.remove("bouncy-text");
  void finalMessage.offsetWidth;
  finalMessage.classList.add("bouncy-text");

  setTimeout(() => document.body.classList.remove("shake"), 500);
}

function showFireworks() {
  fireworks.style.display = "block";
  try {
    boomSound.currentTime = 0;
    boomSound.play();
  } catch (e) {}

  const ctx = fireworks.getContext("2d");
  fireworks.width = window.innerWidth;
  fireworks.height = window.innerHeight;
  const particles = [];

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.alpha = 1;
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, fireworks.width, fireworks.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      if (p.alpha <= 0) particles.splice(i, 1);
    });

    if (particles.length < 20) { 
      const x = Math.random() * fireworks.width;
      const y = Math.random() * fireworks.height;
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y));
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function createFallingEmojis() {
  const container = document.getElementById("emoji-bg");
  const emojis = ["💖", "🌸", "💘", "💐", "❤️"];
  setInterval(() => {
    const emoji = document.createElement("div");
    emoji.classList.add("falling-emoji");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDuration = `${5 + Math.random() * 5}s`;
    emoji.style.fontSize = `${20 + Math.random() * 20}px`;
    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), 10000);
  }, 300);
}
window.addEventListener("DOMContentLoaded", createFallingEmojis);

function startHeartDrawing() {
  const canvas = document.createElement("canvas");
  canvas.id = "heartCanvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 1000;
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.18;
  const size = 8;
  let t = 0;

  const draw = () => {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const gradient = ctx.createRadialGradient(
      centerX + x * size, centerY + y * size, 2,
      centerX + x * size, centerY + y * size, 10
    );
    gradient.addColorStop(0, "rgba(255,0,100,1)");
    gradient.addColorStop(1, "rgba(255,0,100,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX + x * size, centerY + y * size, 4, 0, 2 * Math.PI);
    ctx.fill();

    t += 0.03;
    if (t < Math.PI * 2) {
      requestAnimationFrame(draw);
    } else {
      setTimeout(() => canvas.remove(), 4000);
    }
  };

  draw();
}

function setupGiftBox() {
  const giftBox = document.getElementById("gift-box");
  const openBtn = document.getElementById("openGiftBtn");
  const giftMsg = document.getElementById("giftMessage");
  const giftPhoto = document.getElementById("giftPhoto");

  giftBox.style.display = "block";

  openBtn.addEventListener("click", () => {
    openBtn.style.display = "none";
    giftMsg.style.display = "block";
    if (giftPhoto) {
      giftPhoto.style.display = "block";
    }
  });
}

function startNameRain() {
  const nameRain = document.getElementById("name-rain");

  let counter = 0;
  const maxDrops = 20;

  const interval = setInterval(() => {
    if (counter >= maxDrops) {
      clearInterval(interval);
      return;
    }

    const drop = document.createElement("div");
    drop.className = "name-drop";
    drop.textContent = "Melik ❤️ Yağmur";
    drop.style.left = `${Math.random() * 90}%`;
    drop.style.fontSize = `${24 + Math.random() * 8}px`;
    drop.style.animationDuration = `${6 + Math.random() * 2}s`;
    nameRain.appendChild(drop);

    setTimeout(() => drop.remove(), 8000);
    counter++;
  }, 400);
}
  