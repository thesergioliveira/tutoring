// Importing depedencies: model, mongoose, bycript, uuid

const User = require("../model/userModel");
const Session = require("../model/sessionModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// Initializing controller object
const userController = {};

userController.addNewUser = async (req, res) => {
  // step1 - Check if the user is already registered
  const checkUser = await User.findOne({ username: req.body.username });
  if (checkUser) {
    return res.status(400).render("errors", {
      error: "Sorry, user already registered",
    });
  }
  // step2 - Hash the password
  // step3 - const newUser = new User({})
  // save to the database: username, password, role, avatar
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      password: req.body.password,
      role: req.body.role || "User",
    });
    await newUser.save();
    // step4
    // redirecting/ render some content
    res.status(201).redirect("user/login");
  } catch (err) {
    res.status(err.status).render("errors", {
      error: err.message,
    });
  }
};

userController.login = () => {};

userController.logout = () => {};
