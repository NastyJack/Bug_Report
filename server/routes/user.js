const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/config").SECRET;

// router.post("/test", (req, res) => {
//   res.json({ message: "Test api", message2: req.body });
// });

router.post("/login", (req, res) => {
  console.log(req.body, "body");
  // let email = req.body.email;
  if (
    req.body.email.match("admin@mordorintelligence.com") &&
    req.body.password === "admin@mordor"
  ) {
    res.json({
      success: true,
      admin: true
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        res.status(404).json({ message: "User not found in database" });
      }
      bcrypt.compare(req.body.password, user.password, (err, success) => {
        if (success) {
          res.json({
            success: true,
            admin: false
          });
        }
      });
    });
  }
});

router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(404).json({ message: "user already exists" });
    }
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    console.log(newUser);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log("Error while hashing");
        res.status(500).json("Error while generating salt");
      }
      bcrypt.hash(req.body.password, salt).then(hashPassword => {
        console.log(hashPassword);
        newUser.password = hashPassword;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log("Error while registering");
          });
      });
    });
  });
});
module.exports = router;
