// Import and require mysql2
const mysql = require('mysql2');
// Import password for mysql2
const password = require('./sqlPassword');
// Import and require inquirer (inquirer@8.2.4)
const inquirer = require('inquirer');
const { error } = require('console');

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
    console.log(`Connected to the company_db database.`)
);

// Connect to the database
db.connect(function(err) {
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
      // Filter through options
    })
    // Display error 
    .catch((err) => {
      console.error('Error:', err);
    });
}



