/* =========================
   SUPABASE CONFIG
========================= */

const SUPABASE_URL =
  "https://jsdnbjbxkmouuvvzobad.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_aTjRYOJHfeZWPDf3oKU-2Q_wbHrfMMX";


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


/* =========================
   AUTH FORM
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
   REGISTER EMAIL
========================= */

async function register() {

  const name =
    document
      .getElementById("registerName")
      .value
      .trim();

  const email =
    document
      .getElementById("registerEmail")
      .value
      .trim();

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


  const {
    data,
    error
  } =
    await supabaseClient.auth.signUp({

      email: email,

      password: password,

      options: {

        data: {
          full_name: name
        }

      }

    });


  if (error) {

    alert(
      "Pendaftaran gagal:\n\n" +
      error.message
    );

    console.error(error);

    return;

  }


  if (data.session) {

    await loadUserData(
      data.user
    );

    showApp();

  } else {

    alert(
      "Pendaftaran berhasil!\n\n" +
      "Silakan cek email untuk verifikasi akun."
    );

    document
      .getElementById("loginEmail")
      .value = email;

    showLogin();

  }

}


/* =========================
   LOGIN EMAIL
========================= */

async function login() {

  const email =
    document
      .getElementById("loginEmail")
      .value
      .trim();

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


  const {
    data,
    error
  } =
    await supabaseClient.auth
      .signInWithPassword({

        email: email,

        password: password

      });


  if (error) {

    alert(
      "Login gagal:\n\n" +
      error.message
    );

    console.error(error);

    return;

  }


  await loadUserData(
    data.user
  );

  showApp();

}


/* =========================
   GOOGLE LOGIN
========================= */

async function loginWithGoogle() {

  try {

    const {
      error
    } =
      await supabaseClient.auth
        .signInWithOAuth({

          provider: "google",

          options: {

            redirectTo:
              window.location.origin

          }

        });


    if (error) {

      alert(
        "Google Login gagal:\n\n" +
        error.message
      );

      console.error(error);

    }

  } catch (error) {

    console.error(error);

    alert(
      "Terjadi kesalahan saat membuka Google Login."
    );

  }

}


/* =========================
   LOAD USER
========================= */

async function loadUserData(user) {

  if (!user) return;


  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Pengguna";


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


  if (welcomeName)
    welcomeName.textContent = name;


  if (sidebarName)
    sidebarName.textContent = name;


  if (profileName)
    profileName.textContent = name;


  if (profileEmail)
    profileEmail.textContent =
      user.email || "";


  const initial =
    name
      .charAt(0)
      .toUpperCase();


  if (sidebarAvatar)
    sidebarAvatar.textContent =
      initial;


  if (profileAvatar)
    profileAvatar.textContent =
      initial;

}


/* =========================
   LOGOUT
========================= */

async function logout() {

  const {
    error
  } =
    await supabaseClient.auth
      .signOut();


  if (error) {

    alert(
      "Gagal keluar:\n\n" +
      error.message
    );

    return;

  }


  document
    .getElementById("appScreen")
    .classList.add("hidden");


  document
    .getElementById("authScreen")
    .classList.remove("hidden");


  showLogin();

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


  if (window.innerWidth <= 800) {

    sidebar.classList.remove(
      "show"
    );

  }

}


/* =========================
   THEME
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
        Sistem AI belum terhubung.
        Backend AI akan kita buat
        pada tahap berikutnya.
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

  const avatar =
    document.getElementById(
      "sidebarAvatar"
    );


  return avatar?.textContent ||
    "L";

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
   SESSION
========================= */

async function checkSession() {

  const {
    data,
    error
  } =
    await supabaseClient.auth
      .getSession();


  if (error) {

    console.error(error);

    return;

  }


  if (
    data.session &&
    data.session.user
  ) {

    await loadUserData(
      data.session.user
    );

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


/* =========================
   AUTH STATE
========================= */

supabaseClient.auth
  .onAuthStateChange(
    async (
      event,
      session
    ) => {

      console.log(
        "Auth:",
        event
      );


      if (
        session &&
        session.user
      ) {

        await loadUserData(
          session.user
        );

        showApp();

      }

    }
  );


/* =========================
   START
========================= */

window.addEventListener(
  "load",
  () => {

    checkSession();

  }
);
