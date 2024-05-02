import jsonfile from 'jsonfile';

const fileName = './todo.json';

export function listTodos(options) {
  const id = options.id ? options.id : 0;

  jsonfile.readFile(fileName, function(err, contents) {
    if (err) {
      console.error(err);
    }

    if (id !== 0) {
      let todo = contents.find(todo => todo.id.toString() === id);
      if (todo) {
        console.log(`ID: ${todo.id}, todo: ${todo.todo}`.blue.bold);
      } else {
        console.error(`Todo with id ${id} does not exist`.red);
      }
    } else if (id === 0) {
      for (const item of contents) {
        console.log(`ID: ${item.id}, todo: ${item.todo}`.blue.bold);
      }
    }
  });
}
