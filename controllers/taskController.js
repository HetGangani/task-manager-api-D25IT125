const Task = require("../models/Task");
const cache = require("../utils/cache");
const taskEvents = require("../events/events");

const getAllTasks = async (req, res, next) => {
    try {
        // Check in-memory cache first
        const cachedTasks = cache.get("all_tasks");
        if (cachedTasks) {
            return res.status(200).json(cachedTasks);
        }

        // On cache miss, query database
        const tasks = await Task.find();

        // Cache the successful response with default 60s TTL
        cache.set("all_tasks", tasks);

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { title, description, completed, priority } = req.body;

        const newTask = await Task.create({
            title, description, completed, priority
        });

        // Invalidate all_tasks cache on successful creation
        cache.del("all_tasks");

        // 1. Capture the API response timestamp
        const apiResponseTimestamp = new Date().toISOString();

        // 2. Send the existing HTTP 201 JSON response
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: newTask
        });

        // 4. Log timestamps demonstrating API response was sent before notification processing completed
        console.log(`[HTTP 201 SENT] [${apiResponseTimestamp}] Response delivered for Task ID: ${newTask._id}`);

        // 3. Emit task-created with created task and authenticated user information
        taskEvents.emit("task-created", {
            task: newTask,
            user: req.user,
            apiResponseTimestamp,
            simulateError: req.body.simulateNotificationError || false
        });

    } catch (err) {
        next(err);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const cacheKey = `task_${req.params.id}`;

        // Check in-memory cache first
        const cachedTask = cache.get(cacheKey);
        if (cachedTask) {
            return res.status(200).json({
                success: true,
                task: cachedTask
            });
        }

        // On cache miss, query database
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        // Cache the successful response (do not cache 404 or errors)
        cache.set(cacheKey, task);

        res.status(200).json({
            success: true,
            task
        });
    } catch (err) {
        next(err);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        // Invalidate all_tasks and the specific task cache on successful update
        cache.del("all_tasks");
        cache.del(`task_${req.params.id}`);

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task
        });
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        // Invalidate all_tasks and the specific task cache on successful deletion
        cache.del("all_tasks");
        cache.del(`task_${req.params.id}`);

        // 1. Capture the deletion timestamp
        const deletionTimestamp = new Date().toISOString();

        // 2. Send the existing HTTP 200 response
        res.status(200).json({
            success: true,
            message: "Task deleted successfully..."
        });

        console.log(`[HTTP 200 SENT] [${deletionTimestamp}] Deletion response delivered for Task ID: ${req.params.id}`);

        // 3. Emit task-deleted with deleted task and authenticated user information
        taskEvents.emit("task-deleted", {
            task,
            user: req.user,
            deletionTimestamp
        });

    } catch (err) {
        next(err);
    }
};

const getCacheStats = (req, res, next) => {
    try {
        const stats = cache.getStats();
        const keys = cache.keys();

        res.status(200).json({
            success: true,
            hits: stats.hits,
            misses: stats.misses,
            keys,
            stats,
            ttl: cache.options.stdTTL
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getCacheStats
};
