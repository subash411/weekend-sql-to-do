# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

Created a simple To-Do-list, where you can add, delete or update your list.
Everytime you click on update it changes it's color to green that way you know the task has been completed.
Applied gif on background, changed the font family, sourced it from google font.

Was also getting error in the very beginning on the terminal, kept getting error saying module not found.
went to package.json and added the line start line to fix it.
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "start": "nodemon server/server.js"

