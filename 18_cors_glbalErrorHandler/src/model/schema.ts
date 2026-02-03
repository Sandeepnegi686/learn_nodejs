import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Boolean },
    hashedPassword: { type: String },
    favoriteIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Movie" },
  },
  { timestamps: true },
);

export default mongoose.model("User", Schema);
