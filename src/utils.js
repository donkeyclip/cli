
const Git = require("nodegit");
const {USAGE,MESSAGES,STARTER_REPO,CLONE_OPTIONS} = require("./config");
const fs = require("fs")
const rimraf = require("rimraf");
const process = require('process');
const { exec } = require("child_process");
const ora = require('ora');
const {v4: uuidv4} = require("uuid")

function checkCommand(command) {
    return ["newplugin","newclip"].includes(command)
}

function checkName(name) {
    return !!name
}

function showHelp(){
    console.log(USAGE)
}

function cloneGitRepo(command, projectName) {
    console.log(MESSAGES.clone);
    try {
        if (fs.existsSync(projectName)) {
          console.log(MESSAGES.folderExists(projectName))
          return;
        }
      } catch(e) {
        console.log(MESSAGES.unexpectedError,e)
      }
    Git.Clone(STARTER_REPO[command], projectName, CLONE_OPTIONS).then(function (repository) {
        // remove git files
        if (process.platform === "win32") {
            rimraf(`.\\${projectName}\\.git`, () => { });
            rimraf(`.\\${projectName}\\.github`, () => { });
        } else {
            rimraf(`./${projectName}/.git`, () => { });
            rimraf(`./${projectName}/.github`, () => { });
        }
        const throbber = ora(MESSAGES.install).start();
        exec(`npm install`, {cwd: projectName}, (error, stdout, stderr) => {
            if (error) {
                throbber.stop();
                console.error(error.message);
                return;
            }
            if (stderr) {
                //   console.warn(stderr);
            }
            
            throbber.stop();
            const idjsContent = `export default "${uuidv4()}";`
            fs.writeFile(`${projectName}/clip/id.js`, idjsContent, err => {
                if (err) {
                  console.error(err)
                  return
                }
                console.log(MESSAGES.finish(projectName));
              })
        });
    });
}
module.exports = {
    checkCommand,
    checkName,
    showHelp,
    cloneGitRepo
}