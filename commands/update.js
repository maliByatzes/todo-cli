import inquirer from "inquirer";
import jsonfile from 'jsonfile';
import { required } from "../utils/validation.js";

const fileName = './todo.json';

export async function updateTodo(options) {
  const id = options.id || 0;

  try {
    const contents = await jsonfile.readFile(fileName);
    if (id !== 0) {
      const todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        const { newtodo } = await inquirer.prompt([
          { type: 'input', name: 'newtodo', message: 'Enter todo'.green, validate: required }
        ]);
        todo.todo = newtodo;
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
        return;
      }
      await jsonfile.writeFile(fileName, contents);
      console.log(`Todo with id ${id} is updated successfully`.green);
    }
  } catch (err) {
    console.error(err);
  }
}
