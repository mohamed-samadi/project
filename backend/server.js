

require('dotenv').config(); // MUST BE FIRST
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const {getAllTasks , deleteTask , createTask , updateTask} = require('./src/config/models/todoModel');
const cors = require('cors');
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('API is running successfully');
});



app.get('/api/tasks', getAllTasks);
app.delete('/api/tasks/:id', deleteTask);
app.post('/api/tasks', createTask);
app.put('/api/tasks/:id', updateTask);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});