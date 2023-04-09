import UserModel from "../models/user.model.js";

import RoomModel from "../models/room.model.js";

let users = [];
export const userJoin = async (id, username, room) => {
  let user;
  let roomD;

  let userD;
  userD = await UserModel.findOne({ name: username });
  if (userD === null) {
    const newUser = new UserModel({ name: username });
    await newUser.save();
    userD = newUser;
  }
  roomD = await RoomModel.findOne({ roomName: room });
  if (roomD === null) {
    const newRoom = new RoomModel({ roomName: room });
    await newRoom.save();
    roomD = newRoom;
  }
  roomD.users = [...roomD.users, userD._id];
  await roomD.save();

  user = {
    socketId: id,
    id: userD._id,
    roomId: roomD._id,
    room: roomD.roomName,
    username: userD.name,
  };
  users.push(user);
  return user;
};

export const userLeave = async (socketId) => {
  let roomD;
  const index = users.findIndex((user) => user.socketId === socketId);
  const userFound = users[index];

  roomD = await RoomModel.findOne({ _id: userFound.roomId }).populate("users");
  if (roomD === null) {
    console.log("there was an error fetching room details");
    return;
  }

  const indexRoom = roomD.users.findIndex(
    (user) => String(user._id) === String(userFound.id)
  );

  if (indexRoom !== -1) {
    const usersArray = [...roomD.users];
    usersArray.splice(indexRoom, 1);
    roomD.users = [...usersArray];
    await roomD.save();
    return userFound;
  }
};
export const getRoomUsers = async (roomId) => {
  let roomD;
  roomD = await RoomModel.findOne({ _id: roomId }).populate("users");
  if (roomD === null) {
    console.log("there was an error fetching room details");
    return;
  }
  return roomD.users;
};

export const getCurrentUser = (id) => {
  return users.find((user) => user.socketId === id);
};
