function goToCreate() {
  window.location.href = "create.html";
}

const form = document.getElementById("loveForm");

if (form) {

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const yourName = document.getElementById("yourName").value;
    const partnerName = document.getElementById("partnerName").value;
    const message = document.getElementById("message").value;

    const loveData = {
      yourName,
      partnerName,
      message
    };

    // Save to localStorage
    localStorage.setItem("loveData", JSON.stringify(loveData));

    // Go to love page
    window.location.href = "love.html";
  });

}
