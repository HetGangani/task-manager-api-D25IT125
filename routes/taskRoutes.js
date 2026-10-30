const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const validateTask = require("../middleware/validateTask");
const validateTaskId = require('../middleware/validateTaskId');
const router = express.Router();

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCacheStats
} = require('../controllers/taskController');

// Cache statistics debug endpoint (protected with JWT auth and Admin authorization)
// Mounted BEFORE /:id to prevent Express matching "cache" as a task ID parameter
router.get("/cache/stats", authMiddleware, adminMiddleware, getCacheStats);

router.get("/", authMiddleware, getAllTasks);
router.get("/:id", authMiddleware, validateTaskId, getTaskById);
router.post("/", authMiddleware, validateTask, createTask);
router.put("/:id", authMiddleware, validateTaskId, validateTask, updateTask);
router.delete("/:id", authMiddleware, validateTaskId, deleteTask);

module.exports = router;
