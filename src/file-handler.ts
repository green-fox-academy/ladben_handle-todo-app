import * as fs from 'fs';
import { Task } from './task';

export class FileHandler {
  private source: string;
  private data: string;

  constructor(source: string) {
    this.source = source;
    this.data = fs.readFileSync(source, 'utf-8');
  }

  getData(): string {
    return this.data;
  }

  convertStringToTask(stringToConvert: string): Task {
    let stringArray: string[] = stringToConvert.split('\t');
    let position: number = parseInt(stringArray[0]);
    let description: string = stringArray[1];
    let checked: boolean = stringArray[2] === 'true' ? true : false;

    return new Task(position, description, checked);
  }

  getTaskArray(): Task[] {
    let taskArray: Task[] = [];
    let stringArray: string[] = this.data.split('\n');

    for (let taskElement of stringArray) {
      taskArray.push(this.convertStringToTask(taskElement));
    }

    taskArray.splice(-1, 1);

    return taskArray;
  }

  getNextPosition(): number {
    console.log('data now is:\n' + this.data);
    if (this.data === '') {
      return 1;
    } else {
      let stringTaskArray: string[] = this.data.split('\n');
      for (let taskElement of stringTaskArray) {
        let positionNumber = taskElement.slice(0, 1);
      }
      return 1 + parseInt(stringTaskArray[stringTaskArray.length - 2]);
    }
  }

  addTask(description: string): void {
    let nextPosition: number = this.getNextPosition();

    fs.appendFileSync(this.source, `${nextPosition}\t${description}\tfalse\n`);
    this.data = fs.readFileSync(this.source, 'utf-8');
  }

  removeTask(position: number): void {
    // removes task at position given and then rearranges position numbers
  }

  checkTask(position: number): void {
    // cheks task at position given
  }

  uncheck(position: number): void {
    // unchecks task at position given
  }
}
