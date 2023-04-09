import ChatModel from "../models/chat.model.js";
import RoomModel from "../models/room.model.js";

const loadChats = async (roomId) => {
  const room = await RoomModel.findOne({ _id: roomId }).populate("chats");
  const chats = room.chats;
  return chats;
};
export default loadChats;
