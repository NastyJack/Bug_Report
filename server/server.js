const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const URI = require("./config/config").DATABASE;
const dotenv = require("dotenv");
const session = require("express-session");
const bodyparser = require("body-parser");
dotenv.config();
const passport = require("passport");

const app = express();

require("./config/passport");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB database");
});

const Reports = require("./routes/reports");
const Search = require("./routes/search");
const UserRoute = require("./routes/user");
const Sort = require("./routes/sort");
require("./config/user.auth")(passport);
app.use("/reports", Reports);
app.use("/search", Search);
app.use("/user", UserRoute);
app.use("/filter", Sort);

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on PORT : ${process.env.PORT}`);
});
