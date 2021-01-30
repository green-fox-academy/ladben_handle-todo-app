import * as test from 'tape';
import { Task } from './task';
import { List } from './list';
import { FileHandler } from './file-handler';
import { FILE } from 'dns';

test('check a task', (t) => {
  const myTask: Task = new Task(1, 'Walk the dog');
  myTask.check();

  const actual: boolean = myTask.checked;
  const expected: boolean = true;

  t.equal(actual, expected);
  t.end();
});

test('convert string to task', (t) => {
  const myFileHandler: FileHandler = new FileHandler('src/my-list.txt');

  const actual: Task = myFileHandler.convertStringToTask('1\tTest this\tfalse');
  const expected: Task = new Task(1, 'Test this', false);

  t.deepEqual(actual, expected);
  t.end();
});

test('get taskArray', (t) => {
  const myFileHandler: FileHandler = new FileHandler('src/my-list.txt');

  const actual: Task[] = myFileHandler.getTaskArray();
  const expected: Task[] = [
    new Task(1, 'Test this', false),
    new Task(2, 'Walk dog', false),
  ];

  t.deepEqual(actual, expected);
  t.end();
});
