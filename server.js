// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskController = require('./task.controller');
const coinsController = require('./coins.controller');
require('dotenv').config(); // Load environment variables from .env file


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


// Update the coins
app.put('/api/coins', coinsController.updateCoins);


// Task Routes
app.get('/api/tasks', taskController.getAllTasks);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
