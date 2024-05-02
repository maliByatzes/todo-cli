import { Command } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import { addTodo } from '../commands/add.js';

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

program.parse();
