CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT,
    number VARCHAR(255),
    totalSum VARCHAR(255),
    primary key(ID)
)

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    value VARCHAR(255),
    primary key(ID)
)

DROP TABLE items;

USE TILL;

INSERT INTO items (name, value)
VALUES ('cola', 3.00);

TRUNCATE TABLE items;
