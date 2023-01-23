#!/usr/bin/env node
// #!/usr/bin/env node
const utils = require("./utils.js");
const { program } = require("commander");
const { version } = require("../package.json");
program
  .version(version)
  .description(
    "Create a new donkeyclip project using the motorcortex-clip-starter repo"
  )
  .argument("<project-name>", "The name of your project")
  .option(
    "--js",
    "use JavaScript as base for your project, the default is TypeScript"
  )
  .action((projectName, options) => {
    utils
      .cloneGitRepo("create-clip", projectName, options)
      .then(() => {
        return true;
      })
      .catch(console.error);
  });
if (process.argv.length < 3) {
  program.help();
}
program.parse();
