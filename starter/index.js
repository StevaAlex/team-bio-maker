const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
let getDetails = (employeeType) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the employee's name?`,
                name: 'name'
            },
            {
                type: `input`,
                message: `What is the employee's id?`,
                name: `idNum`
            },
            {
                type: `input`,
                message: `What is the employee's email?`,
                name: `email`
            }
        ]).then((answers) => {
            let name = answers.name;
            let idNum = answers.idNum;
            let email = answers.email;
            console.log(`name: ${name}`);
            console.log(`id number: ${idNum}`);
            console.log(`email: ${email}`);
        });
    if (employeeType === 'Manager' || 'manager') {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the office number?`,
                    name: 'officeNum'
                }
            ]).then((answers) => {
                let officeNum = answers.officeNum;
                console.log(`office number: ${officeNum}`);
            });
    }
    else if (employeeType === 'Intern' || 'intern') {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the Intern's school name?`,
                    name: 'school'
                }
            ]).then((answers) => {
                let school = answers.school;
                console.log(`school name: ${school}`);
            });
    }
    else if (employeeType === 'Engineer' || 'engineer') {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the enginee's GitHub?`,
                    name: 'github'
                }
            ]).then((answers) => {
                let github = answers.github;
                console.log(`github: ${github}`);
            });
    }
    else {
        return;
    }

}
getDetails(); 