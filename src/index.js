#! /usr/bin/env node
const yargs = require("yargs");

const {
    PLUGIN_STARTER_REPO,
    CLIP_STARTER_REPO,
    USAGE,
    CLONE_OPTIONS 
} = require("./config");
const utils = require('./utils.js')

const options = yargs.usage(utils.USAGE).argv;
const command = yargs.argv._[0]
const projectName = yargs.argv._[1];

if(!utils.checkCommand(command)) return utils.showHelp()
if(!utils.checkName(projectName)) return utils.showHelp()
utils.cloneGitRepo(command, projectName);
