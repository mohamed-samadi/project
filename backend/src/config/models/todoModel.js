const pool = require('../db');

module.exports = {
    getAllTasks: async () => {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query("SELECT * FROM tasks");
            return rows;
        } finally {
            connection.release();
        }
    },

    // getTaskById: async (id) => {
    //     const connection = await pool.getConnection();
    //     try {
    //         const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [id]);
    //         return rows;
    //     } finally {
    //         connection.release();
    //     }
    // },

    // createTask: async (title, description) => {
    //     const connection = await pool.getConnection();
    //     try {
    //         const [result] = await connection.query(
    //             "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)",
    //             [title, description, false]
    //         );
    //         return result;
    //     } finally {
    //         connection.release();
    //     }
    // }
};