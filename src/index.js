#!/usr/bin/env node
// #!/usr/bin/env node
// const yargs = require("yargs");
const utils = require("./utils.js");

// const command = yargs.argv._[0];
// const projectName = yargs.argv._[1];

// if (!utils.checkCommand(command)) return utils.showHelp();
// if (!utils.checkName(projectName)) return utils.showHelp();
// utils.cloneGitRepo(command, projectName);

const { Command } = require("commander");
const program = new Command();

program
  .name("donkeyclip-cli")
  .description("CLI tool to create to make your life easier with DonkeyClip")
  .version("1.0.0");

program
  .command("create-clip")
  .description(
    "Create a new donkeyclip project using the motorcortex-clip-starter repo"
  )
  .argument("<project-name>", "The name of your project")
  .option("--ts", "use typescript for your project")
  .action((projectName, options) => {
    utils
      .cloneGitRepo("create-clip", projectName, options)
      .then(() => {
        return true;
      })
      .catch(console.error);
  });

program.parse();
