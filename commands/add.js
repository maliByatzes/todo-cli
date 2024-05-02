import inquirer from 'inquirer';
import colors from 'colors';
import { required } from '../utils/validation.js';

export function addTodo() {
  // go to interactive mode for user input
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'todoname',
        message: 'Enter a todo'.green,
        validate: required,
      }
    ])
    .then((answers) => {
      console.log(answers.todoname.cyan);
    })
    .catch((err) => {
      console.error(err);
    });
  // save the todo to a json file with other todos
}

