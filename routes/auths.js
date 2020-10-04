// Routes for auth
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// Auth user
router.post(
  "/",
  [
    check("account", "required").not().isEmpty(),
    check("password", "min length 6").isLength({ min: 6 }),
  ],
  (req, res) => {
    authController.authUser(req, res);
  }
);

// Get login user
router.get("/", auth, (req, res) => {
  authController.getAuthenticateUser(req, res);
});

module.exports = router;
