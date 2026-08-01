let tasks = [];
let currentId = 1;

const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const { title } = req.body;
    const newTask = {
        id: currentId++,
        title: title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: newTask
    });
};

const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);

    if(!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: task
    });
};

const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    if(index === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "Task deleted successfully!!!"
    });
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}