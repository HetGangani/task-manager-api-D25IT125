const Task = require("../models/Task");

const getAllTasks = async(req, res, next) => {
    try{
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch(err) {
        next(err);
    }
};

const createTask = async(req, res, next) => {
    try {
        const { title, description, completed, priority } = req.body;

        const newTask = await Task.create({
            title, description, completed, priority
        });

        res.status(201).json({
            success: true, message: "Task created successfully",
            task: newTask
        });

    } catch(err) {
        next(err);
    }
};

const getTaskById = async(req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            task
        });
    } catch (err) {
        next(err);
    }
};

const updateTask = async(req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task
        });
    } catch (err) {
        next(err);
    }
};

const deleteTask = async(req, res, next) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if(!task) {
                return res.status(404).json({
                    success: false,
                    message: "Task not found."
                });
            }

            res.status(200).json({
                success: true,
                message: "Task deleted successfully..."
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
    deleteTask
}