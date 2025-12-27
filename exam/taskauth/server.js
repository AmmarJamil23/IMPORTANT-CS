const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth_db")
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database error"));

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
