window.onload = function () {
  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");
  const remember = localStorage.getItem("remember");

  if (remember === "true") {
    document.getElementById("email").value = savedEmail || "";
    document.getElementById("password").value = savedPassword || "";
    document.getElementById("rememberMe").checked = true;
  }
};

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  if (rememberMe) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("remember", true);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("remember");
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = "panel.html";
    })
    .catch((error) => {
      document.getElementById("error").textContent = "Giriş başarısız: " + error.message;
    });
}
