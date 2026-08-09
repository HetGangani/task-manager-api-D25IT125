const express = require('express');
const validatetaskId = require('../middleware/validateTaskId');
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } =
    require('../controllers/taskController');
const validateTaskId = require('../middleware/validateTaskId');

router.get("/", getAllTasks);
router.get("/:id", validateTaskId, getTaskById);
router.post("/", createTask);
router.put("/:id", validatetaskId, updateTask);
router.delete("/:id", validatetaskId, deleteTask);

module.exports = router;