const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");

// Register event listeners exactly once during application startup
const { registerEventListeners } = require('./events/listeners');
registerEventListeners();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const validateContentType = require('./middleware/validateContentType');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(validateContentType);
app.use(logger);
app.use(cors());

// Health check endpoint (public, unauthenticated)
app.get('/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected) {
        return res.status(503).json({
            success: false,
            message: "Database is disconnected",
            database: "disconnected"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task Manager API is running",
        database: "connected"
    });
});

app.use("/tasks", taskRoutes);
app.use('/', authRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err.message);
});
