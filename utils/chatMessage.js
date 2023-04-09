import moment from "moment";
import ChatModel from "../models/chat.model.js";
import RoomModel from "../models/room.model.js";
let chatD;
let roomD;
const chatMessage = async (roomId, username, text) => {
  const newChat = new ChatModel({
    roomId,
    text,
    username,
    time: moment().format("h:mm a"),
  });
  chatD = await newChat.save();
  roomD = await RoomModel.findOne({ _id: roomId });
  roomD.chats = [...roomD.chats, chatD._id];
  await roomD.save();

  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};
export default chatMessage;
