const validateTask = (req, res, next) => {

    const { title, priority } = req.body;

    // Title is required
    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            success: false,
            message: "Task title is required."
        });
    }

    // Priority validation
    if (
        priority !== undefined &&
        !["low", "medium", "high"].includes(priority)
    ) {
        return res.status(400).json({
            success: false,
            message: "Priority must be low, medium, or high."
        });
    }

    // Store trimmed title back into request
    req.body.title = title.trim();

    // Trim description if supplied
    if (req.body.description !== undefined) {

        if (typeof req.body.description !== "string") {
            return res.status(400).json({
                success: false,
                message: "Description must be a string."
            });
        }

        req.body.description = req.body.description.trim();
    }

    next();
};

module.exports = validateTask;