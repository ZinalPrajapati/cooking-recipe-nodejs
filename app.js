const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const app = express();
const port = process.env.PORT || 3000;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("layout", "./layouts/main");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("hello for the express server");
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
