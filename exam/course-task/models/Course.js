const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  code: String,
  credit_hours: Number,
  instructor: String
});

module.exports = mongoose.model("Course", courseSchema);
