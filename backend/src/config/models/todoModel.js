
const pool = require('../db');

const getAllTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

const deleteTask = async (req, res) => {

     try{
          const id = req.params.id;
            const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted' });
     }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete task' });
    }     };

const createTask = async (req, res) => {

    try{
            const { title, description } = req.body;
               const [result] = await pool.query("INSERT INTO tasks (title, description) VALUES (?, ?)",
                [title, description]);
                if (!result.insertId) {
                    throw new Error('Insertion failed');
                }
               res.status(201).json({ message: 'Task created', insertId: result.insertId });
     }catch (err) { 
            console.error(err);
               res.status(500).json({ error: 'Failed to create task' });
     }     };


const updateTask = async (req , res) => {
    try{  
               const id = req.params.id;     
               const { title, description, is_completed } = req.body;
               const [result] = await pool.query("UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE id = ?",
                [title, description, is_completed, id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Task not found' });
                }
               res.status(200).json({ message: 'Task updated' });
     }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }     };


    
    

module.exports = {
    getAllTasks , deleteTask , createTask , updateTask

};
