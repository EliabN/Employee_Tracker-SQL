DROP DATABASE IF EXIST company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT AUTO INCREMENT NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    PRIMARY KEY (id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);



 