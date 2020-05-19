const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match User
      User.findOne({ email: email })
        .then((car) => {
          if (!car) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // Match password
          bcrypt.compare(password, car.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, car);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((car, done) => {
    done(null, car.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, car) => {
      done(err, car);
    });
  });
};
