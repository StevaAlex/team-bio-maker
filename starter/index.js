const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { async } = require("rxjs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./src/page-template.js");



// TODO: Write Code to gather information about the development team members, and render the HTML file.



let getIntern = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the Intern's name?`,
                name: 'intName'
            },
            {
                type: `number`,
                message: `What is the Intern's id?`,
                name: `intIdNum`
            },
            {
                type: `input`,
                message: `What is the Intern's email?`,
                name: `intEmail`
            },
            {
                type: 'input',
                message: `What is the Intern's school name?`,
                name: 'school'
            }
        ]).then((answers) => {
            let name = answers.intName;
            let idNum = answers.intIdNum;
            let email = answers.intEmail;
            let school = answers.school;
            const intern = new Intern(name, idNum, email, school);//save prompt results in function
            console.log(`name: ${name}`);
            console.log(`id number: ${idNum}`);
            console.log(`email: ${email}`);
            console.log(`school name: ${school}`);
            console.log(`using function: ${intern.name}, ${intern.idNum}, ${intern.email}, ${intern.school}`);
        });
}
let getEngineer = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the Engineer's name?`,
                name: 'name'
            },
            {
                type: `number`,
                message: `What is the Engineer's id?`,
                name: `idNum`
            },
            {
                type: `input`,
                message: `What is the Engineer's email?`,
                name: `email`
            },
            {
                type: 'input',
                message: `What is the Engineer's GitHub?`,
                name: 'github'
            }
        ]).then((answers) => {
            let name = answers.name;
            let idNum = answers.idNum;
            let email = answers.email;
            let github = answers.github;
            const engineer = new Engineer(name, idNum, email, github);//save prompt results in function
            console.log(`name: ${name}`);
            console.log(`id number: ${idNum}`);
            console.log(`email: ${email}`);
            console.log(`github: ${github}`);
            console.log(`using function: ${engineer.name}, ${engineer.idNum}, ${engineer.email}`)
        });
}

let getMoreMembers = () => { 
    inquirer 
    .prompt([ 
        {
            type: `checkbox`,
            message: `Who would you like to add to the team?`,
            name: `teamMember`,
            choices: [ 'Engineer', 'Intern', "Finish building team"]
        },
    ]) 
    .then ((selection) => { 

    })
}

let getTeam = () => {
    inquirer
        .prompt([ 
            //ask for manager first
            {
                type: 'input',
                message: `Let's get started
                What is the Manager's name?`,
                name: 'manName'
            },
            {
                type: `number`,
                message: `What is the Manager's id?`,
                name: `manIdNum`
            },
            {
                type: `input`,
                message: `What is the Manager's email?`,
                name: `manEmail`
            },
            {
                type: 'number',
                message: `What is the office number?`,
                name: 'officeNum'
            },
            {
                type: `checkbox`,
                message: `Who would you like to add to the team?`,
                name: `teamMember`,
                choices: [ 'Engineer', 'Intern', "Finish building team"]
            },
        ])
        .then((answers) => { 
            let name = answers.manName;
            let idNum = answers.manIdNum;
            let email = answers.manEmail;
            const manager = new Manager(name, idNum, email); //save prompt results in function
            console.log(`name: ${name}`);
            console.log(`id number: ${idNum}`);
            console.log(`email: ${email}`);
            let officeNum = answers.officeNum;
            console.log(`office number: ${officeNum}`);
            console.log(`using function: ${manager.name}, ${manager.idNum}, ${manager.email}`)
            let selection = (JSON.stringify(answers.teamMember)).replace(/[\[\]"]/g, ""); //the g is important! 
            //extra brackets and quotes removed
            console.log(selection); 

             if (selection === 'Engineer') {
                getEngineer(); 

            }
            else if (selection === 'Intern') {
                getIntern();
            }
            else {
                console.log("No more members to add")
            }
        });
}
getTeam();