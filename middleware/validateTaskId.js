const mongoose = require("mongoose");

function validateTaskId(req, res, next) {
    
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });
    }

    next();
}

module.exports = validateTaskId;