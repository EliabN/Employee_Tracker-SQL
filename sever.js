// Import and require mysql2
const mysql = require('mysql2');

// Import and require inquirer (inquirer@8.2.4)
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the books_db database.`)
);


// Create an array of options for user input
const options = [
    {
      type: 'list',
      name: 'Main',
      message: 'What would do uou like to do:',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
]


// Create a function to initialize/CLI app
function init() {
    inquirer
    // Filter through questions
    .prompt(options)
    .then((options) => {
        // Store the new README content with user content
        const readmeFileContent = generateMarkdown(answers);
    })
    .catch;
}


// Function call to initialize app
init();
