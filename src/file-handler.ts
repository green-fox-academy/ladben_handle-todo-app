import { Socket } from 'dgram';
import * as fs from 'fs';
import { Task } from './task';

export class FileHandler {
  private source: string;
  private data: string;
  private stringTaskArray: string[];

  constructor(source: string) {
    this.source = source;
    this.data = fs.readFileSync(source, 'utf-8').slice(0, -1);
    this.stringTaskArray = this.data.split('\n');
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

    for (let taskElement of this.stringTaskArray) {
      taskArray.push(this.convertStringToTask(taskElement));
    }

    return taskArray;
  }

  getNextPosition(): number {
    if (this.data === '') {
      return 1;
    } else {
      return (
        1 + parseInt(this.stringTaskArray[this.stringTaskArray.length - 1])
      );
    }
  }

  addTask(description: string): void {
    let nextPosition: number = this.getNextPosition();

    fs.appendFileSync(this.source, `${nextPosition}\t${description}\tfalse\n`);
    this.updateData();
  }

  removeTask(position: number): void {
    if (position > this.stringTaskArray.length) {
      throw new Error('Unable to remove: index is out of bound');
    } else {
      let indexToRemove: number = position - 1;

      this.stringTaskArray.splice(indexToRemove, 1);
    }
    this.rearrangePositions();
  }

  rearrangePositions(): void {
    let dataToWrite: string = '';
    for (let i: number = 0; i < this.stringTaskArray.length; i++) {
      let splitted: string[] = this.stringTaskArray[i].split('\t');
      splitted[0] = '' + (i + 1);
      this.stringTaskArray[i] = splitted.join('\t');
      dataToWrite += this.stringTaskArray[i] + '\n';
    }
    fs.writeFileSync(this.source, dataToWrite);

    this.updateData();
  }

  updateData() {
    this.data = fs.readFileSync(this.source, 'utf-8').slice(0, -1);
    this.stringTaskArray = this.data.split('\n');
  }

  checkTask(position: number): void {
    // cheks task at position given
  }

  uncheck(position: number): void {
    // unchecks task at position given
  }
}

const myFileHandler: FileHandler = new FileHandler('src/my-list.txt');
myFileHandler.addTask('Test this');
myFileHandler.addTask('Walk the dog');
myFileHandler.removeTask(4);
