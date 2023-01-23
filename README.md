# Donkeyclip CLI

## Purpose

Donkeyclip CLI is a command line interface that creates a new donkeyclip project and installs all the required dependencies for you. It does so by creating a clear, local clone of the **[Motorcortex Clip Starter](https://github.com/donkeyclip/motorcortex-clip-starter)** boilerplate repository.

## Usage

- `npm create donkeyclip <name>` will create a new folder with the provided name. Using the `--js` option you can create a clip template that uses JavaScript as base, otherwise TypeScript will be used by default. Simply run `npm run start` in your local project's folder and have fun coding with [code.dokeyclip.com](https://code.donkeyclip.com).
- if you want to use `npx` instead you should use `npx create-donkeyclip <name>`

## Good to know

### How to connect the local donkeyclip project with a GitHub repo?

The created donkeyclip project is not connected to any GitHub repository by default. In order to connect your project with a GitHub repo you need to follow these steps:

1. Create a new GitHub repo
2. Browse in the project's folder through the terminal and run these commands:

```bash
git init
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:<username>/<repository-name>.git
git push -u origin main
```

### How does donkeyclip know which clip I am editing and how can I update the same clip from another device?

Donkeyclip CLI creates a unique id each time you run the `npm create donkeyclip` command. This ID is a unique identifier and will be used in combination with your donkeyclip userID to create an online version of your donkeyclip. This unique ID lies in the `demo/id.js` file of your project. If you want to edit the same clip from another device the ids must match otherwise a new clip will be created instead. Here lies the need for a Github repo that includes the id.js file.

### Can other users contribute to my clip?

Yes and No. No other user can directly update your clip. As mentioned in the previous question, donkeyclip identifies a clip combining the demo/id.js file and the userID. Thus, when another user clones your repository, including the demo/id.js, and tries to publish, the combination userID-id.js differs from yours. If you want others to contribute to your donkey clip you are the one that must publish the clip through donkeyclip.

## License

[MIT License](https://opensource.org/licenses/MIT)

[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)
