const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const leaveButton = document.getElementById("leave-btn");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const socket = io();
const { username, room } = Qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username: username, room: room });
socket.on("loadChats", (chatArray) => {
  loadMessages(chatArray);
});
socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});
function outputRoomName(room) {
  roomName.innerText = room;
}
function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.name}</li>`).join("")}`;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
  socket.emit("chatMessage", msg);
});
function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
<p class="text">
${msg.text}
</p>
`;
  document.querySelector(".chat-messages").appendChild(div);
}
function loadMessages(chatArray) {
  chatArray.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
<p class="text">
${msg.text}
</p>
`;
    document.querySelector(".chat-messages").appendChild(div);
  });
}
function leaveButtonHandler() {
  socket.disconnect();
}
leaveButton.addEventListener("click", leaveButtonHandler);
