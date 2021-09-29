const User = require("../model/userModel");
const Author = require("../model/authorModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Session = require("../model/sessionModel");
const uuid = require("uuid").v4;

const userController = {};

// GET
userController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST
userController.addNewUser = async (req, res) => {
  const userCheck = await User.findOne({ username: req.body.username });
  if (userCheck) {
    return res.status(400).render("errors", {
      error:
        "This user is already registered, please try again with a new username.",
    });
  }
  req.session.done = true;
  console.log("username=>", req.body.username);
  console.log("Password =>", req.body.password);
  try {
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(hashedPassword);
    // res.end(`This is your hashed password: ${hashedPassword}`);

    const newUser = await new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role || "ADMIN",
    });
    await newUser.save();
    res.status(200).redirect("/user/login");
  } catch (err) {
    res.status(500).render("errors", {
      error: err.message,
    });
  }
};
// POST
userController.login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = await User.findOne({
    username: req.body.username,
  });
  const authors = await Author.find();
  if (user == null)
    return res.status(404).render("errors", {
      error: "User not found!",
    });

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let sessionId = uuid();
      res.cookie("session_id", sessionId, {
        expiries: new Date(Date.now() + 900000),
      });
      res.cookie("role", user.role, {
        expiries: new Date(Date.now() + 900000),
      });
      res.cookie("user_id", user._id, {
        expiries: new Date(Date.now() + 900000),
      });
      let session = await new Session({
        uuid: sessionId,
        user_id: user,
      });
      session.save();
      res.status(200).render("welcome", {
        user: username,
      });
    } else {
      res.render("errors", {
        error: "Incorrect password!",
      });
    }
  } catch (err) {
    res.status(500).render("errors", {
      error: err.message,
    });
  }
};
// GET
userController.logout = async (req, res) => {
  if (req.cookies && req.cookies.session_id) {
    res.clearCookie("session_id");
    res.clearCookie("role");
    res.clearCookie("user_id");
    res.clearCookie("connect.sid");
  }
  res.redirect("/home");
};

userController.displayLogin = (req, res) => {
  res.render("validation", {
    title: res.title,
    done: res.done,
    toLogin: res.toLogin,
    errors: req.session.errors,
  });
  req.session.errors = null;
};
userController.displayRegister = (req, res) => {
  res.render("validation", {
    title: "Register",
    toLogin: false,
  });
};

module.exports = userController;
