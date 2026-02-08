// Home → Create Page
function goToCreate() {
  window.location.href = "create.html";
}

// ---------------- CREATE PAGE ----------------

const form = document.getElementById("loveForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const yourName = document.getElementById("yourName").value.trim();
    const partnerName = document.getElementById("partnerName").value.trim();
    const message = document.getElementById("message").value.trim();
    const music = document.getElementById("music").value;

    if (!yourName || !partnerName || !message) {
      alert("Please fill all fields ❤️");
      return;
    }

    const loveData = {
      yourName,
      partnerName,
      message,
      music
    };

    localStorage.setItem("loveData", JSON.stringify(loveData));

    window.location.href = "love.html";
  });
}

// ---------------- LOVE PAGE ----------------

document.addEventListener("DOMContentLoaded", function () {

  const data = JSON.parse(localStorage.getItem("loveData"));
  if (!data) return;

  const toName = document.getElementById("toName");
  const fromName = document.getElementById("fromName");
  const loveMessage = document.getElementById("loveMessage");
  const musicPlayer = document.getElementById("musicPlayer");
  const playBtn = document.getElementById("playMusicBtn");
  const shareBtn = document.getElementById("shareBtn");

  // Fill names
  if (toName) toName.textContent = "💖 Dear " + data.partnerName;
  if (fromName) fromName.textContent = data.yourName;

  // ----------- Typing Effect (FIXED) -----------

  if (loveMessage) {

    let text = data.message;
    let index = 0;

    loveMessage.textContent = "";

    const typingInterval = setInterval(() => {

      loveMessage.textContent += text.charAt(index);
      index++;

      if (index >= text.length) {
        clearInterval(typingInterval);
      }

    }, 40);
  }

  // ----------- Music -----------

  if (musicPlayer && data.music && playBtn) {

    musicPlayer.src = "/assets/" + data.music;

    musicPlayer.load();

    playBtn.addEventListener("click", () => {

      musicPlayer.play()
        .then(() => {
          playBtn.innerText = "🎶 Playing...";
          playBtn.disabled = true;
        })
        .catch((err) => {
          alert("Music could not play 😢");
          console.error(err);
        });

    });
  }

  // ----------- Share -----------

  if (shareBtn) {

    shareBtn.addEventListener("click", () => {

      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert("Link copied! 💖 Share it now 😍");
        });

    });
  }

});

// ---------------- HOME ----------------

function goHome() {
  localStorage.removeItem("loveData");
  window.location.href = "index.html";
}

// ---------------- Floating Hearts ----------------

setInterval(() => {

  const heart = document.createElement("div");
  heart.classList.add("heart");

  const hearts = ["❤️","💖","💘","💝","💗","💓"];

  heart.innerHTML =
    hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);

}, 300);
