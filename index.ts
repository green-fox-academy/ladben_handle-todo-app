#!/usr/bin/env node

import * as chalk from 'chalk';
import * as clear from 'clear';
import * as figlet from 'figlet';
import * as program from 'commander';

import { FileHandler } from './src/file-handler';
import { Task } from './src/task';
import { List } from './src/list';
import { Validator } from './validator';

clear();
console.log(chalk.red(figlet.textSync('todo app', { horizontalLayout: 'full' })));

program
  .version('0.0.1')
  .description('Todo app')
  .option('-l, --list', 'Lists all the tasks')
  .option('-a, --add [string]', 'Adds a new task')
  .option('-r, --remove [number]', 'Removes a task')
  .option('-c, --complete [number]', 'Completes a task')
  .parse(process.argv);

console.log(program.opts());

try {
  const { list, add, remove, complete } = program.opts();
  const validator = new Validator();
  let fileHandler: FileHandler = new FileHandler('src/list.txt');
  let taskList: List = new List();

  if (list) {
    readListTXT(fileHandler, taskList);
    const boxesNeeded: boolean = taskList.getContent().some((e) => {
      return e.checked;
    });
    let usageParameter: string = boxesNeeded ? 'include checks' : undefined;
    taskList.print(usageParameter);
  }

  if (add) {
    try {
      let taskToAdd: string = validator.isUndefined(add);
      readListTXT(fileHandler, taskList);
      taskList.addTask(taskToAdd);
      writeListTXT(fileHandler, taskList);
    } catch (error) {
      throw new Error('Unable to add: ' + error.message);
    }
  }

  if (remove) {
    try {
      let indexToRemove: number = validator.isUndefined(remove);
      indexToRemove = validator.isValidInteger(remove);
      readListTXT(fileHandler, taskList);
      taskList.removeTask(indexToRemove);
      writeListTXT(fileHandler, taskList);
    } catch (error) {
      throw new Error('Unable to remove: ' + error.message);
    }
  }

  if (complete) {
    try {
      let indexToCheck: number = validator.isUndefined(complete);
      indexToCheck = validator.isValidInteger(complete);
      readListTXT(fileHandler, taskList);
      taskList.checkTask(indexToCheck);
      writeListTXT(fileHandler, taskList);
    } catch (error) {
      throw new Error('Unable to check: ' + error.message);
    }
  }
} catch (error) {
  console.log(chalk.red(error.message));
}

if (!process.argv.slice(2).length) {
  console.log(
    `Command Line Todo application
=============================
  
Command line arguments:
    -l   Lists all the tasks
    -a   Adds a new task
    -r   Removes an task
    -c   Completes an task`
  );
}

function readListTXT(fileHandler: FileHandler, taskList: List): void {
  fileHandler.updateData();
  taskList.setContent(fileHandler.getTaskArray());
}

function writeListTXT(fileHandler: FileHandler, taskList: List): void {
  fileHandler.saveTaskArray(taskList.getContent());
}
