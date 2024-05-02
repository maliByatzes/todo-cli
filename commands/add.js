import inquirer from 'inquirer';
import colors from 'colors';
import jsonfile from 'jsonfile';
import { required } from '../utils/validation.js';

const fileName = './todo.json';

function writeToFile(todoname) {
  // read the file first to see of it exists
  jsonfile.readFile(fileName, function (err, contents) {
    if (err && err.code === 'ENOENT') {
      const obj = [ { id: 1, todo: todoname } ];
      jsonfile.writeFile(fileName, obj, function (err) {
        console.error(err);
      });
      console.log('Todo added successfully'.green);
      return;
    } else if (err) {
      console.error(err);
      return;
    };

    let lastTodoID = 0;
    for (const item of contents) {
      if (contents.indexOf(item) === contents.length - 1) {
        lastTodoID = item.id;
      }
    }

    const obj = { id: lastTodoID+1, todo: todoname };
    contents.push(obj);
    jsonfile.writeFile(fileName, contents, function(err) {
      console.error(err);
    });
    console.log('Todo added successfully'.green);
  });
  return;
}

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
      writeToFile(answers.todoname);
    })
    .catch((err) => {
      console.error(err);
    });
}

