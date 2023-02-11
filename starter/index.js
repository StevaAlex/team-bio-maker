const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { async } = require("rxjs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js"); 



// TODO: Write Code to gather information about the development team members, and render the HTML file.

//empty array: use push function to push an array everytime the code is ran
 let teamArr = [];
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
            let intern = new Intern (name, idNum, email, school);
            //everytime the getIntern function is ran, the interns object is pushed to the array and stored as a new item array!
            teamArr.push(intern);
            console.log(JSON.stringify(teamArr));
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
            let engineer = new Engineer (name,idNum, email, github);
            teamArr.push(engineer); 
            console.log(JSON.stringify(teamArr));
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
            let officeNum = answers.officeNum;
            let manager = new Manager(name, idNum,  email, officeNum)
            teamArr.push(manager); //saves managerDeets in an array!
            console.log(JSON.stringify(teamArr));
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
                console.log("No more members to add"); 
                let html = render(teamArr); //render function goes through temArr and matches the employee type, then runs the corresponding function
                fs.writeFile(outputPath, html, (err) => { //if team member is a manager, it runs generateManager etc
                    if (err) { 
                        console.log(err);
                    } 
                    console.log(`file written to ${outputPath}`);
                }) //once its gone through the array, a HTML file generated from the generateteam function(in page-template) is created in a directory called 'output'
            }


        });
}
getTeam(); 
//next steps: 
//figure out what render does and what the issue is