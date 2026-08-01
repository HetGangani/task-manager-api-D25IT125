function validateTaskId(req, res, next) {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });
    }

    next();
}

module.exports = validateTaskId;