#!/usr/bin/env node
const yargs = require("yargs");

const utils = require("./utils.js");

const command = yargs.argv._[0];
const projectName = yargs.argv._[1];

if (!utils.checkCommand(command)) return utils.showHelp();
if (!utils.checkName(projectName)) return utils.showHelp();
utils.cloneGitRepo(command, projectName);
