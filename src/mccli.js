#!/usr/bin/env node

const pluginStarterRepo = "https://github.com/kissmybutton/motorcortex-plugin-starter";
const Git = require("nodegit");
const { program } = require("@caporal/core");
const rimraf = require("rimraf");
const { exec } = require("child_process");
const process = require('process');

const ora = require('ora');

const cloneOptions = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function () { return 0; }
        }
    }
}
program
    // new plugin
    .command('newplugin')
    .argument("<name>", "Name of your plugin")
    .action(({ logger, args, options }) => {
        logger.info('Cloning starter repo');
        Git.Clone(pluginStarterRepo, args.name, cloneOptions).then(function (repository) {
            // remove git files
            if (process.platform === "win32") {
                rimraf(`.\\${args.name}\\.git`, () => { });
                rimraf(`.\\${args.name}\\.github`, () => { });
            } else {
                rimraf(`./${args.name}/.git`, () => { });
                rimraf(`./${args.name}/.github`, () => { });
            }
            const throbber = ora('Installing dependencies. This will take a while').start();
            exec(`npm --prefix ${args.name} install ${args.name}`, (error, stdout, stderr) => {
                if (error) {
                    throbber.stop();
                    logger.error(error.message);
                    return;
                }
                if (stderr) {
                    //   logger.warn(stderr);
                }
                throbber.stop();
                logger.info(`Your new plugin workspace is ready on folder "${args.name}". Have fun!!!`);
            });
        });
    })

    // new clip
    .command('newclip')
    .argument("<name>", "Name of your project")
    .option('--with <plugins>', "Select plugins")
    .action(({ logger, args, options }) => {
        logger.info("%s, %s!", options.with, args.name);
    }
  )

program.run();