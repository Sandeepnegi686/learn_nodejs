import mongoose, { Model } from "mongoose";
import argon2 from "argon2";

interface IUser {
  username: string;
  email: string;
  password: string;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModelType = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModelType, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      console.log(error);
      throw new Error("Document password cannot be saved");
    }
  }
});

userSchema.methods.comparePassword = async function (userPassword: string) {
  try {
    return await argon2.verify(this.password, userPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default mongoose.model<IUser, UserModelType>("User", userSchema);
