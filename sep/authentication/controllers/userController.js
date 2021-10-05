// Importing depedencies: model, mongoose, bycript, uuid

const User = require("../model/userModel");
const Session = require("../model/sessionModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const uuid = require("uuid");
const expressSession = require("express-session");
const uuid = require("uuid").v4;
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
      password: hashedPassword,
      role: req.body.role || "User",
    });
    await newUser.save();
    // step4
    // redirecting/ render some content
    res.status(201).redirect("/user/login");
  } catch (err) {
    res.status(err.status).render("errors", {
      error: err.message,
    });
  }
};

userController.login = async (req, res) => {
  // step 1 - retrieve the data from the form, find the user in our DB
  let username = req.body.username;
  let password = req.body.password;

  const user = await User.findOne({ username: username });
  if (user == null) {
    return res.status(404).render("errors", {
      error: "User not found!",
    });
  }
  console.log(
    "This is the form password =>",
    password,
    "This is the user.password=>",
    user.password
  );
  // step 2 - Compare password
  try {
    if (await bcrypt.compare(password, user.password)) {
      let sessionId = uuid();
      console.log("This is my session =>", sessionId);
      // Initialize Cookies = cookies.user.role | cookies.Session_Id | cookies.user._Id
      res.cookie("role", user.role, {
        expires: new Date(Date.now() + 500000),
      });
      res.cookie("user_Id", user.user_Id, {
        expires: new Date(Date.now() + 500000),
      });
      res.cookie("session_Id", sessionId, {
        expires: new Date(Date.now() + 500000),
      });
      let newSession = await new Session({
        uuid: sessionId,
        user_id: user,
      });
      newSession.save();
      res.status(200).render("welcome", {
        user: user.username,
      });
    } else {
      res.render("errors", {
        error: "Incorrect Password!",
      });
    }
  } catch (err) {
    res.render("errors", {
      error: err.message,
    });
  }
};

userController.logout = async (req, res) => {
  if (req.cookies.session_Id) {
    res.clearCookie("session_Id");
    res.clearCookie("role");
    res.clearCookie("user_Id");
  }
  res.status(200).redirect("/home");
};

userController.displayLogin = async (req, res) => {
  res.status(200).render("validation", {
    title: "Login",
    done: false,
    toLogin: true,
    errors: false,
  });
};

userController.displayRegister = (req, res) => {
  res.render("validation", {
    title: "Register",
    toLogin: false,
    error: false,
    done: false,
  });
};

module.exports = userController;
