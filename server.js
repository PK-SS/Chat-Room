const express = require("express");

const socketIo = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const logger = require("./utils/logger.js");
const messageFormatter = require("./utils/messageFormatter");
app.use(express.static("public"));
const bot = "chat_BOT";
io.on("connection", (socket) => {
  logger.info("New WebSocket Connection ....");
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", messageFormatter(bot, `welcome to chatcord`));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageFormatter(bot, `${user.username} has joined the chat`)
      );
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        messageFormatter(bot, `${user.username} has left the chat`)
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", messageFormatter(user.username, msg));
  });
});

server.listen(8080 || process.env.PORT, () => {
  logger.info("App is listening on Port 8080");
});
