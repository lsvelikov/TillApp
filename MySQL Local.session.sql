CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT,
    number varchar(255),
    totalSum varchar(255),
    primary key(ID)
)

DROP TABLE tables;

CREATE TABLE IF NOT EXISTS tables (
    ID INT AUTO_INCREMENT,
    number varchar(255),
    primary key(ID)
)

USE TILL;

INSERT INTO tables (number, totalSum)
VALUES ('100', '45.5');

TRUNCATE TABLE tables;

DROP TABLE table_number;