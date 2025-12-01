-- create database if not exists todo_list ;
use todo_list;

-- CREATE TABLE if not exists tasks (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     is_completed BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--     );

INSERT INTO tasks (title, description, is_completed) VALUES
('Sport', 'Go to the gym today', FALSE),
('Study', 'Finish 2 chapters of the JavaScript book', FALSE),
('Shopping', 'Buy groceries for the week', FALSE),
('Work', 'Complete the project report for the client', TRUE),
('Reading', 'Read 20 pages of a new book', FALSE),
('Cleaning', 'Clean the bedroom and living room', TRUE),
('Cooking', 'Prepare dinner for tonight', FALSE),
('Learning', 'Watch a React tutorial video', FALSE),
('Meeting', 'Team meeting at 3 PM', TRUE),
('Relax', 'Meditate for 15 minutes', FALSE);


select * from tasks ;