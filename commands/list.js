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
      }
    } else {
      for (const item of contents) {
        console.log(`ID: ${item.id}, todo: ${item.todo}`.blue.bold);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
