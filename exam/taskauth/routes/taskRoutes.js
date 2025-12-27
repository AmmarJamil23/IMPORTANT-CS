const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.send("Tasks accessible only to authenticated users");
});

module.exports = router;
