// Import and require mysql2
const mysql = require('mysql2');
// Import password for mysql2
const password = require('./sqlPassword');
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
  console.log('Connected to the company_db database.\n');
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
      'Exit'
    ],
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
        case 'Add a department':
          // Call function to add a department
          addDepartment();
          return;
        case 'View all roles':
          // Call function to view all roles
          break;
        case 'View all employees':
          // Call function to view all employees
          break;
        case 'Add a department':
          // Call function to add a department
          break;
        case 'Add a role':
          // Call function to add a role
          addRole();
          break;
        case 'Add an employee':
          // Call function to add an employee
          break;
        case 'Update an employee role':
          // Call function to update an employee role
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
  });
  init();
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
            console.log(`${answers.departmentName} department added successfully.`);
          }

          // Ask if the user wants to add another department
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'addAnother',
                message: 'Would you like to add another department?',
              },
            ])
            .then((confirm) => {
              // If Yes to add another department> call addDepartment, else> return to main menu
              (confirm.addAnother) ? addDepartment() : init();
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

// Define a function to add a department
function addRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'depName',
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
        [answers.depName, answers.title, answers.salary],
        function (err, results) {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log(`${answers.title}added successfully.`);
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


