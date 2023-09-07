// Import and require mysql2
const mysql = require('mysql2');
// Import password for mysql2
const { password, aSCII } = require('./sqlPassword');
// Import and require inquirer (inquirer@8.2.4)
const inquirer = require('inquirer');


// Create connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // Imported mySQL password
    password: password,
    database: 'company_db'
  },
);

// Connect to the database
db.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  // Imported mySQL password ASCII art
  console.log(aSCII);
  console.log('\n\nConnected to the company_db database.\n');
  // Start the CLI application
  init();
});


// Create an array of options for user input
const options = [
  {
    type: 'list',
    name: 'main',
    message: 'What would you like to do:',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'],
  },
];

// Initialize the CLI application
function init() {
  inquirer
    .prompt(options)
    .then((answers) => {
      switch (answers.main) {
        case 'View all departments':
          // Call function to view all departments
          viewAllDepartments();
          break;
        case 'View all roles':
          // Call function to view all roles
          viewAllRoles();
          break;
        case 'View all employees':
          // Call function to view all employees
          viewAllEmployee();
          break;
        case 'Add a department':
          // Call function to add a department
          addDepartment();
          break;
        case 'Add a role':
          // Call function to add a role
          addRole();
          break;
        case 'Add an employee':
          // Call function to add an employee
          addEmployee();
          break;
        case 'Update an employee role':
          // Call function to update an employee role
          updateEmployeeRole()
          break;
        case 'Exit':
          console.log('Exiting the application.');
          // Close the database connection
          db.end();
          process.exit(0);
          break;
        default:
          console.log('Invalid option. Please select a valid option.');
          init();
          break;
      }
    })
    // Display error 
    .catch((err) => {
      console.error('Error:', err);
    });
}



// Function to view all departments
function viewAllDepartments() {
  console.log()
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
    }
    init();
  });
}

// Function to view all roles
function viewAllRoles() {
  console.log()
  db.query('SELECT * FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
    }
    init();
  });
}

// Function to view all employee
function viewAllEmployee() {
  console.log()
  db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id;', function (err, results) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
    }
    init();
  });

}


// Define a function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      // Insert the new department into the database
      db.query(
        'INSERT INTO department (dep_name) VALUES (?)',
        [answers.departmentName],
        function (err, results) {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log(`> ${answers.departmentName} < department added successfully.`);
          }
          promptToAddAnother();
        }
      );
    })
    .catch((err) => {
      // Handle errors related to the entire function here
      console.error('Error:', err);
    });

  function promptToAddAnother() {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'addAnother',
          message: 'Would you like to add another department?',
        },
      ])
      .then((confirm) => {
        if (confirm.addAnother) {
          addDepartment(); // Call the addDepartment function again
        } else {
          init(); // Return to the main menu
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
}

// Define a function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'depID',
        message: 'Choose the department to enter role:',
        choices: [{ name: 'Sales', value: 1 }, { name: 'Legal', value: 2 }, { name: 'Finance', value: 3 }, { name: 'Engineering', value: 4 }],
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter the name of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the name of the salary:',
      },
    ])
    .then((answers) => {
      // Insert the new role into the database
      db.query(
        'INSERT INTO role (department_id, title, salary) VALUES (?,?,?)',
        [answers.depID, answers.title, answers.salary],
        function (err, results) {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log(`> ${answers.title} < added successfully.`);
          }

          // Ask if the user wants to add another role
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another role?',
              },
            ])
            .then((confirmation) => {
              // If the user wants to add another role call addRole
              // If not, return to the main menu
              (confirmation.addAnother) ? addRole() : init();
            })
            .catch((err) => {
              // Handle prompt-related errors here
              console.error('Error:', err);
            });
        }
      );
    })
    .catch((err) => {
      // Handle errors related to the entire function here
      console.error('Error:', err);
    });
}

// A function to add a employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'roleID',
        message: 'Choose the role of the employee',
        choices: [{ name: 'Sales Lead', value: 1 }, { name: 'Salesperson', value: 2 }, { name: 'Lead Engineer', value: 3 }, { name: 'Software Engineer', value: 4 }, { name: 'Account Manager', value: 5 }, { name: 'Accountant', value: 6 }, { name: 'Legal Team Lead', value: 7 }, { name: 'Lawyer', value: 8 }],
      },
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'list',
        name: 'managerID',
        message: 'Choose the manager of the rol/employee',
        choices: [{ name: 'John Doe', value: 1 }, { name: 'Mike Chan', value: 2 }, { name: 'Ashley Rodriguez', value: 3 }, { name: 'Kevin Tupik', value: 4 }, { name: 'Kunal Singh', value: 5 }, { name: 'Malia Brown', value: 6 }, { name: 'Sarah Lourd', value: 7 }, { name: 'Tom Allen', value: 8 }],
      }
    ])
    .then((answers) => {
      // Insert the new employee into the database
      db.query(
        'INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES (?,?,?,?)',
        [answers.roleID, answers.firstName, answers.lastName, answers.managerID],
        function (err, results) {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log(`> ${answers.firstName}, ${answers.lastName} < added successfully.`);
          }

          // Ask if the user wants to add another employee
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another employee?',
              },
            ])
            .then((confirmation) => {
              // If the user wants to add another role call addEmployee
              // If not, return to the main menu
              (confirmation.addAnother) ? addEmployee() : init();
            })
            .catch((err) => {
              // Handle prompt-related errors here
              console.error('Error:', err);
            });
        }
      );
    })
    .catch((err) => {
      // Handle errors related to the entire function here
      console.error('Error:', err);
    });
}


// A function to add a employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'roleID',
        message: 'Choose the role of the employee',
        choices: [{ name: 'Sales Lead', value: 1 }, { name: 'Salesperson', value: 2 }, { name: 'Lead Engineer', value: 3 }, { name: 'Software Engineer', value: 4 }, { name: 'Account Manager', value: 5 }, { name: 'Accountant', value: 6 }, { name: 'Legal Team Lead', value: 7 }, { name: 'Lawyer', value: 8 }],
      },
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'list',
        name: 'managerID',
        message: 'Choose the manager of the rol/employee',
        choices: [{ name: 'John Doe', value: 1 }, { name: 'Mike Chan', value: 2 }, { name: 'Ashley Rodriguez', value: 3 }, { name: 'Kevin Tupik', value: 4 }, { name: 'Kunal Singh', value: 5 }, { name: 'Malia Brown', value: 6 }, { name: 'Sarah Lourd', value: 7 }, { name: 'Tom Allen', value: 8 }],
      }
    ])
    .then((answers) => {
      // Insert the new employee into the database
      db.query(
        'INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES (?,?,?,?)',
        [answers.roleID, answers.firstName, answers.lastName, answers.managerID],
        function (err, results) {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log(`>${answers.firstName}, ${answers.lastName}< added successfully.`);
          }

          // Ask if the user wants to add another employee
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another employee?',
              },
            ])
            .then((confirmation) => {
              // If the user wants to add another role call addEmployee
              // If not, return to the main menu
              (confirmation.addAnother) ? addEmployee() : init();
            })
            .catch((err) => {
              // Handle prompt-related errors here
              console.error('Error:', err);
            });
        }
      );
    })
    .catch((err) => {
      // Handle errors related to the entire function here
      console.error('Error:', err);
    });
}


// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeID',
        message: 'Choose the employee to update role',
        choices: [{ name: 'John Doe', value: 1 }, { name: 'Mike Chan', value: 2 }, { name: 'Ashley Rodriguez', value: 3 }, { name: 'Kevin Tupik', value: 4 }, { name: 'Kunal Singh', value: 5 }, { name: 'Malia Brown', value: 6 }, { name: 'Sarah Lourd', value: 7 }, { name: 'Tom Allen', value: 8 }],
      },
      {
        type: 'list',
        name: 'roleID',
        message: 'Choose the New role of the employee',
        choices: [{ name: 'Sales Lead', value: 1 }, { name: 'Salesperson', value: 2 }, { name: 'Lead Engineer', value: 3 }, { name: 'Software Engineer', value: 4 }, { name: 'Account Manager', value: 5 }, { name: 'Accountant', value: 6 }, { name: 'Legal Team Lead', value: 7 }, { name: 'Lawyer', value: 8 }],
      }
    ])
    .then((answers) => {
      const employeeName = getEmployeeNameById(answers.employeeID);

      if (employeeName) {
        // Update the employee's role in the database
        db.query(
          'UPDATE employee SET `role_id` = ? WHERE `id` = ?',
          [answers.roleID, answers.employeeID],
          function (err, results) {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log(`Employee ${employeeName}'s role updated successfully.`);
            }
            init();
          }
        );
      } else {
        console.error('Invalid employee ID.');
        init();
      }
    })
    .catch((err) => {
      // Handle errors related to the entire function here
      console.error('Error:', err);
    });
}



function getEmployeeNameById(employeeId) {
  // Define a mapping of employee IDs to names
  const employeeIdToName = {
    1: 'John Doe',
    2: 'Mike Chan',
    3: 'Ashley Rodriguez',
    4: 'Kevin Tupik',
    5: 'Kunal Singh',
    6: 'Malia Brown',
    7: 'Sarah Lourd',
    8: 'Tom Allen',
  };

  // Check if the provided employeeId exists in the mapping
  if (employeeIdToName.hasOwnProperty(employeeId)) {
    return employeeIdToName[employeeId];
  } else {
    return null; // Return null for unknown IDs
  }
}







