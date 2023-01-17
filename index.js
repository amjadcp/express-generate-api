#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const currentDir = process.cwd();
const chalk = require('chalk');
const { questions } = require('./utils/questions');

inquirer.prompt(questions).then((answers) => {
  const projectName = answers['project-name'];
  const separateFolder = answers['separate-folder']

  const template = `${__dirname}/template/`;

  if(separateFolder==='Y'){
    fs.mkdirSync(`${currentDir}/${projectName}`);
    fse.copySync(template, projectName);
  }
  else fse.copySync(template, '.');

  let projectPath = currentDir;
  if(separateFolder==='Y') projectPath = path.join(currentDir, projectName);
  
  let packageJson = path.join(projectPath, 'package.json');
  let packageObj = fse.readJsonSync(packageJson);
  packageObj.name = projectName;
  fs.writeFileSync(packageJson, JSON.stringify(packageObj));

  console.log(chalk.green(`${projectName} successfully created`))
  if(separateFolder==='Y') console.log(chalk.green(`cd ${projectName}`));
  console.log(chalk.green(`npm install`));
  console.log(chalk.green(`npm run dev (development)`));
  console.log(chalk.green(`npm start (production)`));
});