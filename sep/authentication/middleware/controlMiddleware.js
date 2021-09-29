const User = require("../model/userModel");

const allowedAccess = {};

allowedAccess.adminCheck = (req, res, next) => {
  if (req.cookie.role !== "ADMIN") {
    return res.status(401).render("errors", {
      title: "Admin Check failed!",
    });
  }
  next();
};
allowedAccess.allowedToDelete = (req, res, next) => {
  const id = req.params.id;
  if (req.cookie.role == "ADMIN" || req.cookies.user_id == id) {
    next();
  } else {
    return res.status(401).render("errors", {
      title: "You do not have right to delete users information!",
    });
  }
};
allowedAccess.allowedToView = async (req, res, next) => {
  const username = req.params.name;
  const user = await User.findOne({ username: username });

  if (req.cookies.role == "ADMIN" || req.cookies.user_Id == user_Id) {
    next();
  } else {
    return res.status(401).render("errors", {
      title: "You do not have authorization to view the requested information!",
    });
  }
};
allowedAccess.loggedStatus = (req, res, next) => {
  console.log("res.cookie.user_id=>", req.cookies.user_id);
  if (req.cookies.user_id == null) {
    res.title = "Login";
    res.done = false;
    res.toLogin = true;
  } else {
    res.title = "You are already logged in 😎";
    res.done = true;
    res.toLogin = false;
  }
  next();
};

module.exports = allowedAccess;
