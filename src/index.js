#!/usr/bin/env node
// #!/usr/bin/env node
const utils = require("./utils.js");

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
  .option("--js", "use javascript for your project")
  .action((projectName, options) => {
    utils
      .cloneGitRepo("create-clip", projectName, options)
      .then(() => {
        return true;
      })
      .catch(console.error);
  });

program.parse();
