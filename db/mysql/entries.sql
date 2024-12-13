CREATE DATABASE IF NOT EXISTS analysis_db;

USE analysis_db;

CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    link VARCHAR(500),
    timestamp TIMESTAMP
);