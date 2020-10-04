const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  // Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { account, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ account });
    if (!user) {
      return res.status(400).json({ msg: "User doesn´t exist" });
    }

    const passCorrect = await bcryptjs.compare(password, user.password);
    if (!passCorrect) {
      return res.status(400).json({ msg: "Password incorrect" });
    }

    // Json Web Token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Failed to connect" });
  }
};

exports.getAuthenticateUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error on get authenticate user" });
  }
};
