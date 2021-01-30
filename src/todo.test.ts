import * as test from 'tape';
import { Task } from './task';

test('check a task', (t) => {
  const myTask: Task = new Task(1, 'Walk the dog');
  myTask.print();
  myTask.print('include checks');
  myTask.check();
  myTask.print('include checks');

  const actual: boolean = myTask.checked;
  const expected: boolean = true;

  t.equal(actual, expected);
  t.end();
});
