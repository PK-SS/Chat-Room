import { connect } from "mongoose";
const connectDatabase = () => {
  connect(
    "mongodb+srv://test2:GwgDOAyNRjMWbniw@cluster0.uyo2qbo.mongodb.net/?retryWrites=true&w=majority"
  )
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e.message));
};

export default connectDatabase;
