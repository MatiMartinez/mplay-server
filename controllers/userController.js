const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { account, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ account });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User(req.body);

    // Json Web Token
    const payload = {
      user: {
        id: user._id,
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

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Failed to insert user" });
  }
};
