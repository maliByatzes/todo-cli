import jsonfile from 'jsonfile';

const fileName = './todo.json';

export async function removeTodo(options) {
  const id = options.id || 0;

  try {
    const contents = await jsonfile.readFile(fileName);

    if (id !== 0) {
      const todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        const filteredContents = contents.filter(todo => todo.id.toString() !== id);
        await jsonfile.writeFile(fileName, filteredContents);
        console.log(`Todo with id ${id} is removed successfully`.green);
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No todos to remove'.green);
      console.log('Try create creating some with `todo add` command'.green);
    } else { console.error(err); }
  }
}
