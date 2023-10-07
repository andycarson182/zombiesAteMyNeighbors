# Aviasales Tool front-end-test-suite

This is the test project for the front end of Aviasales.

## Installation & running the project

_Prerequisite: You'll need to install NPM and node.js on your machine to install and run this project. For help on this please go to https://www.npmjs.com/get-npm_

1. Clone this project to your local machine.
2. Open a terminal and navigate to the root of the project. Once there, run the command `npm install` and wait for all of the dependencies to download and install.
3. Get started by installing Playwright using`npm init playwright@latest`.
4. Sill on the root of the project, and run the command `npx playwright test --ui`. This will open Playwright in GUI mode. If it is the first time that you open Playwright, there are some setup actions that will take place, so the first time will always take longer.
5. Once you have the Playwright GUI window open, you can start to run all tests by clicking the play button that is on the top left of the window.
![Screen Shot 2023-10-06 at 4 42 02 PM](https://github.com/AndresP-XUP/zombiesAteMyNeighbors/assets/69915594/f691eb00-21b0-4848-9a32-d5da1bfad652)


Alternatively, You can run a single test, a set of tests, or all tests. Tests can be run on one browser or multiple browsers. By default, tests are run in a headless manner meaning no browser window will be opened while running the tests and results will be seen in the terminal.: `npx playwright test specFileName.spec.js` or `npx playwright test tests/todo-page/ tests/folderName/`

![215373](https://github.com/AndresP-XUP/zombiesAteMyNeighbors/assets/69915594/99bb7636-9fe6-411f-961f-b370bfc34ade)
