/* =========================
   ELGHO AI - SCRIPT
========================= */

console.log("ELGHO AI JavaScript aktif");


/* =========================
   AUTH
========================= */

function showRegister() {

  document
    .getElementById("loginForm")
    .classList.add("hidden");

  document
    .getElementById("registerForm")
    .classList.remove("hidden");

}


function showLogin() {

  document
    .getElementById("registerForm")
    .classList.add("hidden");

  document
    .getElementById("loginForm")
    .classList.remove("hidden");

}


/* =========================
   REGISTER
========================= */

function register() {

  const name =
    document
      .getElementById("registerName")
      .value
      .trim();

  const email =
    document
      .getElementById("registerEmail")
      .value
      .trim()
      .toLowerCase();

  const password =
    document
      .getElementById("registerPassword")
      .value;

  const password2 =
    document
      .getElementById("registerPassword2")
      .value;


  if (
    !name ||
    !email ||
    !password ||
    !password2
  ) {

    alert(
      "Mohon isi semua data terlebih dahulu."
    );

    return;

  }


  if (!email.includes("@")) {

    alert(
      "Masukkan alamat email yang valid."
    );

    return;

  }


  if (password.length < 6) {

    alert(
      "Password minimal 6 karakter."
    );

    return;

  }


  if (password !== password2) {

    alert(
      "Konfirmasi password tidak sama."
    );

    return;

  }


  const existingUser =
    localStorage.getItem("elghoUser");


  if (existingUser) {

    const oldUser =
      JSON.parse(existingUser);


    if (oldUser.email === email) {

      alert(
        "Email tersebut sudah terdaftar."
      );

      return;

    }

  }


  const user = {

    name: name,

    email: email,

    password: password

  };


  localStorage.setItem(
    "elghoUser",
    JSON.stringify(user)
  );


  alert(
    "Pendaftaran berhasil! Silakan masuk."
  );


  document
    .getElementById("loginEmail")
    .value = email;


  document
    .getElementById("loginPassword")
    .value = "";


  showLogin();

}


/* =========================
   LOGIN
========================= */

function login() {

  const email =
    document
      .getElementById("loginEmail")
      .value
      .trim()
      .toLowerCase();

  const password =
    document
      .getElementById("loginPassword")
      .value;


  if (!email || !password) {

    alert(
      "Masukkan email dan password."
    );

    return;

  }


  const savedUser =
    localStorage.getItem("elghoUser");


  if (!savedUser) {

    alert(
      "Akun belum ditemukan. Silakan daftar terlebih dahulu."
    );

    return;

  }


  let user;


  try {

    user =
      JSON.parse(savedUser);

  } catch (error) {

    alert(
      "Data akun rusak. Silakan daftar ulang."
    );

    localStorage.removeItem("elghoUser");

    return;

  }


  if (
    email !== user.email ||
    password !== user.password
  ) {

    alert(
      "Email atau password salah."
    );

    return;

  }


  localStorage.setItem(
    "elghoLoggedIn",
    "true"
  );


  loadUserData();

  showApp();

}


/* =========================
   LOGOUT
========================= */

function logout() {

  localStorage.removeItem(
    "elghoLoggedIn"
  );


  document
    .getElementById("appScreen")
    .classList.add("hidden");


  document
    .getElementById("authScreen")
    .classList.remove("hidden");


  showLogin();

}


/* =========================
   LOAD USER
========================= */

function loadUserData() {

  const savedUser =
    localStorage.getItem("elghoUser");


  if (!savedUser) {
    return;
  }


  let user;


  try {

    user =
      JSON.parse(savedUser);

  } catch (error) {

    return;

  }


  const name =
    user.name || "Pengguna";

  const email =
    user.email || "";


  const welcomeName =
    document.getElementById(
      "welcomeName"
    );


  const sidebarName =
    document.getElementById(
      "sidebarName"
    );


  const profileName =
    document.getElementById(
      "profileName"
    );


  const profileEmail =
    document.getElementById(
      "profileEmail"
    );


  const sidebarAvatar =
    document.getElementById(
      "sidebarAvatar"
    );


  const profileAvatar =
    document.getElementById(
      "profileAvatar"
    );


  if (welcomeName) {

    welcomeName.textContent =
      name;

  }


  if (sidebarName) {

    sidebarName.textContent =
      name;

  }


  if (profileName) {

    profileName.textContent =
      name;

  }


  if (profileEmail) {

    profileEmail.textContent =
      email;

  }


  const initial =
    name
      .charAt(0)
      .toUpperCase();


  if (sidebarAvatar) {

    sidebarAvatar.textContent =
      initial;

  }


  if (profileAvatar) {

    profileAvatar.textContent =
      initial;

  }

}


/* =========================
   SHOW APP
========================= */

function showApp() {

  document
    .getElementById("authScreen")
    .classList.add("hidden");


  document
    .getElementById("appScreen")
    .classList.remove("hidden");


  loadUserData();

}


/* =========================
   NAVIGATION
========================= */

function openPage(pageId, button) {

  const pages =
    document.querySelectorAll(
      ".page"
    );


  pages.forEach(function(page) {

    page.classList.remove(
      "active"
    );

  });


  const selectedPage =
    document.getElementById(
      pageId
    );


  if (!selectedPage) {

    console.warn(
      "Halaman tidak ditemukan:",
      pageId
    );

    return;

  }


  selectedPage.classList.add(
    "active"
  );


  const navItems =
    document.querySelectorAll(
      ".nav-item"
    );


  navItems.forEach(function(item) {

    item.classList.remove(
      "active"
    );

  });


  if (button) {

    button.classList.add(
      "active"
    );

  }


  closeSidebar();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================
   SIDEBAR
========================= */

function toggleSidebar() {

  const sidebar =
    document.getElementById(
      "sidebar"
    );


  if (!sidebar) {
    return;
  }


  sidebar.classList.toggle(
    "show"
  );

}


function closeSidebar() {

  const sidebar =
    document.getElementById(
      "sidebar"
    );


  if (!sidebar) {
    return;
  }


  if (
    window.innerWidth <= 800
  ) {

    sidebar.classList.remove(
      "show"
    );

  }

}


/* =========================
   DARK MODE
========================= */

function toggleTheme() {

  document.body.classList.toggle(
    "dark"
  );


  const buttons =
    document.querySelectorAll(
      ".theme-btn"
    );


  buttons.forEach(function(button) {

    if (
      document.body.classList.contains(
        "dark"
      )
    ) {

      button.textContent = "☀";

    } else {

      button.textContent = "☾";

    }

  });


  const isDark =
    document.body.classList.contains(
      "dark"
    );


  localStorage.setItem(
    "elghoTheme",
    isDark ? "dark" : "light"
  );

}


/* =========================
   CHAT
========================= */

function sendMessage() {

  const input =
    document.getElementById(
      "messageInput"
    );


  const messages =
    document.getElementById(
      "chatMessages"
    );


  if (!input || !messages) {
    return;
  }


  const text =
    input.value.trim();


  if (!text) {

    return;

  }


  const userMessage =
    document.createElement(
      "div"
    );


  userMessage.className =
    "user-message";


  userMessage.innerHTML = `

    <div class="message-avatar">
      ${getUserInitial()}
    </div>

    <div>

      <strong>
        Kamu
      </strong>

      <p>
        ${escapeHTML(text)}
      </p>

    </div>

  `;


  messages.appendChild(
    userMessage
  );


  input.value = "";


  const aiMessage =
    document.createElement(
      "div"
    );


  aiMessage.className =
    "ai-message";


  aiMessage.innerHTML = `

    <div class="message-avatar">
      E
    </div>

    <div>

      <strong>
        ELGHO AI
      </strong>

      <p>
        Pesan kamu sudah diterima.
        Pada tahap berikutnya kita akan
        menghubungkan ELGHO AI dengan
        model AI melalui backend.
      </p>

    </div>

  `;


  setTimeout(function() {

    messages.appendChild(
      aiMessage
    );


    messages.scrollTop =
      messages.scrollHeight;

  }, 500);


  messages.scrollTop =
    messages.scrollHeight;

}


/* =========================
   IMAGE
========================= */

function generateImage() {

  const prompt =
    document.getElementById(
      "imagePrompt"
    );


  const result =
    document.getElementById(
      "imageResult"
    );


  if (!prompt || !result) {
    return;
  }


  if (!prompt.value.trim()) {

    alert(
      "Masukkan prompt gambar terlebih dahulu."
    );

    return;

  }


  result.innerHTML = `

    <span>✨</span>

    <p>
      Prompt diterima.
      Generator gambar akan
      dihubungkan ke API pada
      tahap berikutnya.
    </p>

  `;

}


/* =========================
   VIDEO
========================= */

function generateVideo() {

  const prompt =
    document.getElementById(
      "videoPrompt"
    );


  const result =
    document.getElementById(
      "videoResult"
    );


  if (!prompt || !result) {
    return;
  }


  if (!prompt.value.trim()) {

    alert(
      "Masukkan deskripsi video terlebih dahulu."
    );

    return;

  }


  result.innerHTML = `

    <span>✨</span>

    <p>
      Deskripsi video diterima.
      Generator video akan
      dihubungkan ke API pada
      tahap berikutnya.
    </p>

  `;

}


/* =========================
   WEBSITE GENERATOR
========================= */

function createWebsite() {

  const prompt =
    document.getElementById(
      "websitePrompt"
    );


  const result =
    document.getElementById(
      "websiteResult"
    );


  if (!prompt || !result) {
    return;
  }


  if (!prompt.value.trim()) {

    alert(
      "Masukkan ide website terlebih dahulu."
    );

    return;

  }


  result.innerHTML = `

    <span>🌐</span>

    <p>
      Ide website diterima.
      AI Website Builder akan
      dibuat pada tahap berikutnya.
    </p>

  `;

}


/* =========================
   APP GENERATOR
========================= */

function createApp() {

  const prompt =
    document.getElementById(
      "appPrompt"
    );


  const result =
    document.getElementById(
      "appResult"
    );


  if (!prompt || !result) {
    return;
  }


  if (!prompt.value.trim()) {

    alert(
      "Masukkan ide aplikasi terlebih dahulu."
    );

    return;

  }


  result.innerHTML = `

    <span>📱</span>

    <p>
      Ide aplikasi diterima.
      AI App Builder akan
      dibuat pada tahap berikutnya.
    </p>

  `;

}


/* =========================
   USER INITIAL
========================= */

function getUserInitial() {

  const savedUser =
    localStorage.getItem(
      "elghoUser"
    );


  if (!savedUser) {
    return "L";
  }


  try {

    const user =
      JSON.parse(savedUser);


    return (
      user.name || "L"
    )
      .charAt(0)
      .toUpperCase();

  } catch (error) {

    return "L";

  }

}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


/* =========================
   RESTORE THEME
========================= */

function loadTheme() {

  const theme =
    localStorage.getItem(
      "elghoTheme"
    );


  if (theme === "dark") {

    document.body.classList.add(
      "dark"
    );


    const buttons =
      document.querySelectorAll(
        ".theme-btn"
      );


    buttons.forEach(function(button) {

      button.textContent = "☀";

    });

  }

}


/* =========================
   STARTUP
========================= */

window.addEventListener(
  "load",
  function() {

    loadTheme();


    const loggedIn =
      localStorage.getItem(
        "elghoLoggedIn"
      );


    const savedUser =
      localStorage.getItem(
        "elghoUser"
      );


    if (
      loggedIn === "true" &&
      savedUser
    ) {

      showApp();

    } else {

      document
        .getElementById("authScreen")
        .classList.remove("hidden");


      document
        .getElementById("appScreen")
        .classList.add("hidden");

    }

  }
);
