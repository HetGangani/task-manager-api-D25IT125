const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");

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
