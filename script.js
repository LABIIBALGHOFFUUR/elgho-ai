/* =========================
   SUPABASE
========================= */

const SUPABASE_URL = "TEMPEL_PROJECT_URL_DI_SINI";
const SUPABASE_PUBLISHABLE_KEY = "TEMPEL_SB_PUBLISHABLE_KEY_DI_SINI";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   AUTH
========================= */

function showRegister() {

  document.getElementById("loginForm").classList.add("hidden");

  document.getElementById("registerForm").classList.remove("hidden");

}


function showLogin() {

  document.getElementById("registerForm").classList.add("hidden");

  document.getElementById("loginForm").classList.remove("hidden");

}


/* =========================
   GOOGLE LOGIN
========================= */

async function loginWithGoogle() {

  const { error } =
    await supabaseClient.auth.signInWithOAuth({

      provider: "google",

      options: {
        redirectTo: window.location.origin
      }

    });


  if (error) {

    alert("Login Google gagal: " + error.message);

  }

}


/* =========================
   LOGIN EMAIL
========================= */

async function login() {

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  if (!email || !password) {

    alert("Email dan password wajib diisi.");

    return;

  }


  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email: email,
      password: password

    });


  if (error) {

    alert("Login gagal: " + error.message);

    return;

  }


  await loadSupabaseUser(data.user);

  showApp();

}


/* =========================
   REGISTER
========================= */

async function register() {

  const name =
    document.getElementById("registerName").value.trim();

  const email =
    document.getElementById("registerEmail").value.trim();

  const password =
    document.getElementById("registerPassword").value;

  const password2 =
    document.getElementById("registerPassword2").value;


  if (!name || !email || !password || !password2) {

    alert("Lengkapi semua data terlebih dahulu.");

    return;

  }


  if (password.length < 6) {

    alert("Password minimal 6 karakter.");

    return;

  }


  if (password !== password2) {

    alert("Konfirmasi password tidak sama.");

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

    alert("Pendaftaran gagal: " + error.message);

    return;

  }


  if (data.session) {

    await loadSupabaseUser(data.user);

    showApp();

  } else {

    alert(
      "Pendaftaran berhasil. Silakan cek email untuk verifikasi."
    );

    showLogin();

  }

}


/* =========================
   LOAD USER
========================= */

async function loadSupabaseUser(user) {

  if (!user) return;


  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Pengguna";


  document.getElementById("welcomeName")
    .textContent = name;


  document.getElementById("sidebarName")
    .textContent = name;


  document.getElementById("profileName")
    .textContent = name;


  document.getElementById("profileEmail")
    .textContent = user.email || "";


  const firstLetter =
    name.charAt(0).toUpperCase();


  document.getElementById("sidebarAvatar")
    .textContent = firstLetter;


  document.getElementById("profileAvatar")
    .textContent = firstLetter;

}


/* =========================
   LOGOUT
========================= */

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();


  if (error) {

    alert("Gagal keluar: " + error.message);

    return;

  }


  document.getElementById("appScreen")
    .classList.add("hidden");


  document.getElementById("authScreen")
    .classList.remove("hidden");


  showLogin();

}


/* =========================
   SHOW APP
========================= */

function showApp() {

  document.getElementById("authScreen")
    .classList.add("hidden");


  document.getElementById("appScreen")
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
    .classList.toggle("show");

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

  document.body.classList.toggle("dark");


  const buttons =
    document.querySelectorAll(".theme-btn");


  buttons.forEach(button => {

    if (
      document.body.classList.contains("dark")
    ) {

      button.textContent = "☀";

    } else {

      button.textContent = "☾";

    }

  });

}


/* =========================
   CHAT
========================= */

function sendMessage() {

  const input =
    document.getElementById("messageInput");

  const messages =
    document.getElementById("chatMessages");


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

      <p>${escapeHTML(text)}</p>

    </div>

  `;


  messages.appendChild(userMessage);


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
        Pada tahap berikutnya kita akan membuat
        backend dan API ELGHO sendiri.
      </p>

    </div>

  `;


  messages.appendChild(aiMessage);


  messages.scrollTop =
    messages.scrollHeight;

}


/* =========================
   HELPERS
========================= */

function getUserInitial() {

  const user =
    JSON.parse(localStorage.getItem("elghoUser"));


  if (!user) return "L";


  return user.name
    .charAt(0)
    .toUpperCase();

}


function escapeHTML(text) {

  const div =
    document.createElement("div");


  div.textContent = text;


  return div.innerHTML;

}


/* =========================
   SESSION CHECK
========================= */

async function checkSession() {

  const {
    data: { session },
    error
  } = await supabaseClient.auth.getSession();


  if (error) {

    console.error(error);

    return;

  }


  if (session && session.user) {

    await loadSupabaseUser(session.user);

    showApp();

  } else {

    document.getElementById("authScreen")
      .classList.remove("hidden");

    document.getElementById("appScreen")
      .classList.add("hidden");

  }

}


/* =========================
   STARTUP
========================= */

window.addEventListener("load", () => {

  checkSession();

});
