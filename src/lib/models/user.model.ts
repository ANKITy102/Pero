import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    sensayUserId: {
      type: String,
      required: true,
    },
    username: { 
        type: String, 
    },
    password: String,
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_640.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
