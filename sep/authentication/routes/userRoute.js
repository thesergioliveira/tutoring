const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middleware/userMiddleware");

// base route: localhost:5500/user

// route 1: GET,POST, /user/login
// route 2: GET,POST. /user/register
router.route("/").get();
router
  .route("/login")
  .get(userController.displayLogin)
  .post(userController.login);
router
  .route("/register")
  .get(userController.displayRegister)
  .post(userController.addNewUser);
router.route("/logout").get(userController.logout);

module.exports = router;
