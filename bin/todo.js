import { Command } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import { addTodo } from '../commands/add.js';
import { listTodos } from '../commands/list.js';

const program = new Command();
// set the version, description of the cli
// add sub-commnands to the base app
program
  .version(pkg.version)
  .description('Manage todos from this command line application');

program
  .command('add')
  .description('Add a single todo')
  .action(() => { addTodo() });

program
  .command('list')
  .description('List todos')
  .option('--id <int>', 'id number of a single todo')
  .action((options) => { listTodos(options) });

program.parse();
