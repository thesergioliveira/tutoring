const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middleware/userMiddleware");

// base route: localhost:5000/user
// route 1: GET,POST, /user/login
// route 2: GET,POST. /user/register
router.route("/").get();
router.route("/login").get().post();
router.route("/register").get().post();

module.exports = router;
