function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().setPersistence(persistence).then(() => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }).then((userCredential) => {
    window.location.href = "panel.html";
  }).catch((error) => {
    document.getElementById("error").textContent = error.message;
  });
}
