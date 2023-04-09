import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import ChatModel from "./chat.model.js";
const roomSchema = Schema({
  roomName: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  chats: [{ type: mongoose.Types.ObjectId, ref: "Chat" }],
});
const RoomModel = model("Room", roomSchema);
export default RoomModel;
