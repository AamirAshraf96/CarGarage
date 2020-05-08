const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User");

//Cars model
const Car = require("../models/Car");

//Login
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", (req, res) => res.render("register"));

//test page
router.get("/test", (req, res) => res.render("test"));

//registerCar Page
router.get("/registerCar", (req, res) => res.render("registerCar"));

//Cars Page
router.get("/cars", (req, res) => res.render("cars"));


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
    User.findOne({ email: email }).then((user) => {
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
        const newUser = new User({
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

// Login Handle
router.post("/login", (req, res, next) => {
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

// Car registration Handle
router.post("/registerCar", (req, res) => {
  const { carMake } = req.body;
  let errors = [];

  const newCar = new Car({
    carMake,
  });

  newCar.save().then((Car) => {
    // req.flash("success_msg", "You are now registered. Please log in.");
    res.redirect("/dashboard");
  })
  .catch((err) => console.log(err));
});

module.exports = router;
