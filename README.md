# Getting Started with the Movies && TV Series App

This App displays a list of movies and TV series.
You can also search by name a movie or a TV serie you are interested in.
By clicking on an image or a name of a movie or TV serie, you can access to more details.

## Start the project

First run the `npm install` command to install the packages
Note: You’ll need to have Node >= 14 on your local development machine.

Then run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Test the project

Run `npm test`

Launches the test runner in the interactive watch mode.\

### Build the project

Run`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### How to use the linter

The command`npm run lint` runs the linter that is configured with the .eslintrc
You can modify the rules in the .eslintrc if you wish.

Currently, the rules are : no console.log and no unused imports.
If you want to remove all unused imports, run : npx eslint <project-directory> --fix

### Note

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.
