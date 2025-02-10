CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT,
    number VARCHAR(255),
    totalSum VARCHAR(255),
    primary key(ID)
)

DROP TABLE tables;

USE TILL;

INSERT INTO tables (number, totalSum)
VALUES ('809', '45.57');

TRUNCATE TABLE tables;
