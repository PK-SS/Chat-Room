import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = Schema({
  name: { type: String, required: true },
});
const UserModel = model("User", userSchema);
export default UserModel;
