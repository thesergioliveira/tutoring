//Importing basic setup
// express, mongoose, morgan, express-session, cookie-parser, express-validator

// Initializing the application as an instance of express
const express = require("express");
const app = express();
//
// Starting morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// Cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// express-validator
const { body, validationResult } = require("express-validator");

// express-session (json Web-Token)
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "keyToAccess",
    saveUninitialized: false,
    resave: false,
  })
);

// Reading json data
app.use(express.json());
// Reading form data from frontend
app.use(express.urlencoded({ extended: true }));

// Templating engine
// ejs
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Handlebars
const hbs = require("express-handlebars");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layouts",
  })
);

//mongoose connection
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`You are connected with DB`))
  .catch((err) => console.log(`This is your error: ${err.message}`));

// routes
const rootRoute = require("../router/rootRoute"); // root route
app.use("/", userRoute);
const userRoute = require("../router/userRoute"); // root route
// user route
app.use("/user", userRoute);

// Export
module.exports = app;
