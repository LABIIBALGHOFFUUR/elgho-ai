console.log("ELGHO AI JavaScript aktif");


/* =========================
   ELEMENT
========================= */

const authScreen =
  document.getElementById("authScreen");

const appScreen =
  document.getElementById("appScreen");

const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");


/* =========================
   PINDAH KE DAFTAR
========================= */

document
  .getElementById("showRegisterButton")
  .addEventListener("click", function () {

    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

  });


/* =========================
   PINDAH KE LOGIN
========================= */

document
  .getElementById("showLoginButton")
  .addEventListener("click", function () {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

  });


/* =========================
   DAFTAR
========================= */

document
  .getElementById("registerButton")
  .addEventListener("click", function () {

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


    /* CEK DATA */

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {

      alert(
        "Mohon isi semua data."
      );

      return;

    }


    /* CEK EMAIL */

    if (!email.includes("@")) {

      alert(
        "Masukkan email yang benar."
      );

      return;

    }


    /* CEK PASSWORD */

    if (password.length < 6) {

      alert(
        "Password minimal 6 karakter."
      );

      return;

    }


    /* CEK PASSWORD */

    if (password !== password2) {

      alert(
        "Konfirmasi password tidak sama."
      );

      return;

    }


    /* CEK AKUN LAMA */

    const oldUser =
      localStorage.getItem(
        "elghoUser"
      );


    if (oldUser) {

      const user =
        JSON.parse(oldUser);


      if (
        user.email === email
      ) {

        alert(
          "Email sudah terdaftar."
        );

        return;

      }

    }


    /* SIMPAN AKUN */

    const newUser = {

      name: name,

      email: email,

      password: password

    };


    localStorage.setItem(

      "elghoUser",

      JSON.stringify(newUser)

    );


    alert(
      "Pendaftaran berhasil!"
    );


    /* PINDAH LOGIN */

    document
      .getElementById("loginEmail")
      .value = email;


    document
      .getElementById("loginPassword")
      .value = "";


    registerForm
      .classList
      .add("hidden");


    loginForm
      .classList
      .remove("hidden");

  });


/* =========================
   LOGIN
========================= */

document
  .getElementById("loginButton")
  .addEventListener("click", function () {

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


    if (
      email === "" ||
      password === ""
    ) {

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
        "Akun belum ada. Silakan daftar."
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


    /* LOGIN BERHASIL */

    localStorage.setItem(
      "elghoLoggedIn",
      "true"
    );


    showApp(user);

  });


/* =========================
   SHOW APP
========================= */

function showApp(user) {

  authScreen
    .classList
    .add("hidden");


  appScreen
    .classList
    .remove("hidden");


  document
    .getElementById("welcomeName")
    .textContent =
      user.name;


  document
    .getElementById("userName")
    .textContent =
      user.name;


  document
    .getElementById("userAvatar")
    .textContent =
      user.name
        .charAt(0)
        .toUpperCase();

}


/* =========================
   LOGOUT
========================= */

document
  .getElementById("logoutButton")
  .addEventListener("click", function () {

    localStorage.removeItem(
      "elghoLoggedIn"
    );


    appScreen
      .classList
      .add("hidden");


    authScreen
      .classList
      .remove("hidden");

  });


/* =========================
   CHAT TEST
========================= */

document
  .getElementById("startChatButton")
  .addEventListener("click", function () {

    alert(
      "Chat AI akan kita buat pada tahap berikutnya."
    );

  });


document
  .getElementById("chatButton")
  .addEventListener("click", function () {

    alert(
      "Chat AI akan kita buat pada tahap berikutnya."
    );

  });


/* =========================
   CEK LOGIN SAAT WEBSITE DIBUKA
========================= */

window.addEventListener(
  "load",
  function () {

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

      const user =
        JSON.parse(savedUser);


      showApp(user);

    }

  }
);
