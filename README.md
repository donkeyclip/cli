# donkeyclip cli

## Purpose
Donkeyclip CLI is a comandline interface which creates a new donkeyclip project and installs all the required dependencies for you. It does so by creating a clear, local clone of the **[Motorcortex Clip Starter](https://github.com/donkeyclip/motorcortex-clip-starter)** boilerplate repository.

## Usage
- `npx donkeyclip newclip <name>` will create a new folder with the provided name. Simply run `npm run start` in the your local project's folder and have fun coding with code.dokeyclip.com. 

## Good to know
### How to connect the local donkeyclip project with a github repo?
The created donkeyclip project is not connected to any github repository by default. In order to connect your project with a github repo you need to follow these steps:
1. Create a new github repo
2. Browse in the project's folder through then terminal and run these commands: 
```bash
git init
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:<username>/<repository-name>.git
git push -u origin main
```

### How does donkeyclip know which clip i am editing and how can I update the same clip from another device?
Donkeyclip CLI creates a unique id each time you run the `npx donkeyclip newclip` command. This ID is a unique idetifier and will be used in combination with your donkeyclip userID to create an online version of your donkeyclip. This unique ID lies in the `demo/id.js` file of your project. If you want to edit the same clip from another device the ids must much otherwise a new clip will be created instead. Here lies the need of a Github repo that includes the id.js file.

### Can other users contribute to my clip?
Yes and No. No other user can directly update your clip. As mentioned in the previous question donkeyclip identifies a clip combining the demo/id.js file and the userID. Thus, when another user clones your repository, including the demo/id.js, and tries to publish the combination userID-id.js differs from yours. If you want others to contribute to your donkey clip you are the one that must publish the clip through donkeyclip. 

## License
[MIT License](https://opensource.org/licenses/MIT)

[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)
