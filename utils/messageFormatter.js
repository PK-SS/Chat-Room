import moment from "moment";
const messageFormatter = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};
export default messageFormatter;
