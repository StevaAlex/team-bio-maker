const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { async } = require("rxjs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./src/page-template.js"); //figure out what this does next!



// TODO: Write Code to gather information about the development team members, and render the HTML file.

//empty arrays: use push function to push an array everytime the code is ran
 let internArr = []; 
 let engineerArr = [];
//create functions with prompts for all employees
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
            let interns = { 
                name: answers.intName, 
                idNum: answers.intIdNum, 
                email: answers.intEmail,
                school: answers.school
            }
            //everytime the getIntern function is ran, the interns object is pushed to the array and stored as a new item array!
            internArr.push(interns);
            console.log(JSON.stringify(internArr));
            getTeam();
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
            console.log(`using function: ${engineer.name}, ${engineer.idNum}, ${engineer.email}`);
            getTeam();//adding this here allows you to restart the questions once the then part has run!
        });
}

let getManager = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the Manager's name?`,
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
            console.log(`using function: ${manager.name}, ${manager.idNum}, ${manager.email}`); 
            getTeam();
        })
}

let startQue = [
    {
        type: `checkbox`,
        message: `Who would you like to add to the team?`, //maybe add some nice design here if needed
        name: `teamMember`,
        choices: ['Engineer', 'Intern', 'Manager', "Finish building team"]
    }]

//now, based on user selection, one function will run, and since getTeam() was added to each employee function, it will keep looping: 
//which team member? => prompts for team member => then back to what team member until the user selects finish building
let getTeam = () => {
    inquirer
        .prompt(startQue)
        .then((answers) => {
            let selection = (JSON.stringify(answers.teamMember)).replace(/[\[\]"]/g, ""); //the g is important! 
            //extra brackets and quotes removed
            //function that is ran is based on user input
            console.log(selection);
            if (selection === 'Manager') {
                getManager();
            }

            else if (selection === 'Engineer') {
                getEngineer();

            }
            else if (selection === 'Intern') {
                getIntern();
            }
            else if (selection === "Finish building team") {
                console.log("No more members to add")

            }


        });
}
getTeam(); 
//next steps: 
//how to save each input? possible create an object and push results to that object 
//add a push each if statement except last one 
//on last if statement, render the code to the html page?