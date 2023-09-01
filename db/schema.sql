DROP DATABASE IF EXIST employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO INCREMENT NOT NULL,
    department VARCHAR(30) NOT NULL
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT AUTO INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);





 