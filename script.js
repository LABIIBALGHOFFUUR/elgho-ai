/* =========================
   SUPABASE CONFIG
========================= */

const SUPABASE_URL = "MASUKKAN_PROJECT_URL_KAMU";
const SUPABASE_PUBLISHABLE_KEY = "MASUKKAN_SB_PUBLISHABLE_KEY_KAMU";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   AUTH SCREEN
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
   GOOGLE LOGIN
========================= */

async function loginWithGoogle() {

  try {

    if (!window.supabase) {

      alert(
        "Supabase belum termuat. Periksa koneksi internet."
      );

      return;

    }


    if (!SUPABASE_URL ||
        !SUPABASE_PUBLISHABLE_KEY) {

      alert(
        "Konfigurasi Supabase belum diisi."
      );

      return;

    }


    const { error } =
      await supabaseClient.auth.signInWithOAuth({

        provider: "google",

        options: {

          redirectTo:
            window.location.origin

        }

      });


    if (error) {

      console.error(
        "Google Login Error:",
        error
      );

      alert(
        "Login Google gagal:\n\n" +
        error.message
      );

    }

  }

  catch (error) {

    console.error(error);

    alert(
      "Terjadi kesalahan:\n\n" +
      error.message
    );

  }

}


/* =========================
   EMAIL LOGIN
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
      "Email dan password wajib diisi."
    );

    return;

  }


  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email: email,

      password: password

    });


  if (error) {

    alert(
      "Login gagal:\n\n" +
      error.message
    );

    return;

  }


  await loadUserData(data.user);

  showApp();

}


/* =========================
   REGISTER
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


  const { data, error } =
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

    return;

  }


  if (data.session) {

    await loadUserData(data.user);

    showApp();

  }

  else {

    alert(
      "Pendaftaran berhasil!\n\n" +
      "Silakan cek email untuk verifikasi akun."
    );

    showLogin();

  }

}


/* =========================
   USER DATA
========================= */

async function loadUserData(user) {

  if (!user) return;


  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Pengguna";


  document
    .getElementById("welcomeName")
    .textContent = name;


  document
    .getElementById("sidebarName")
    .textContent = name;


  document
    .getElementById("profileName")
    .textContent = name;


  document
    .getElementById("profileEmail")
    .textContent =
      user.email || "";


  const firstLetter =
    name
      .charAt(0)
      .toUpperCase();


  document
    .getElementById("sidebarAvatar")
    .textContent =
      firstLetter;


  document
    .getElementById("profileAvatar")
    .textContent =
      firstLetter;

}


/* =========================
   LOGOUT
========================= */

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();


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

function openPage(pageId, button) {

  const pages =
    document.querySelectorAll(".page");


  pages.forEach(page => {

    page.classList.remove("active");

  });


  const selectedPage =
    document.getElementById(pageId);


  if (selectedPage) {

    selectedPage.classList.add("active");

  }


  const navItems =
    document.querySelectorAll(".nav-item");


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
    document.getElementById("sidebar");


  if (window.innerWidth <= 800) {

    sidebar.classList.remove("show");

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
    document.querySelectorAll(".theme-btn");


  buttons.forEach(button => {

    if (
      document.body
        .classList
        .contains("dark")
    ) {

      button.textContent = "☀";

    }

    else {

      button.textContent = "☾";

    }

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
    document.createElement("div");


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
    document.createElement("div");


  aiMessage.className =
    "ai-message";


  aiMessage.innerHTML = `

    <div class="message-avatar">
      E
    </div>

    <div>

      <strong>ELGHO AI</strong>

      <p>
        Sistem AI belum terhubung ke model.
        Backend dan API akan kita buat
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

  return (
    document
      .getElementById(
        "sidebarAvatar"
      )
      .textContent || "L"
  );

}


function escapeHTML(text) {

  const div =
    document.createElement("div");


  div.textContent = text;


  return div.innerHTML;

}


/* =========================
   SESSION
========================= */

async function checkSession() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {

      console.error(error);

      return;

    }


    const session =
      data.session;


    if (
      session &&
      session.user
    ) {

      await loadUserData(
        session.user
      );

      showApp();

    }

    else {

      document
        .getElementById("authScreen")
        .classList
        .remove("hidden");


      document
        .getElementById("appScreen")
        .classList
        .add("hidden");

    }

  }

  catch (error) {

    console.error(error);

  }

}


/* =========================
   AUTH STATE
========================= */

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "Auth event:",
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
   STARTUP
========================= */

window.addEventListener(
  "load",
  () => {

    checkSession();

  }
);
