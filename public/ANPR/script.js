var btnLogin = document.getElementById("do-login");
var idLogin = document.getElementById("login");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
btnLogin.onclick = function () {
  idLogin.innerHTML =
    "<p>We're happy to see you again, </p><h1>" + username.value + "</h1>";
};
const password = "admin";
const username = "Admin";
btnLogin.addEventListener("click", () => {
  if (usernameInput.value === username && passwordInput.value === password) {
    console.log("Ur Welcome");
    alert("Ur Welcome");
  } else {
    console.error("Sorry");
  }
});
