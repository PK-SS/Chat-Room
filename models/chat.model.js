import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const chatSchema = Schema({
  roomId: { type: mongoose.Types.ObjectId },
  text: { type: String, required: true },
  username: { type: String, required: true },
  time: { type: String, required: true },
});
const ChatModel = model("Chat", chatSchema);
export default ChatModel;
