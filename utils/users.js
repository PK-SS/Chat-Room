const users = [];

exports.userJoin = function (id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
};
exports.getCurrentUser = function (id) {
  return users.find((user) => user.id === id);
};
exports.userLeave = function (id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
exports.getRoomUsers = function (room) {
  return users.filter((user) => user.room === room);
};
