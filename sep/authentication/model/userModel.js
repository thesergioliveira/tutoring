const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: "You must provide a unique username",
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: "You must also provide a password",
  },
  role: {
    type: String,
    required: "You must also provide a role",
  },
  avatar: String,
  // old pass
});

const user = mongoose.model("user", userSchema);
module.exports = user;
