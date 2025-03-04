CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255),
    status VARCHAR(255),
    totalSum VARCHAR(255)
) 

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tables_id INT,
    name VARCHAR(255),
    value DECIMAL(10, 2),
    quantity INT,
    FOREIGN KEY (tables_id) REFERENCES tables(id)
);

DROP TABLE tables;

USE TILL;

INSERT INTO items (name, value)
VALUES ('cola', 3.00);

TRUNCATE TABLE items;