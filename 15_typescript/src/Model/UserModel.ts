import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: String;
  ag: Number;
  email: String;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  ag: Number,
  email: String,
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
