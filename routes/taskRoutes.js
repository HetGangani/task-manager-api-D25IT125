const express = require('express');
const validatetaskId = require('../middleware/validateTaskId');
const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } =
    require('../controllers/taskController');
const validateTaskId = require('../middleware/validateTaskId');

router.get("/", authMiddleware, getAllTasks);
router.get("/:id", authMiddleware, validateTaskId, getTaskById);
router.post("/", authMiddleware, validateTask, createTask);
router.put("/:id", authMiddleware, validatetaskId, validateTask, updateTask);
router.delete("/:id", authMiddleware, validatetaskId, deleteTask);

module.exports = router;