/* =====================================================
   ELGHO AI
   SUPABASE AUTH + GOOGLE LOGIN
===================================================== */


/* =====================================================
   SUPABASE CONFIG
===================================================== */

const SUPABASE_URL =
  "https://jsdnbjbxkmouuvvzobad.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_aTjRYOJHfeZWPDf3oKU-2Q_wbHrfMMX";


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


/* =====================================================
   AUTH - SHOW LOGIN / REGISTER
===================================================== */

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


/* =====================================================
   REGISTER EMAIL + PASSWORD
===================================================== */

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


  try {

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
          },

          emailRedirectTo:
            window.location.origin +
            window.location.pathname

        }

      });


    if (error) {

      console.error(
        "REGISTER ERROR:",
        error
      );

      alert(
        "Pendaftaran gagal: " +
        error.message
      );

      return;

    }


    /*
      Supabase bisa meminta verifikasi email.
    */

    if (
      data.user &&
      !data.session
    ) {

      alert(
        "Pendaftaran berhasil! " +
        "Silakan cek email kamu untuk verifikasi."
      );

      showLogin();

      document
        .getElementById("loginEmail")
        .value = email;

      return;

    }


    if (data.session) {

      await handleUserSession(
        data.session
      );

    }

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    alert(
      "Terjadi kesalahan saat mendaftar."
    );

  }

}


/* =====================================================
   LOGIN EMAIL + PASSWORD
===================================================== */

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


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

      });


    if (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      alert(
        "Login gagal: " +
        error.message
      );

      return;

    }


    await handleUserSession(
      data.session
    );

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    alert(
      "Terjadi kesalahan saat login."
    );

  }

}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

async function loginWithGoogle() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithOAuth({

        provider: "google",

        options: {

          redirectTo:
            window.location.origin +
            window.location.pathname

        }

      });


    if (error) {

      console.error(
        "GOOGLE LOGIN ERROR:",
        error
      );

      alert(
        "Login Google gagal: " +
        error.message
      );

      return;

    }

    /*
      Supabase otomatis mengarahkan
      pengguna ke Google.
    */

  } catch (error) {

    console.error(
      "GOOGLE LOGIN ERROR:",
      error
    );

    alert(
      "Terjadi kesalahan saat membuka Google Login."
    );

  }

}


/* =====================================================
   AUTH STATE
===================================================== */

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "AUTH EVENT:",
      event
    );


    if (session) {

      await handleUserSession(
        session
      );

    } else {

      showAuthScreen();

    }

  }
);


/* =====================================================
   HANDLE SESSION
===================================================== */

async function handleUserSession(session) {

  if (!session || !session.user) {

    showAuthScreen();

    return;

  }


  const user =
    session.user;


  /*
    Ambil nama dari metadata Google/Supabase.
  */

  let name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Pengguna";


  /*
    Simpan data profil sederhana
    untuk tampilan aplikasi.
  */

  localStorage.setItem(
    "elghoProfile",
    JSON.stringify({

      id: user.id,

      name: name,

      email: user.email || "",

      avatar:
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        ""

    })
  );


  loadUserData();

  showApp();

}


/* =====================================================
   SHOW AUTH
===================================================== */

function showAuthScreen() {

  document
    .getElementById("authScreen")
    .classList.remove("hidden");

  document
    .getElementById("appScreen")
    .classList.add("hidden");

}


/* =====================================================
   SHOW APP
===================================================== */

function showApp() {

  document
    .getElementById("authScreen")
    .classList.add("hidden");

  document
    .getElementById("appScreen")
    .classList.remove("hidden");

}


/* =====================================================
   USER DATA
===================================================== */

async function loadUserData() {

  let profile =
    JSON.parse(
      localStorage.getItem(
        "elghoProfile"
      )
    );


  /*
    Coba ambil user langsung dari Supabase.
  */

  const {
    data
  } =
    await supabaseClient.auth.getUser();


  if (data && data.user) {

    const user =
      data.user;


    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      profile?.name ||
      user.email?.split("@")[0] ||
      "Pengguna";


    profile = {

      id: user.id,

      name: name,

      email:
        user.email || "",

      avatar:
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        ""

    };


    localStorage.setItem(
      "elghoProfile",
      JSON.stringify(profile)
    );

  }


  if (!profile) {

    return;

  }


  const name =
    profile.name ||
    "Pengguna";


  const email =
    profile.email ||
    "";


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
    .textContent = email;


  const firstLetter =
    name
      .charAt(0)
      .toUpperCase();


  document
    .getElementById("sidebarAvatar")
    .textContent =
      firstLetter;


  /*
    Kalau Google punya foto profil,
    gunakan foto tersebut.
  */

  if (profile.avatar) {

    const sidebarAvatar =
      document.getElementById(
        "sidebarAvatar"
      );

    const profileAvatar =
      document.getElementById(
        "profileAvatar"
      );


    sidebarAvatar.innerHTML =
      `<img src="${escapeAttribute(
        profile.avatar
      )}" alt="Avatar">`;


    profileAvatar.innerHTML =
      `<img src="${escapeAttribute(
        profile.avatar
      )}" alt="Avatar">`;

  } else {

    document
      .getElementById("profileAvatar")
      .textContent =
        firstLetter;

  }

}


/* =====================================================
   LOGOUT
===================================================== */

async function logout() {

  try {

    const {
      error
    } =
      await supabaseClient.auth.signOut();


    if (error) {

      console.error(
        "LOGOUT ERROR:",
        error
      );

      alert(
        "Gagal keluar: " +
        error.message
      );

      return;

    }


    localStorage.removeItem(
      "elghoProfile"
    );


    showAuthScreen();

    showLogin();


  } catch (error) {

    console.error(
      "LOGOUT ERROR:",
      error
    );

  }

}


/* =====================================================
   NAVIGATION
===================================================== */

function openPage(
  pageId,
  button
) {

  const pages =
    document.querySelectorAll(
      ".page"
    );


  pages.forEach(
    page => {

      page.classList.remove(
        "active"
      );

    }
  );


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


  navItems.forEach(
    item => {

      item.classList.remove(
        "active"
      );

    }
  );


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


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

  document
    .getElementById("sidebar")
    .classList.toggle(
      "show"
    );

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


/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

  document.body.classList.toggle(
    "dark"
  );


  const buttons =
    document.querySelectorAll(
      ".theme-btn"
    );


  buttons.forEach(
    button => {

      if (
        document.body.classList.contains(
          "dark"
        )
      ) {

        button.textContent = "☀";

      } else {

        button.textContent = "☾";

      }

    }
  );

}


/* =====================================================
   CHAT
===================================================== */

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

      <strong>
        ELGHO AI
      </strong>

      <p>
        Sistem AI belum terhubung
        ke model. Backend AI akan
        ditambahkan pada tahap berikutnya.
      </p>

    </div>

  `;


  messages.appendChild(
    aiMessage
  );


  messages.scrollTop =
    messages.scrollHeight;

}


/* =====================================================
   IMAGE
===================================================== */

function generateImage() {

  const prompt =
    document
      .getElementById(
        "imagePrompt"
      )
      .value
      .trim();


  if (!prompt) {

    alert(
      "Masukkan prompt gambar terlebih dahulu."
    );

    return;

  }


  alert(
    "Generator gambar AI akan dihubungkan pada tahap berikutnya."
  );

}


/* =====================================================
   VIDEO
===================================================== */

function generateVideo() {

  const prompt =
    document
      .getElementById(
        "videoPrompt"
      )
      .value
      .trim();


  if (!prompt) {

    alert(
      "Masukkan deskripsi video terlebih dahulu."
    );

    return;

  }


  alert(
    "Generator video AI akan dihubungkan pada tahap berikutnya."
  );

}


/* =====================================================
   WEBSITE
===================================================== */

function createWebsite() {

  const prompt =
    document
      .getElementById(
        "websitePrompt"
      )
      .value
      .trim();


  if (!prompt) {

    alert(
      "Masukkan ide website terlebih dahulu."
    );

    return;

  }


  alert(
    "AI Website Builder akan dihubungkan pada tahap berikutnya."
  );

}


/* =====================================================
   APP
===================================================== */

function createApp() {

  const prompt =
    document
      .getElementById(
        "appPrompt"
      )
      .value
      .trim();


  if (!prompt) {

    alert(
      "Masukkan ide aplikasi terlebih dahulu."
    );

    return;

  }


  alert(
    "AI App Builder akan dihubungkan pada tahap berikutnya."
  );

}


/* =====================================================
   HELPERS
===================================================== */

function getUserInitial() {

  const profile =
    JSON.parse(
      localStorage.getItem(
        "elghoProfile"
      )
    );


  if (
    !profile ||
    !profile.name
  ) {

    return "L";

  }


  return profile.name
    .charAt(0)
    .toUpperCase();

}


function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


function escapeAttribute(text) {

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}


/* =====================================================
   STARTUP
===================================================== */

window.addEventListener(
  "load",
  async () => {

    try {

      const {
        data,
        error
      } =
        await supabaseClient.auth.getSession();


      if (error) {

        console.error(
          "SESSION ERROR:",
          error
        );

        showAuthScreen();

        return;

      }


      if (
        data &&
        data.session
      ) {

        await handleUserSession(
          data.session
        );

      } else {

        showAuthScreen();

      }

    } catch (error) {

      console.error(
        "STARTUP ERROR:",
        error
      );

      showAuthScreen();

    }

  }
);
