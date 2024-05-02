import { Command } from 'commander';
import { addTodo } from '../commands/add.js';
import { listTodos } from '../commands/list.js';
import { updateTodo } from '../commands/update.js';
import { removeTodo } from '../commands/remove.js';

const program = new Command();
// set the version, description of the cli
// add sub-commnands to the base app
program
  .version('1.0.0')
  .description('Manage todos from this command line application');

program
  .command('add')
  .description('Add a single todo')
  .action(() => { addTodo() });

program
  .command('list')
  .description('List todos')
  .option('--id <number>', 'id number of a single todo')
  .action((options) => { listTodos(options) });

program
  .command('update')
  .description('Update one todo')
  .option('--id <number>', 'id number of a single todo')
  .action((options) => { updateTodo(options) });

program
  .command('remove')
  .description('Remove one todo')
  .option('--id <number>', 'id number of a single todo')
  .action((options) => { removeTodo(options) });

program.parse();
