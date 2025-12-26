const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.render("courses", { courses });
});

router.get("/courses/add", (req, res) => {
  res.render("addCourse");
});

router.post("/courses/add", async (req, res) => {
  const { title, code, credit_hours, instructor } = req.body;

  await Course.create({
    title,
    code,
    credit_hours,
    instructor
  });

  res.redirect("/courses");
});

module.exports = router;
