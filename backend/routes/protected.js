// backend/routes/protected.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth"); // use your auth.js middleware

// Protected route
router.get("/", protect, (req, res) => {
  // req.user now has full user info without password
  res.json({ message: "Welcome to protected route!", user: req.user });
});

module.exports = router;
