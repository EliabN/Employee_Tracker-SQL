INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Legal"),
       ("Finance"),
       ("Engineering");


INSERT INTO role (department_id, title, salary)
VALUES  (1, "Sales Lead", 100000),
        (1, "Salesperson", 80000),
        (4, "Lead Engineer", 150000),
        (4, "Software Engineer", 120000),
        (3, "Account Manager", 160000),
        (3, "Accountant", 125000),
        (2, "Legal Team Lead", 250000),
        (2, "Lawyer", 190000);


INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, "John", "Doe", NULL),
        (2, "Mike", "Chan", 1),
        (3, "Ashley", "Rodriguez", 1),
        (4, "Kevin", "Tupik", NULL),
        (4, "Kunal", "Singh", 4),
        (3, "Malia", "Brown", 3),
        (3, "Sarah", "Lourd", 3),
        (2, "Tom", "Allen", 2);  
