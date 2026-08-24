function showRegister() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}

function googleLogin() {
  alert(
    "Google Login akan diaktifkan setelah ELGHO AI terhubung ke sistem Authentication dan Database."
  );
}

function register() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    alert("Lengkapi semua data terlebih dahulu.");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter.");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem("elghoUser", JSON.stringify(user));

  alert("Akun berhasil dibuat. Silakan masuk.");

  document.getElementById("loginEmail").value = email;

  showLogin();
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const savedUser =
    JSON.parse(localStorage.getItem("elghoUser"));

  if (!savedUser) {
    alert("Akun belum ditemukan. Silakan daftar terlebih dahulu.");
    return;
  }

  if (
    email !== savedUser.email ||
    password !== savedUser.password
  ) {
    alert("Email atau password salah.");
    return;
  }

  localStorage.setItem("elghoLoggedIn", "true");

  loadUserData();
  showApp();
}

function logout() {
  localStorage.removeItem("elghoLoggedIn");

  document.getElementById("appScreen")
    .classList.add("hidden");

  document.getElementById("authScreen")
    .classList.remove("hidden");

  showLogin();
}

function loadUserData() {
  const user =
    JSON.parse(localStorage.getItem("elghoUser"));

  if (!user) return;

  document.getElementById("welcomeName")
    .textContent = user.name;

  document.getElementById("sidebarName")
    .textContent = user.name;

  document.getElementById("profileName")
    .textContent = user.name;

  document.getElementById("profileEmail")
    .textContent = user.email;

  const firstLetter =
    user.name.charAt(0).toUpperCase();

  document.getElementById("sidebarAvatar")
    .textContent = firstLetter;

  document.getElementById("profileAvatar")
    .textContent = firstLetter;
}

function showApp() {
  document.getElementById("authScreen")
    .classList.add("hidden");

  document.getElementById("appScreen")
    .classList.remove("hidden");
}

function openPage(pageId, button) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage =
    document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  document.querySelectorAll(".nav-item").forEach(item => {
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
  document
    .getElementById("sidebar")
    .classList.toggle("show");
}

function closeSidebar() {
  if (window.innerWidth <= 800) {
    document
      .getElementById("sidebar")
      .classList.remove("show");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  document.querySelectorAll(".theme-btn")
    .forEach(button => {
      button.textContent =
        document.body.classList.contains("dark")
          ? "☀"
          : "☾";
    });
}

function sendMessage() {
  const input =
    document.getElementById("messageInput");

  const messages =
    document.getElementById("chatMessages");

  const text = input.value.trim();

  if (!text) return;

  const userMessage =
    document.createElement("div");

  userMessage.className = "user-message";

  userMessage.innerHTML = `
    <div class="message-avatar">
      ${getUserInitial()}
    </div>
    <div>
      <strong>Kamu</strong>
      <p>${escapeHTML(text)}</p>
    </div>
  `;

  messages.appendChild(userMessage);

  input.value = "";

  const aiMessage =
    document.createElement("div");

  aiMessage.className = "ai-message";

  aiMessage.innerHTML = `
    <div class="message-avatar">E</div>
    <div>
      <strong>ELGHO AI</strong>
      <p>
        Model AI belum terhubung.
        Kita akan memasangnya pada tahap backend dan API.
      </p>
    </div>
  `;

  messages.appendChild(aiMessage);

  messages.scrollTop =
    messages.scrollHeight;
}

function getUserInitial() {
  const user =
    JSON.parse(localStorage.getItem("elghoUser"));

  if (!user) return "L";

  return user.name.charAt(0).toUpperCase();
}

function escapeHTML(text) {
  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

window.addEventListener("load", () => {
  const loggedIn =
    localStorage.getItem("elghoLoggedIn");

  if (loggedIn === "true") {
    loadUserData();
    showApp();
  } else {
    document.getElementById("authScreen")
      .classList.remove("hidden");

    document.getElementById("appScreen")
      .classList.add("hidden");
  }
});
