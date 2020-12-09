////****** JS FILE FOR HTML PAGE CHAT  *****//
////****** ----------------------*************//

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const userList = document.getElementById("users");

// Get username and room from URL
let { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
let { userId } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

if (window.sessionStorage.username !== username) {
  window.sessionStorage.username = username
  window.sessionStorage.userId = userId
}
if (!username || !userId) {
  window.location = `http://localhost:5000/index.html`;
}
userId = window.sessionStorage.userId
username = window.sessionStorage.username

const socket = io();
// Join chatroom
const room = 'default';
socket.emit("joinRoom", { username, room });

// Jwt token from sessionstorage
token = 'Bearer ' + window.sessionStorage.accessToken
//Fetching old messages from database
socket.on("historyFetch", () => {
  var apiUrl = 'http://localhost:5000/feed/chats/';
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    (data.chats).forEach(element => {
      socket.emit("oldMessage", element);
    });
  })/*.then(data => {
    (data.chats).forEach(element => {
      socket.emit("oldMessage", { element });
    });
  })*/.catch(err => {
    console.log(err);
  });
});

// To display room users
socket.on("roomUsers", ({ users }) => {
  outputUsers(users);
});

// Alerts and messages from server
socket.on("message", (message) => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Event listener on submitting messages.
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  fetch('http://localhost:5000/feed/chat', {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      chatContent: msg
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }
  ).then(response => {
    return response.json();
  }).then(res => {
    socket.emit("chatMessage", { msg });
    console.log('msg send')
  }).catch(err => {
    console.log(err);
  });
  // Emit chat message to server

  // Clear input for next message
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM // append message to DOM 
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// Updating users on DOM.
function outputUsers(users) {
  document.getElementById("totalusers").innerHTML = (users).length
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
let current_user = "Welcome! "+username
document.getElementById("username").innerHTML = current_user