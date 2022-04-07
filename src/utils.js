const Git = require("isomorphic-git");
const { USAGE, MESSAGES, STARTER_REPO } = require("./config");
const fs = require("fs");
const rimraf = require("rimraf");
const process = require("process");
const { exec } = require("child_process");
const ora = require("ora");
const { v4: uuidv4 } = require("uuid");
const http = require("isomorphic-git/http/node");
const path = require("path");

function checkCommand(command) {
  return ["newplugin", "newclip"].includes(command);
}

function checkName(name) {
  return !!name;
}

function showHelp() {
  console.log(USAGE);
}

function cloneGitRepo(command, projectName) {
  console.log(MESSAGES.clone);
  try {
    if (fs.existsSync(projectName)) {
      console.log(MESSAGES.folderExists(projectName));
      return;
    }
  } catch (e) {
    console.log(MESSAGES.unexpectedError, e);
  }
  const dir = path.join(process.cwd(), projectName);
  Git.clone({
    fs,
    http,
    dir,
    url: STARTER_REPO[command],
  })
    .then(function () {
      // remove git files
      if (process.platform === "win32") {
        rimraf(`.\\${projectName}\\.git`, () => console.log("Almost ready.."));
        rimraf(`.\\${projectName}\\.github`, () =>
          console.log("Cleaning things up..")
        );
      } else {
        rimraf(`./${projectName}/.git`, () => console.log("Almost ready.."));
        rimraf(`./${projectName}/.github`, () =>
          console.log("Cleaning things up..")
        );
      }
      const throbber = ora(MESSAGES.install).start();
      exec(`npm install`, { cwd: projectName }, (error, stdout, stderr) => {
        if (error) {
          throbber.stop();
          console.error(error.message);
          return;
        }
        if (stderr) {
          console.error(stderr);
        }

        throbber.stop();
        const idjsContent = `export default "${uuidv4()}";`;
        fs.writeFile(`${projectName}/server/id.js`, idjsContent, (err) => {
          if (err) return console.error(err);
          console.log(MESSAGES.finish(projectName));
        });
      });
      return true;
    })
    .catch(console.error);
}

module.exports = {
  checkCommand,
  checkName,
  showHelp,
  cloneGitRepo,
};
