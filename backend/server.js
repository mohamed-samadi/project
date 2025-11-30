const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const todoModel = require('./src/config/models/todoModel');

app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await todoModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// app.get('/api/tasks/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const tasks = await todoModel.getTaskById(id);
//     const task = tasks[0] || null;
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json(task);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch task' });
//   }
// });

// app.post('/api/tasks', async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const result = await todoModel.createTask(title, description);
//     res.status(201).json({ message: 'Task created', insertId: result.insertId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to create task' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});