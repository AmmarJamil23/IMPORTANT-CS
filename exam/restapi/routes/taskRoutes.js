const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const controller = require("../controllers/taskController");

const router = express.Router();

router.get("/", authenticate, controller.getTasks);
router.post("/", authenticate, controller.createTask);
router.put("/:id", authenticate, controller.updateTask);
router.delete("/:id", authenticate, controller.deleteTask);

module.exports = router;
