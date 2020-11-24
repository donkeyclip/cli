#!/usr/bin/env node

const pluginStarterRepo = "https://github.com/kissmybutton/motorcortex-plugin-starter";
import Git from "nodegit";
const {program} = require("@caporal/core");
program
  .command('newPlugin')
  .argument("<name>", "Name of your plugin")
  .action(({ logger, args, options }) => {
    Git.Clone(pluginStarterRepo, "motorcortex-plugin-starter").then(function(repository) {
        
    });
  })

program.run();