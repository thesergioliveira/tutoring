const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const controlMiddleware = require("../middleware/controlMiddleware");

// route: localhost:5800/user/
router.route("/").get(userController.getAllUsers);

router
  .route("/login")
  .get(controlMiddleware.loggedStatus, userController.displayLogin)
  .post(controlMiddleware.loggedStatus, userController.login);

router
  .route("/register")
  .get(userController.displayRegister)
  .post(userController.addNewUser);
router.route("/logout").get(userController.logout);

module.exports = router;
