const express = require("express");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");


const app = express();


app.use(cors());
app.use(express.json());

app.use(expressLayouts);
app.set("layout", "base"); 
app.set("view engine", "ejs");
app.set("views", "./views");


const studentRoutes = require("./routes/studentRoutes");
app.use("/", studentRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});