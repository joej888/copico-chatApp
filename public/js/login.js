////****** JS FILE FOR LOGIN PAGE   *****//
////****** ----------------------*************//

const loginForm = document.getElementById("login-form");
const socket = io();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let email = e.target.elements.email.value;
  let password = e.target.elements.password.value;

  email = email.trim();
  password = password.trim();

  if (!email) {
    return false;
  }
  if (!password) {
    return false;
  }

  // Login to server
  fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  ).then(response => {
    return response.json();
  }).then(res => {
    console.log('logged in')
  }).catch(err => {
    console.log(err);
  });
});

socket.on("setToken", (token) => {
  window.sessionStorage.accessToken = token;
});

socket.on("loggedIn", ({ username, userId }) => {
  document.getElementById("invalid").innerHTML = "";
  window.location = `http://localhost:5000/chat.html?username=${username}&userId=${userId}`;
});

socket.on("noUser", () => {
  document.getElementById("invalid").innerHTML = "Plese check email entered ...";
});

socket.on("passwordError", () => {
  document.getElementById("invalid").innerHTML = "Plese check password entered ...";
});