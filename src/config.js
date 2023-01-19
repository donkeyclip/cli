const USAGE = `
Usage: donkeyclip <command> <project-name>

Available commands:
 - create-clip`;

const MESSAGES = {
  clone: "Cloning starter repo",
  install: "Installing dependencies. This will take a while",
  finish: (projectName) =>
    `Your project workspace is ready on folder "${projectName}". Be creative and have fun!`,
  folderExists: (projectName) => `Folder "${projectName}" already exists`,
  unexpectedError: "Unexpected error!",
  javascript: "No TypeScript? Working on creating JS files...",
  id: "Adding a unique id to your project...",
};

const STARTER_REPO = {
  "create-clip": "https://github.com/donkeyclip/motorcortex-clip-starter",
};

module.exports = {
  USAGE,
  STARTER_REPO,
  MESSAGES,
};
