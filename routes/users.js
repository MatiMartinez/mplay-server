// Routes for user
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

// Create user
router.post(
  "/",
  [
    check("name", "required").not().isEmpty(),
    check("account", "required").not().isEmpty(),
    check("password", "min length 6").isLength({ min: 6 }),
  ],
  (req, res) => {
    userController.createUser(req, res);
  }
);

module.exports = router;
