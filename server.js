const express = require('express');

const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const validateContentType = require('./middleware/validateContentType');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(validateContentType);
app.use(logger);

app.use("/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});