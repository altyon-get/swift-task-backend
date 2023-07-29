const Task = require('./task.model');
const Coins = require('./coins.model');

exports.getAllTasks = (req, res) => {
    // console.log('getall request');
    Task.find({})
      .then((tasks) => {
        Coins.find({})
          .then((coins) => { // Changed the variable name to "coins" to better represent the data
            if (coins.length === 0) {
              return res.status(404).json({ error: 'Coins not found' });
            }
  
            const coin = coins[0]; // Assuming there's only one object in the "coins" array
            const id = coin._id;
            const amount = coin.coins;
            // console.log('Tasks and Coins retrieved successfully XXX', amount);
            return res.status(200).json({ tasks, amount });
          })
          .catch((err) => {
            return res.status(500).json({ error: 'Error retrieving coins' });
          });
      })
      .catch((err) => {
        return res.status(500).json({ error: 'Error retrieving tasks' });
      });
  };
  
  
exports.createTask = (req, res) => {
//   console.log('create request');
  const task = new Task(req.body);
//   console.log(req.body,' coming');
//   console.log(task,' prcsed');
  task.save()
    .then((newTask) => {
    //   console.log('Task created successfully');
      return res.status(201).json(newTask);
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Error creating task' });
    });
};

exports.updateTask = (req, res) => {
    // console.log('updated request');
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTask) => {
    //   console.log('Task updated successfully');
      return res.status(200).json(updatedTask);
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Error updating task' });
    });
};

exports.deleteTask = (req, res) => {
  console.log('delete request');
  Task.findByIdAndRemove(req.params.id)
    .then((deletedTask) => {
    //   console.log('Task deleted successfully',deletedTask);
      return res.status(200).json(deletedTask);
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Error deleting task' });
    });
};
