const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let output = [];

function ask() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Employee Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Employee ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Employee Email:",
            name: "email"
        },
        {
            type: "list",
            message: "Employee Type:",
            name: "type",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ]
        }
    ]).then(function(data) {
        if(data.type == "Engineer") {
            inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "GitHub Username:",
                            name: "github"
                        },
                        {
                            type: "confirm",
                            message: "Would you like to input another employee (just hit enter for YES)?",
                            name: "askAgain",
                            default: true,
                        }
                    ]).then(function(response) {
                        const engineer = new Engineer(data.name, data.id, data.email, response.github)
                        output.push(engineer);
                        if (response.askAgain) {
                            ask();
                        } else {
                            console.log(output);
                        }
                    })
        } else if (data.type == "Intern") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "School:",
                        name: "school"
                    },
                    {
                        type: "confirm",
                        message: "Would you like to input another employee (just hit enter for YES)?",
                        name: "askAgain",
                        default: true,
                    }
                ]).then(function(response) {
                    const intern = new Intern(data.name, data.id, data.email, response.school)
                    output.push(intern);
                    if (response.askAgain) {
                        ask();
                    } else {
                        console.log(output);
                    }
                })
        } else if (data.type == "Manager") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Office Number:",
                        name: "officeNumber"
                    },
                    {
                        type: "confirm",
                        message: "Would you like to input another employee (just hit enter for YES)?",
                        name: "askAgain",
                        default: true,
                    }
                ]).then(function(response) {
                    const manager = new Manager(data.name, data.id, data.email, response.officeNumber)
                    output.push(manager);
                    if (response.askAgain) {
                        ask();
                    } else {
                        console.log(output);
                    }
                })
        }
    })
}

ask();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
