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
          viewAllDepartments()
          break;
        // Add a department
        case 'Add a department':
          return;
        // Call function to view all roles
        case 'View all roles':
          break;
        // Call function to view all employees
        case 'View all employees':
          break;
        // Call function to add a department
        case 'Add a department':
          break;
        // Call function to add a role
        case 'Add a role':
          break;
        // Call function to add an employee
        case 'Add an employee':
          break;
        // Call function to update an employee role
        case 'Update an employee role':

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
      console.log(results);
    }
  });
  fun();
}


