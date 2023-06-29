import express from "express";
import connectDatabase from "./services/db.js";
import chatMessage from "./utils/chatMessage.js";
import dotenv from "dotenv";
dotenv.config();
connectDatabase();
import loadChats from "./utils/loadChats.js";
import http from "http";

import { Server } from "socket.io";

import { userJoin, getCurrentUser, getRoomUsers, userLeave } from "./utils/users.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

import logger from "./utils/logger.js";
import messageFormatter from "./utils/messageFormatter.js";

app.use(express.static("public"));
const bot = "chat_BOT";
let user;
io.on("connection", async (socket) => {
	logger.info("New WebSocket Connection ....");
	socket.on("joinRoom", async ({ username, room }) => {
		user = await userJoin(socket.id, username, room);

		socket.join(user.room);

		socket.emit("loadChats", await loadChats(user.roomId));

		socket.broadcast
			.to(user.room)
			.emit("message", messageFormatter(bot, `${user.username} has joined the chat`));
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: await getRoomUsers(user.roomId),
		});
	});
	socket.on("disconnect", async () => {
		const user = await userLeave(socket.id);
		io.to(user.room).emit("message", messageFormatter(bot, `${user.username} has left the chat`));
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: await getRoomUsers(user.roomId),
		});
	});
	socket.on("chatMessage", async (msg) => {
		const user = getCurrentUser(socket.id);

		io.to(user.room).emit("message", await chatMessage(user.roomId, user.username, msg));
	});
});

server.listen(8000 || process.env.PORT, () => {
	logger.info("App is listening on Port 8080");
});
