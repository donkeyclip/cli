const USAGE = `
Usage: donkeyclip <command> <project-name>

Available commands:
 - newplugin
 - newclip`;

 const MESSAGES = {
    clone:"Cloning starter repo",
    install:'Installing dependencies. This will take a while',
    finish:(projectName)=>`Your project workspace is ready on folder "${projectName}". Be creative and have fun!`,
    folderExists: (projectName) => `Folder "${projectName}" already exists`,
    unexpectedError: "Unexpected error!"
};

const CLONE_OPTIONS = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function () { return 0; }
        }
    }
}
const STARTER_REPO = {
    newplugin:"https://github.com/donkeyclip/motorcortex-plugin-starter",
    newclip:"https://github.com/donkeyclip/motorcortex-clip-starter"
};

module.exports = {
    USAGE, 
    CLONE_OPTIONS,
    STARTER_REPO,
    MESSAGES
}