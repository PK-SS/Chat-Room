const moment = require("moment");
function messageFormatter(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}
module.exports = messageFormatter;
