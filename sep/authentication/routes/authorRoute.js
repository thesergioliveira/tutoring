const express = require("express");
const authorController = require("../controllers/authorController");
const router = express.Router();

// route: localhost:5800/author
router
  .route("/")
  .get(authorController.displayAll)
  .post(authorController.addNewAuthor);
module.exports = router;
