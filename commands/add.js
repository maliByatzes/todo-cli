import inquirer from 'inquirer';
import colors from 'colors';
import jsonfile from 'jsonfile';
import { required } from '../utils/validation.js';

const fileName = './todo.json';

async function writeToFile(todoName) {
  try {
    // Read the file to check existence and get last ID
    let contents = await jsonfile.readFile(fileName);
    let lastTodoID = 0;

    if (contents.length) {
      lastTodoID = contents[contents.length - 1].id;
    }

    // Create new todo object with incremented ID
    const newTodo = { id: lastTodoID + 1, todo: todoName };

    // Update contents and write to file
    contents.push(newTodo);
    await jsonfile.writeFile(fileName, contents);
    console.log('Todo added successfully'.green);
  } catch (err) {
    // Handle potential errors during read/write
    console.error(err);

    // Handle ENOENT error (file doesn't exist) by creating it with the new todo
    if (err.code === 'ENOENT') {
      await jsonfile.writeFile(fileName, [newTodo]);
      console.log('Todo added successfully (new file created)'.green);
    }
  }
}

export async function addTodo() {
  try {
    // Get user input for todo name
    const { todoName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'todoName',
        message: 'Enter a todo'.green,
        validate: required,
      },
    ]);

    // Write the todo to the file
    await writeToFile(todoName);
  } catch (err) {
    console.error(err);
  }
}

