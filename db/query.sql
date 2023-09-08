SELECT role.id AS 'Role ID',
       role.title AS 'Job Title',
       department.dep_name AS 'Department',
       role.salary AS 'Salary'
FROM role
JOIN department ON role.department_id = department.id;


