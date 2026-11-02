/* =========================================
   CHRONICALLY ONLINE
   main interaction system
========================================= */


/* ================= PAGE NAVIGATION ================= */

const pages = document.querySelectorAll(".page");

function goPage(pageName) {

  const target = document.getElementById(pageName);

  if (!target) {
    console.warn("page not found:", pageName);
    return;
  }

  pages.forEach(page => {
    page.classList.remove("active");
  });

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  notify("welcome to " + pageName + " ♡");

}


/* ================= NOTIFICATION ================= */

let toastTimeout;

function notify(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* ================= CLOCK ================= */

function updateClock() {

  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  document.getElementById("clock").textContent = time;

  document.getElementById("desktopClock").textContent = time;

}

updateClock();

setInterval(updateClock, 30000);


/* ================= INTERNET SEARCH ================= */

function quickSearch(query) {

  document.getElementById("searchInput").value = query;

  searchInternet();

}


function searchInternet() {

  const input = document.getElementById("searchInput");

  const query = input.value.trim();

  const results = document.getElementById("searchResults");

  if (!query) {

    notify("type something first! ☆");

    return;

  }

  const safeQuery = query.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

  results.innerHTML = `

    <h3>★ search results for "${safeQuery}"</h3>

    <div class="result">

      <b>${safeQuery} fan club</b>

      <p>
      welcome to the most important website
      you have ever discovered.
      </p>

    </div>

    <div class="result">

      <b>the unofficial ${safeQuery} archive</b>

      <p>
      random information, cute things
      and suspicious internet activity.
      </p>

    </div>

    <div class="result">

      <b>more internet treasures</b>

      <p>
      congratulations! you found another
      corner of the web.
      </p>

    </div>

  `;

  notify("3 results found! ✧");

}


/* ================= DESKTOP WINDOWS ================= */

function openWindow(type) {

  const popup = document.getElementById("desktopPopup");

  const title = document.getElementById("popupTitle");

  const content = document.getElementById("popupContent");

  popup.style.display = "block";

  const windows = {

    files: {

      title: "📁 my files",

      content: `
        <h3>my little collection!</h3>
        <p>✦ cute pictures</p>
        <p>✦ random screenshots</p>
        <p>✦ internet memories</p>
        <p>✦ 999 unnecessary files</p>
        <br>
        <button onclick="notify('file not found... just kidding!')">
        open mysterious file
        </button>
      `

    },

    mail: {

      title: "💌 mailbox",

      content: `
        <h3>you've got mail!</h3>
        <p>from: internet fairy</p>
        <p>subject: a tiny reminder</p>
        <br>
        <p>
        hello little internet person!
        keep being curious and collecting
        little happy moments. ♡
        </p>
      `

    },

    music: {

      title: "♫ media player",

      content: `
        <h3>now playing...</h3>
        <p>♫ imaginary dial-up symphony ♫</p>
        <p>♫ pixel dreams ♫</p>
        <br>
        <button onclick="notify('la la la ♫ imaginary music!')">
        play
        </button>
        <button onclick="notify('paused!')">
        pause
        </button>
      `

    }

  };

  title.textContent = windows[type].title;

  content.innerHTML = windows[type].content;

}


function closeWindow() {

  const popup = document.getElementById("desktopPopup");

  popup.style.display = "none";

}


/* ================= PROFILE MOOD ================= */

const moods = [

  "sparkly ✨",

  "sleepy 💤",

  "chaotic 💥",

  "dreamy ☁️",

  "mysterious 👽",

  "hyperactive ⭐",

  "pixelated 💿",

  "offline-ish 💤",

  "super happy ♡",

  "confused but cute ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა"

];


function changeMood() {

  const randomMood = moods[
    Math.floor(Math.random() * moods.length)
  ];

  document.getElementById("mood").textContent = randomMood;

  notify("mood changed! ✿");

}


/* ================= PAINT APPLICATION ================= */

const canvas = document.getElementById("paintCanvas");

const ctx = canvas.getContext("2d");

let drawing = false;

let lastPoint = null;


function getCanvasPosition(event) {

  const rect = canvas.getBoundingClientRect();

  return {

    x: (event.clientX - rect.left) *
       canvas.width / rect.width,

    y: (event.clientY - rect.top) *
       canvas.height / rect.height

  };

}


canvas.addEventListener("pointerdown", event => {

  drawing = true;

  lastPoint = getCanvasPosition(event);

  canvas.setPointerCapture(event.pointerId);

  ctx.beginPath();

  ctx.arc(
    lastPoint.x,
    lastPoint.y,
    Number(document.getElementById("paintSize").value) / 2,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = document.getElementById("paintColor").value;

  ctx.fill();

});


canvas.addEventListener("pointermove", event => {

  if (!drawing) return;

  const point = getCanvasPosition(event);

  ctx.beginPath();

  ctx.moveTo(lastPoint.x, lastPoint.y);

  ctx.lineTo(point.x, point.y);

  ctx.lineWidth = Number(
    document.getElementById("paintSize").value
  );

  ctx.strokeStyle = document.getElementById("paintColor").value;

  ctx.lineCap = "round";

  ctx.lineJoin = "round";

  ctx.stroke();

  lastPoint = point;

});


function stopDrawing() {

  drawing = false;

  lastPoint = null;

}


canvas.addEventListener("pointerup", stopDrawing);

canvas.addEventListener("pointercancel", stopDrawing);


function clearPaint() {

  ctx.fillStyle = "white";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  notify("canvas cleared! ♡");

}


function savePaint() {

  const link = document.createElement("a");

  link.download = "internet-masterpiece.png";

  link.href = canvas.toDataURL("image/png");

  link.click();

  notify("masterpiece saved! ☆");

}


/* ================= INTERNET QUIZ ================= */

const quizAnswers = {

  star: `
    ⭐ STAR COLLECTOR!

    you are a tiny sparkle enthusiast.
    you find magic in the smallest things.
  `,

  cat: `
    🐈 MEME GREMLIN!

    your internet history is probably
    80% cats and 20% random things.
  `,

  computer: `
    💻 DIGITAL EXPLORER!

    you love mysterious folders,
    old websites and hidden corners.
  `,

  alien: `
    👽 SPACE INTERNET CREATURE!

    you are wonderfully unpredictable.
    nobody knows what your next tab will be.
  `

};


function quizAnswer(answer) {

  const result = document.getElementById("quizResult");

  result.innerHTML = quizAnswers[answer].replace(/\n/g, "<br>");

  notify("quiz completed! ✧");

}


function resetQuiz() {

  document.getElementById("quizResult").textContent =
    "your result will appear here...";

  notify("quiz reset! choose again ♡");

}


/* ================= SECRET FOLDER ================= */

function unlockSecret() {

  const input = document.getElementById("secretInput");

  const result = document.getElementById("secretResult");

  const lock = document.getElementById("secretLock");

  const password = input.value.trim().toLowerCase();

  if (
    password === "sparkle" ||
    password === "internet" ||
    password === "star"
  ) {

    lock.textContent = "🔓";

    result.innerHTML = `

      <h3>ACCESS GRANTED!</h3>

      <p>
      congratulations, little explorer!
      </p>

      <p>
      you unlocked the secret internet badge.
      </p>

      <h2>✨ certified web fairy ✨</h2>

    `;

    notify("secret unlocked! ♡");

  } else {

    lock.textContent = "🔐";

    result.textContent =
      "wrong password! try again, detective. ♡";

    notify("access denied!");

  }

}


/* ================= ARCADE GAME SYSTEM ================= */

let gameInterval = null;


function stopGame() {

  clearInterval(gameInterval);

  gameInterval = null;

  document.getElementById("gameArea").innerHTML =
    "choose a game above!";

}


function startGame(type) {

  clearInterval(gameInterval);

  if (type === "stars") {

    startStarGame();

  }

  if (type === "click") {

    startClickGame();

  }

  if (type === "memory") {

    startMemoryGame();

  }

}


/* ================= STAR CATCHER ================= */

function startStarGame() {

  let score = 0;

  let time = 15;

  const area = document.getElementById("gameArea");

  area.innerHTML = `

    <h2>⭐ star catcher</h2>

    <p>catch the star before time runs out!</p>

    <div class="game-score">
      score: <span id="starScore">0</span>
    </div>

    <p id="starTimer">15 seconds</p>

    <button class="game-play" id="starTarget">
      ⭐
    </button>

  `;

  const target = document.getElementById("starTarget");

  target.addEventListener("click", () => {

    if (time <= 0) return;

    score++;

    document.getElementById("starScore").textContent = score;

    target.style.transform =
      `translate(${Math.random() * 120 - 60}px,
      ${Math.random() * 40 - 20}px) rotate(${Math.random() * 40}deg)`;

    target.style.fontSize = (30 + Math.random() * 35) + "px";

  });

  gameInterval = setInterval(() => {

    time--;

    document.getElementById("starTimer").textContent =
      time + " seconds";

    if (time <= 0) {

      clearInterval(gameInterval);

      area.innerHTML = `

        <h2>TIME'S UP!</h2>

        <p class="game-score">
        you collected ${score} stars!
        </p>

        <button onclick="startGame('stars')">
        play again ♡
        </button>

      `;

    }

  }, 1000);

}


/* ================= CLICK MANIA ================= */

function startClickGame() {

  let score = 0;

  let time = 10;

  const area = document.getElementById("gameArea");

  area.innerHTML = `

    <h2>💥 click mania</h2>

    <p>click as much as possible in 10 seconds!</p>

    <div class="game-score">
      clicks: <span id="clickScore">0</span>
    </div>

    <p id="clickTimer">10 seconds</p>

    <button class="game-play" id="clickTarget">
      CLICK ME!!!
    </button>

  `;

  document.getElementById("clickTarget").addEventListener(
    "click",
    () => {

      if (time <= 0) return;

      score++;

      document.getElementById("clickScore").textContent = score;

    }
  );

  gameInterval = setInterval(() => {

    time--;

    document.getElementById("clickTimer").textContent =
      time + " seconds";

    if (time <= 0) {

      clearInterval(gameInterval);

      area.innerHTML = `

        <h2>CLICK CHAMPION!</h2>

        <p class="game-score">
        you made ${score} clicks!
        </p>

        <button onclick="startGame('click')">
        play again!
        </button>

      `;

    }

  }, 1000);

}


/* ================= MEMORY MATCH ================= */

function startMemoryGame() {

  const area = document.getElementById("gameArea");

  const symbols = [

    "🍒",
    "⭐",
    "🐸",
    "💿"

  ];

  const cards = [...symbols, ...symbols];

  cards.sort(() => Math.random() - 0.5);

  let selected = [];

  let matched = 0;

  let locked = false;

  area.innerHTML = `

    <h2>🧠 memory match</h2>

    <p>find all matching pairs!</p>

    <div class="game-score" id="memoryScore">
      pairs: 0 / 4
    </div>

    <div class="memory-board">

      ${cards.map((symbol, index) => `

        <button
          class="memory-card"
          data-index="${index}"
        >
          ?
        </button>

      `).join("")}

    </div>

  `;

  const buttons = area.querySelectorAll(".memory-card");

  buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

      if (locked) return;

      if (button.textContent !== "?") return;

      button.textContent = cards[index];

      selected.push({

        button: button,

        symbol: cards[index]

      });

      if (selected.length === 2) {

        locked = true;

        if (
          selected[0].symbol ===
          selected[1].symbol
        ) {

          matched++;

          selected = [];

          locked = false;

          document.getElementById("memoryScore").textContent =
            "pairs: " + matched + " / 4";

          if (matched === 4) {

            notify("YOU WON! memory master! ♡");

          }

        } else {

          setTimeout(() => {

            selected.forEach(card => {

              card.button.textContent = "?";

            });

            selected = [];

            locked = false;

          }, 700);

        }

      }

    });

  });

}


/* ================= GUESTBOOK ================= */

document.getElementById("guestForm").addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();

    const message = document.getElementById("guestMessage").value.trim();

    if (!name || !message) return;

    const entry = document.createElement("div");

    entry.className = "guest-entry";

    const username = document.createElement("b");

    username.textContent = name;

    const text = document.createElement("p");

    text.textContent = message;

    entry.appendChild(username);

    entry.appendChild(text);

    const list = document.getElementById("guestEntries");

    list.prepend(entry);

    this.reset();

    notify("your message has been added! ♡");

  }
);


/* ================= SECRET EASTER EGG ================= */

let secretClicks = 0;

document.querySelector(".home-title").addEventListener("click", () => {

  secretClicks++;

  if (secretClicks === 5) {

    notify("psst... there are secrets hidden here. 👀");

    secretClicks = 0;

  }

});


/* ================= KEYBOARD NAVIGATION ================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    const popup = document.getElementById("desktopPopup");

    if (popup) {

      popup.style.display = "none";

    }

  }

});


/* ================= STARTUP ================= */

document.addEventListener("DOMContentLoaded", () => {

  notify("welcome to the internet! ☆");

  console.log(
    "★ chronically online website loaded successfully ★"
  );

});