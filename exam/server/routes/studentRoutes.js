const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/students", (req, res) => {
  res.render("students");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
