--> Data to insert in tables <--
INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Legal"),
       ("Finance"),
       ("Engineering");


INSERT INTO sale (department_id, title, salary)
VALUES  (1, "Sales Lead", 100000),
        (1,	"Salesperson", 80000),
        (4, "Lead Engineer", 150000),
        (4, "Software Engineer", 120000),
        (3, "Account Manager", 160000),
        (3,	"Accountant" 125000),
        (2,	"Legal Team Lead", 250000),
        (2,	"Lawyer", 190000);


INSERT INTO employee (role_id, first_name, last_name)
VALUES  (1, "John", "Doe"),
        (2,	"Mike", "Chan"),
        (3,	"Ashley", "Rodriguez"),
        (4,	"Kevin", "Tupik"),
        (5,	"Kunal", "Singh"),
        (6,	"Malia", "Brown"),
        (7,	"Sarah", "Lourd"),
        (8,	"Tom",	"Allen");
