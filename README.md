# Diluv: Front End Website
This repository hosts the files used to create the front end website for the platform. Everything the end user sees when visiting our website is based on this code.

## Issues and Features
If you have an issue or feature suggestion, please create a [new issue](https://github.com/Diluv/Website/issues/new) on our GitHub repository. Issues will always be looked into and should get a quick acknowledgement or response. Feature requests will also be looked at, however we make no promises that they will be implemented. 

If you would like to contribute to the development of this project and have a specific change in mind, please contact the developers on [Discord](https://discord.gg/cmdFSbW) to discuss your changes first. We want to have as many usable contributions from the community as possible, and touching base with us will hopefully limit the number of rejected pull requests. 

## Setting Up
Setting up a dev environment for the website is fairly simple. The following steps will show you how to setup a local dev environment for the website.

1. Download [NodeJS 8](https://nodejs.org/en/download/) or newer.
2. Clone the repository with Git. 
3. Open a command prompt or terminal inside the cloned repo folder.
4. Run `npm install` and wait for the deps to install.
5. Run `npm start` and wait for everything to initialize. 
6. If the site launched correctly, you should be able to visit it at `http://localhost:3000`.

Once installed, you may run into issues accessing certain pages. The default configuration for this app is set to connect to the public API which is not live at this time. You can edit the `env.development` file to reconfigure the site to use a custom API. You can set up your own version of the API using [this](https://github.com/Diluv/API) project. There is also a private API that is used by the core team for development. Access to the private API may be given to trusted contributers at our discretion. 

**Note:** A docker installation of this project is in the works. This installation should be able to set both the front end and back end stuff up for you automatically. There is no ETA on the docker image. 
