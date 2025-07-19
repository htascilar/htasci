
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  console.log("Persistence türü:", persistence);

  firebase.auth().setPersistence(persistence).then(() => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("savedEmail");
    }

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }).then((userCredential) => {
    window.location.href = "panel.html";
  }).catch((error) => {
    alert("Incorrect email or password.");
    document.getElementById("error").textContent = "";
  });
}

// Sayfa yüklendiğinde checkbox ve email alanını doldur
window.addEventListener("DOMContentLoaded", () => {
  const remembered = localStorage.getItem("rememberMe");
  const savedEmail = localStorage.getItem("savedEmail");

  if (remembered === "true") {
    document.getElementById("rememberMe").checked = true;
    if (savedEmail) {
      document.getElementById("email").value = savedEmail;
    }
  }

  // Eğer kullanıcı zaten giriş yaptıysa panel.html'e yönlendir
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href = "panel.html";
    }
  });
});
