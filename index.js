#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");
const { questions } = require("./utils/questions");

const error = chalk.bold.red;
const success = chalk.bold.green;
const info = chalk.blue;

const currentDir = process.cwd();
const tempDir = path.join(currentDir, ".__EXPRESS_TEMP__");

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    const {
      "project-name": projectName,
      prefer,
      "separate-folder": separateFolder,
    } = answers;
    const template = `https://github.com/amjadcp/express-api-template-${prefer}`;

    // Validate target directory
    const projectPath =
      separateFolder === "Y" ? path.join(currentDir, projectName) : currentDir;

    if (separateFolder === "Y") {
      if (fs.existsSync(projectPath)) {
        throw new Error(`Directory "${projectName}" already exists!`);
      }
      fs.mkdirSync(projectPath);
    }

    // Clone template
    console.log(info("🚀 Downloading template..."));
    execSync(`git clone ${template} ${tempDir}`, { stdio: "ignore" });

    // Remove template's .git history
    fse.removeSync(path.join(tempDir, ".git"));

    // Copy contents instead of moving directory
    console.log(info("📦 Copying files..."));
    fse.copySync(tempDir, projectPath);

    // Update package.json
    const packagePath = path.join(projectPath, "package.json");
    const packageJson = fse.readJsonSync(packagePath);
    packageJson.name = projectName;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

    // Success message
    console.log(success(`\n✅ Project "${projectName}" successfully created!`));
    console.log(info("\nNext steps:"));
    if (separateFolder === "Y") console.log(`cd ${projectName}`);
    console.log("npm install");
    console.log("npm run dev (for development)");
    console.log("npm start (for production)\n");
  } catch (err) {
    console.error(error("\n❌ Error:"), err.message);
    process.exitCode = 1;
  } finally {
    // Cleanup temporary files
    if (fse.existsSync(tempDir)) {
      fse.removeSync(tempDir);
    }
  }
}

main();
