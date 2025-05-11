CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo',
  project_id INT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
); 