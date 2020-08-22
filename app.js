const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile)

let team = [];

const questions = [
    {
        type: "input",
        message: "Employee Name:",
        name: "name",
        filter: function (value) {
            return value.toUpperCase();
        }
    },
    {
        type: "input",
        message: "Employee ID:",
        name: "id",
        validate: function (value) {
            let valid = Number.isInteger(value);
            return valid || 'Please enter a number (hit up first then delete to try again).';
        },
        filter: Number
    },
    {
        type: "input",
        message: "Employee Email:",
        name: "email",
        validate: function (value) {
            let regex = /@/;
            let valid = regex.test(value);
            return valid || 'Please enter a valid email.';
        }
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
];

const questionsEngineer = [
    {
        type: "input",
        message: "GitHub Username:",
        name: "github",
        filter: function (value) {
            return value.toLowerCase();
        }
    },
    {
        type: "confirm",
        message: "Would you like to add another employee (just hit enter for YES)?",
        name: "askAgain",
        default: true,
    }
];

const questionsIntern = [
    {
        type: "input",
        message: "School:",
        name: "school",
        filter: function (value) {
            return value.toUpperCase();
        }
    },
    {
        type: "confirm",
        message: "Would you like to input another employee (just hit enter for YES)?",
        name: "askAgain",
        default: true,
    }
];

const questionsManager = [
    {
        type: "input",
        message: "Office Number:",
        name: "officeNumber",
        validate: function (value) {
            let valid = Number.isInteger(value);
            return valid || 'Please enter a number (hit up first then delete to try again).';
        },
        filter: Number
    },
    {
        type: "confirm",
        message: "Would you like to input another employee (just hit enter for YES)?",
        name: "askAgain",
        default: true,
    }
];


async function ask() {
    try {
        const data = await inquirer.prompt(questions)

            if(data.type == "Engineer") {
                await inquirer
                    .prompt(questionsEngineer).then(function(response) {
                        const engineer = new Engineer(data.name, data.id, data.email, response.github)
                        team.push(engineer);
                        if (response.askAgain) {
                            ask();
                        }
                    })
            } else if (data.type == "Intern") {
                await inquirer
                    .prompt(questionsIntern).then(function(response) {
                        const intern = new Intern(data.name, data.id, data.email, response.school)
                        team.push(intern);
                        if (response.askAgain) {
                            ask();
                        }
                    })
            } else if (data.type == "Manager") {
                await inquirer
                    .prompt(questionsManager).then(function(response) {
                        const manager = new Manager(data.name, data.id, data.email, response.officeNumber)
                        team.push(manager);
                        if (response.askAgain) {
                            ask();
                        }
                    })
            }
    } catch(err) {

    }
    
}

async function asyncRun() {
    try {
        await ask();
        await writeFileAsync(outputPath, render(team)).then(() => console.log("Success!"))
    }
    catch(error) {
        console.log(error);
    }
}
asyncRun();

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
