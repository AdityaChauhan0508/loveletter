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

    // Validation
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

    // Save to localStorage
    localStorage.setItem("loveData", JSON.stringify(loveData));

    // Redirect
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

  // Fill content
  if (toName) toName.innerText = "💖 Dear " + data.partnerName;
  if (fromName) fromName.innerText = data.yourName;
  if (loveMessage) loveMessage.innerText = data.message;

  // Setup music
  if (musicPlayer && data.music && playBtn) {

    musicPlayer.src = "assets/" + data.music;
    musicPlayer.load(); // IMPORTANT

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

});


// ---------------- HOME ----------------

function goHome() {
  localStorage.removeItem("loveData"); // clear old data
  window.location.href = "index.html";
}

// Floating Hearts
setInterval(() => {

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);

}, 300);

// Share Feature
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

  shareBtn.addEventListener("click", () => {

    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {

      alert("Link copied! 💖 Share it now 😍");

    });

  });

}

