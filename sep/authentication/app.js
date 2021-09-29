// Initial importing for development
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Initializing app
const app = express();

// Setting development environment with morgan
app.use(morgan("dev"));

// Templating engine -Handlebars
const hbs = require("express-handlebars");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
  })
);

// Static files
// Styling
app.use(express.static(path.join(__dirname, "public")));
// Uploads
app.use("/uploads", express.static("uploads"));

// Process data from frontend
// Configuring the application to work with json
app.use(express.json());
// Configuring the application to work with FORM data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Validations
// Validations Setup
const { body, validationResult } = require("express-validator");
// Cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Session
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "mySecret",
    saveUninitialized: false,
    resave: false,
  })
);

// connecting DB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected"))
  .catch((err) => {
    console.log(`There was and error: ${err.message}`);
  });

app.get("/home", (req, res) => {
  res.render("index", {
    title: "validation app",
    data: "Hey, welcome to our app 😎!",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "validation app",
    data: "This is our history 😊",
  });
});

module.exports = app;
