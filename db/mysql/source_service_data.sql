CREATE DATABASE IF NOT EXISTS analysis_db;

USE analysis_db;

CREATE TABLE `source_service_data` (
    `id` int AUTO_INCREMENT PRIMARY KEY,
    `service_id` int NOT NULL,
    `title` varchar(255) NOT NULL,
    `link` varchar(255) NOT NULL,
    `description` text,
    `published` timestamp
);