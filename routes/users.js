const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


router.post("/signup", async function (req, res, next) {
  if (req.body.email && req.body.password) {
    try {
      const doc = await User.findOne({ email: req.body.email });

      if (!doc) {

        const hash = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          email: req.body.email,
          password: hash
        });

        const result = await newUser.save();

        res.send(result);
      }
      else {
        const error = new Error("user already exist");
        error.status = 409;
        next(error);
      }
    }
    catch (error) {
      // System Error

      next(error);
    }
  }
  else {
    const error = new Error("empty credentials");
    error.status = 400;
    next(error);
  }

});


router.post("/signin", async function (req, res, next) {

  if (req.body.email && req.body.password) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        // Check for the password

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
          // TODO: Create JWT token

          const token = await jwt.sign({
            id: user._id,
            email: user.email
          },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h"
            });


          res.send({ message: "sign-in successful", token });
        }
        else {
          const error = new Error("invalid credential");
          error.status = 401;
          next(error);
        }

      }
      else {
        const error = new Error("invalid credential");
        error.status = 401;
        next(error);
      }

    }
    catch (error) {
      // System Error

      next(error);
    }
  }
  else {
    const error = new Error("empty credentials");
    error.status = 400;
    next(error);
  }

});

module.exports = router;
