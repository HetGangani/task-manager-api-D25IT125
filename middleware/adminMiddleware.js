const adminMiddleware = (req, res, next) => {
    // Ensure the authenticated user has the 'admin' role
    // If req.user.role is undefined (e.g., older token) or not 'admin', deny with 403
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access forbidden. Administrator privileges required."
        });
    }

    next();
};

module.exports = adminMiddleware;

