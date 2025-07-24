// auth.js

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  if (user === "principal" && pass === "admin123") {
    localStorage.setItem("principal_logged_in", "true");
    window.location.href = "principal.html";
  } else {
    msg.textContent = "Invalid username or password.";
  }
}

function logout() {
  localStorage.removeItem("principal_logged_in");
  window.location.href = "principal-login.html";
}

function checkLogin() {
  if (window.location.pathname.includes("principal.html") &&
      localStorage.getItem("principal_logged_in") !== "true") {
    window.location.href = "principal-login.html";
  }
}

window.onload = checkLogin;
