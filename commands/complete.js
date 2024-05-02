import jsonfile from "jsonfile";

const fileName = './todo.json';

export async function completeTodo(options) {
  const id = options.id || 0;

  try {
    const contents = await jsonfile.readFile(fileName);
    if (id !== 0) {
      const todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        todo.is_completed = true;
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
        return;
      }
      await jsonfile.writeFile(fileName, contents);
      console.log(`Todo with id ${id} is marked as completed`.green);
    } else {
      console.error('Invalid id'.red);
      return;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No todos to mark as complete'.green);
      console.log('Try creating some todos with `add` command'.green);
    } else {
      console.error(err);
    }
  }
}
