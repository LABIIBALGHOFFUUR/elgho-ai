function startChat() {
  alert("Fitur AI Chat ELGHO AI akan segera tersedia.");
}

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "☀";
  } else {
    themeButton.textContent = "☾";
  }
});
