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
