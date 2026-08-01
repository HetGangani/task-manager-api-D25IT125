const express = require('express');
const validatetaskId = require('../middleware/validateTaskId');
const router = express.Router();

const { getAllTasks, createTask, updateTask, deleteTask } =
    require('../controllers/taskController');

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", validatetaskId, updateTask);
router.delete("/:id", validatetaskId, deleteTask);

module.exports = router;