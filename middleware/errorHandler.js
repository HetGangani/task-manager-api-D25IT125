function errorHandler(err, req, res, next) {
    
    console.error(err);

    if(err.name === "ValidationError") {
        const errors = {};

        for(const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            success: false,
            message: "Validation Failed!!",
            errors
        });
    }

    if(err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID!!"
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}

module.exports = errorHandler;