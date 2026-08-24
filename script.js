/* =========================
   AUTH - LOCAL PROTOTYPE
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
      "Lengkapi semua data terlebih dahulu."
    );

    return;

  }


  if (
    !email.includes("@")
  ) {

    alert(
      "Masukkan alamat email yang valid."
    );

    return;

  }


  if (
    password.length < 6
  ) {

    alert(
      "Password minimal 6 karakter."
    );

    return;

  }


  if (
    password !== password2
  ) {

    alert(
      "Konfirmasi password tidak sama."
    );

    return;

  }


  const existingUser =
    localStorage.getItem(
      "elghoUser"
    );


  if (existingUser) {

    const oldUser =
      JSON.parse(existingUser);


    if (
      oldUser.email === email
    ) {

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
    localStorage.getItem(
      "elghoUser"
    );


  if (!savedUser) {

    alert(
      "Akun belum ditemukan. Silakan daftar terlebih dahulu."
    );

    return;

  }


  const user =
    JSON.parse(savedUser);


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
   USER DATA
========================= */

function loadUserData() {

  const savedUser =
    localStorage.getItem(
      "elghoUser"
    );


  if (!savedUser) return;


  const user =
    JSON.parse(savedUser);


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


  if (welcomeName)
    welcomeName.textContent =
      user.name;


  if (sidebarName)
    sidebarName.textContent =
      user.name;


  if (profileName)
    profileName.textContent =
      user.name;


  if (profileEmail)
    profileEmail.textContent =
      user.email;


  const firstLetter =
    user.name
      .charAt(0)
      .toUpperCase();


  const sidebarAvatar =
    document.getElementById(
      "sidebarAvatar"
    );

  const profileAvatar =
    document.getElementById(
      "profileAvatar"
    );


  if (sidebarAvatar)
    sidebarAvatar.textContent =
      firstLetter;


  if (profileAvatar)
    profileAvatar.textContent =
      firstLetter;

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

}


/* =========================
   NAVIGATION
========================= */

function openPage(
  pageId,
  button
) {

  const pages =
    document.querySelectorAll(
      ".page"
    );


  pages.forEach(page => {

    page.classList.remove(
      "active"
    );

  });


  const selectedPage =
    document.getElementById(
      pageId
    );


  if (selectedPage) {

    selectedPage.classList.add(
      "active"
    );

  }


  const navItems =
    document.querySelectorAll(
      ".nav-item"
    );


  navItems.forEach(item => {

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

  document
    .getElementById("sidebar")
    .classList
    .toggle("show");

}


function closeSidebar() {

  const sidebar =
    document.getElementById(
      "sidebar"
    );


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

  document.body
    .classList
    .toggle("dark");


  const buttons =
    document.querySelectorAll(
      ".theme-btn"
    );


  buttons.forEach(button => {

    button.textContent =
      document.body
        .classList
        .contains("dark")
        ? "☀"
        : "☾";

  });

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


  const text =
    input.value.trim();


  if (!text) return;


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

      <strong>Kamu</strong>

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

      <strong>ELGHO AI</strong>

      <p>
        Sistem AI belum terhubung
        ke model AI.
        Kita akan membuat backend
        ELGHO pada tahap berikutnya.
      </p>

    </div>

  `;


  messages.appendChild(
    aiMessage
  );


  messages.scrollTop =
    messages.scrollHeight;

}


/* =========================
   HELPERS
========================= */

function getUserInitial() {

  const savedUser =
    localStorage.getItem(
      "elghoUser"
    );


  if (!savedUser)
    return "L";


  const user =
    JSON.parse(savedUser);


  return user.name
    .charAt(0)
    .toUpperCase();

}


function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent = text;


  return div.innerHTML;

}


/* =========================
   STARTUP
========================= */

window.addEventListener(
  "load",
  () => {

    const loggedIn =
      localStorage.getItem(
        "elghoLoggedIn"
      );


    if (
      loggedIn === "true"
    ) {

      loadUserData();

      showApp();

    } else {

      document
        .getElementById(
          "authScreen"
        )
        .classList
        .remove("hidden");


      document
        .getElementById(
          "appScreen"
        )
        .classList
        .add("hidden");

    }

  }
);
