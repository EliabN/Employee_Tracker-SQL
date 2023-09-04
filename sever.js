// Import and require mysql2
const mysql = require('mysql2');

// Import and require inquirer (inquirer@8.2.4)
const inquirer = require('inquirer');


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
