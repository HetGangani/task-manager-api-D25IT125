function validateContentType(req, res, next) {
    if(req.method === "POST" || req.method === "PUT") {
        if(!req.is("application/json")) {
            return res.status(400).json({
                success: false,
                message: "Content-Type must be application/json"
            });
        }
    }

    next();
}

module.exports = validateContentType;