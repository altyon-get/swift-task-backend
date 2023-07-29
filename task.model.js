const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['to-do', 'in-progress', 'completed'], required: true },
    history: [], // Array of history objects
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
