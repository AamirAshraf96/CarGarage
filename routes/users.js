const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const Schema = mongoose.Schema;

// User model
const User = require("../models/User");

//Cars model
const Car = require("../models/Car");

//Login
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", (req, res) => res.render("register"));

//registerCar Page
router.get("/registerCar", (req, res) => res.render("registerCar"));

// const newUser = new User();
// console.log("--------------------------------");
// console.log("New User outside of request body");
// console.log(newUser);
// console.log("--------------------------------");
// exports = newUser;

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields." });
  }

  // Check passwords match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match." });
  }

  // Check pw length
  if (password.length < 6) {
    errors.push({ msg: "Password should be longer than 6 characters." });
  }

  // Issue present
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then((user, callback) => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = User({
          name,
          email,
          password,
        });
        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered. Please log in."
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});



User.find({email:'aamir-ashraf@hotmail.com'}, {_id:0, carType:1}).then((user, callback) => {
  user = '' + user;
  user = user.substring(13,37);
  console.log(user);
});

// Login Handle
router.post("/login", (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let error = [];

  User.find({ email: email }, { _id: 1 }).then((user, callback) => {
    console.log(user);
    // Car registration Handle
    router.post("/registerCar", (req, res) => {
      const { carMake, carModel, carid } = req.body;
      let errors = [];

      const newCar = new Car({
        carMake,
        carModel,
        carid: user,
      });

      const newCarid = newCar._id;
      console.log(newCarid);

      User.find({email:email}, {_id:0, carType:1}).then((carTypefound, callback) => {
        //extracting numerical value 
        carTypefound = '' + carTypefound;
        carTypefound = carTypefound.substring(13,37);
        User.updateOne({carType:[carTypefound]}, { $set: { carType: carType.push(newCarid) } }).then((user, callback) => {
          console.log('Done!');
        });
      });

      

      newCar
        .save()
        .then((car) => {
          res.redirect("/dashboard");
        })
        .catch((err) => console.log(err));
    });
  });

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
