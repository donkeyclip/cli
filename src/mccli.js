#!/usr/bin/env node

const pluginStarterRepo = "https://github.com/kissmybutton/motorcortex-plugin-starter";
const Git = require("nodegit");
const {program} = require("@caporal/core");
const rimraf = require("rimraf"); 
const { exec } = require("child_process");

const cloneOptions = {
  fetchOpts: {
    callbacks: {
      certificateCheck: function() { return 0; }
    }
  }
}
program
  .command('newplugin')
  .argument("<name>", "Name of your plugin")
  .action(({ logger, args, options }) => {
    Git.Clone(pluginStarterRepo, args.name, cloneOptions).then(function(repository) {
      // remove git files
      if(process.platform === "win32"){
        rimraf(`.\\${args.name}\\.git`, ()=>{});
        rimraf(`.\\${args.name}\\.github`, ()=>{});
      } else {
        rimraf(`./${args.name}/.git`, ()=>{});
        rimraf(`./${args.name}/.github`, ()=>{});
      }
      exec(`npm --prefix ${args.name} install ${args.name}`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: New plugin folder ready, node modules are installed`);
      });
    });
  })

program.run();