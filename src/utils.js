const Git = require("isomorphic-git");
const { MESSAGES, STARTER_REPO } = require("./config");
const fs = require("fs");
const process = require("process");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const rimraf = util.promisify(require("rimraf"));
const copyfiles = util.promisify(require("copyfiles"));

const ora = require("ora");
const { v4: uuidv4 } = require("uuid");
const http = require("isomorphic-git/http/node");
const path = require("path");

async function cloneGitRepo(commandName, projectName, options) {
  let throbber = ora("Initializing...").start();
  try {
    const execOpts = {
      cwd: projectName,
    };
    //check if folder name exists
    if (fs.existsSync(projectName)) {
      throbber.stop();
      console.error(MESSAGES.folderExists(projectName));
      return;
    }
    throbber.stop();

    //CLONE THE REPO
    throbber = ora(MESSAGES.clone).start();
    const dir = path.join(process.cwd(), projectName);
    await Git.clone({
      fs,
      http,
      dir,
      url: STARTER_REPO[commandName],
    });
    throbber.stop();

    //CLEAN GITHUB FOLDERS
    throbber = ora("Cleaning things up..").start();
    const gitFile = path.join(projectName, ".git");
    const githubFile = path.join(projectName, ".github");

    await rimraf(gitFile);
    await rimraf(githubFile);
    throbber.stop();

    //INSTALL DEPENDECIES
    throbber = ora(MESSAGES.install).start();
    let command = "npm i";
    if (options.js) command = `npm i && npx tsc`;
    await exec(command, execOpts);
    throbber.stop();

    //ADD JS FILES IF NOT TS
    if (options.js) {
      throbber = ora(MESSAGES.javascript).start();

      const clipDest = path.join(projectName, "clip");
      const clipFrom = path.join(projectName, "dist", "clip", "**", "*");
      await copyfiles([clipFrom, clipDest], { up: 3 });

      const serverDest = path.join(projectName, "server");
      const serverFrom = path.join(projectName, "dist", "server", "**", "*");
      await copyfiles([serverFrom, serverDest], { up: 3 });

      const distPath = path.join(projectName, "dist");
      const tsconfig = path.join(projectName, "tsconfig.json");
      await rimraf(distPath);
      await rimraf(tsconfig);
      await rimraf(path.join("**", "*.ts"));
      await exec("npm run lint:fix", execOpts);
      throbber.stop();
    }

    throbber = ora(MESSAGES.id).start();
    const idjsContent = `export default "${uuidv4()}";`;
    fs.writeFile(
      path.join(projectName, "server", "id.js"),
      idjsContent,
      (err) => {
        throbber.stop();
        if (err) return console.error(err);
        console.info(MESSAGES.finish(projectName));
      }
    );
  } catch (err) {
    throbber.stop();
    await rimraf(projectName);
    throw err;
  }

  return true;
}

module.exports = {
  cloneGitRepo,
};
