# Template Engine - Employee Summary Generator

![readmegenerator](https://img.shields.io/badge/license-ISC-red.svg)

## Description

The application is a Node CLI that takes in information about empoyees and generates an HTML webpage that displays summaries for each person. The app prompts the suer for their email, ID, and specific information based on their role with the company. For instance, an intern may provide their school name, an engineer may provide their GitHub username, and a manager may provide their office number.


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Tests](#tests)
* [Questions](#questions)

## Installation

In the Develop folder, there is a package.json that have dependencies `jestjs.io`, for running the provided tests, and `npmjs.com/package/inquirer`, for collecting input from the user. Run `npm install` to install.

## Usage

User can use the CLI to generate an HTML page that displays information about their team. Run `node app.js` to run.

## Contributing

HTML templates for each type of user was created by UCLA Coding Bootcamp.

## License

ISC

## Tests

The tests for the classes Employee, Manager, Engineer, and Intern can be run at any time with `npm run test`.

The `Employee` parent class should have the following properties and
methods:

  * name
  * id
  * email
  * getName()
  * getId()
  * getEmail()
  * getRole() // Returns 'Employee'

The other three classes should extend `Employee`. 

In addition to `Employee`'s properties and methods, `Manager` should also have:

  * officeNumber

  * getRole() // Overridden to return 'Manager'

In addition to `Employee`'s properties and methods, `Engineer` should also have:

  * github  // GitHub username

  * getGithub()

  * getRole() // Overridden to return 'Engineer'

In addition to `Employee`'s properties and methods, `Intern` should also have:

  * school 

  * getSchool()

  * getRole() // Overridden to return 'Intern'

## Questions

If you have any questions, you can reach me through my email tpacba@live.com or connect with me on [GitHub](https://github.com/tpacba).

