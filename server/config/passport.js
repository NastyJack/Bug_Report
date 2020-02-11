const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.export = function(passport) {
  passport.use(
    "user",
    new LocalStrategy({ usernameField: "email" }),
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Email not Registered" });
          }
          bcrypt.compare(password, ussr.password, (error, isMatch) => {
            if (isMatch) {
              done(null, user);
            } else {
              done(null, false, { message: "Password doesnt match" });
            }
          });
        })
        .catch(error => {
          console.log("Error");
        });
    }
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, done) => {
      done(err, user);
    });
  });
};
