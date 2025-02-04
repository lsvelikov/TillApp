CREATE TABLE IF NOT EXISTS table_number (
    id INT AUTO_INCREMENT,
    number varchar(255),
    primary key(ID)
)

DROP TABLE table_number;

CREATE TABLE IF NOT EXISTS tables (
    ID INT AUTO_INCREMENT,
    number varchar(255),
    primary key(ID)
)

USE TILL;

INSERT INTO tables (number)
VALUES ('56');

TRUNCATE TABLE tables;