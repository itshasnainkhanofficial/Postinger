import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Write Your Name"],
        minlength: 3,
        maxlength: 20,
    },

    email: {
      type: String,
      required: [true, "Please Write Your Email"],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Write A Password"],
      minlength: 3,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
