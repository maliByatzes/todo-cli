import jsonfile from 'jsonfile';

const fileName = './todo.json';

export async function listTodos(options) {
  const id = options.id ? options.id : 0;

  try {
    const contents = await jsonfile.readFile(fileName);
    if (id !== 0) {
      const todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        console.log(`${todo.id} => ${todo.todo}`.blue.bold + (todo.is_completed ? '\t✅' : '\t❎'));
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
        return;
      }
    } else {
      if (contents.length === 0) {
        console.log('No todos to display'.green);
        console.log('Try create creating some with `todo add` command'.green);
        return;
      }
      for (const item of contents) {
        console.log(`${item.id} => ${item.todo}`.blue.bold + (item.is_completed ? '\t✅' : '\t❎'));
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No todos to display'.green);
      console.log('Try create creating some with `todo add` command'.green);
    } else {
      console.error(err);
    }
  }
}
