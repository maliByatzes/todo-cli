import jsonfile from 'jsonfile';

const fileName = './todo.json';

export async function listTodos(options) {
  const id = options.id ? options.id : 0;

  try {
    const contents = await jsonfile.readFile(fileName);
    if (id !== 0) {
      const todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        console.log(`ID: ${todo.id}, todo: ${todo.todo}`.blue.bold);
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
        return;
      }
    } else {
      if (contents.length === 0) {
        console.log('No todos to display'.green);
        return;
      }
      for (const item of contents) {
        console.log(`${item.id} => ${item.todo}`.blue.bold);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
