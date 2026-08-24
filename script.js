function openPage(pageId, button) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  closeSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function toggleSidebar() {

  const sidebar = document.getElementById("sidebar");

  sidebar.classList.toggle("show");

}


function closeSidebar() {

  const sidebar = document.getElementById("sidebar");

  if (window.innerWidth <= 800) {
    sidebar.classList.remove("show");
  }

}


function toggleTheme() {

  document.body.classList.toggle("dark");

  const themeButtons = document.querySelectorAll(".theme-btn");

  themeButtons.forEach(button => {

    if (document.body.classList.contains("dark")) {
      button.textContent = "☀";
    } else {
      button.textContent = "☾";
    }

  });

}


function sendMessage() {

  const input = document.getElementById("messageInput");
  const messages = document.getElementById("chatMessages");

  const text = input.value.trim();

  if (!text) {
    return;
  }

  const userMessage = document.createElement("div");

  userMessage.className = "user-message";

  userMessage.innerHTML = `
    <div class="message-avatar">L</div>
    <div>
      <strong>Kamu</strong>
      <p>${escapeHTML(text)}</p>
    </div>
  `;

  messages.appendChild(userMessage);

  input.value = "";

  const aiMessage = document.createElement("div");

  aiMessage.className = "ai-message";

  aiMessage.innerHTML = `
    <div class="message-avatar">E</div>
    <div>
      <strong>ELGHO AI</strong>
      <p>Sistem AI belum terhubung ke model. Pada tahap berikutnya kita akan membuat API ELGHO sendiri.</p>
    </div>
  `;

  messages.appendChild(aiMessage);

  messages.scrollTop = messages.scrollHeight;

}


function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}
