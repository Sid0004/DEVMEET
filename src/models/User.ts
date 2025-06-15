import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    image: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const UserModel = models.User || mongoose.model("User", UserSchema);
export default UserModel;
