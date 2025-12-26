const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

mongoose.connect("mongodb://127.0.0.1:27017/course_db")
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database error"));

const courseRoutes = require("./routes/courseRoutes");
app.use("/", courseRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
