import * as fs from 'fs';
import { Task } from './task';

export class FileHandler {
  private source: string;
  private data: string;
  private linesOfData: string[];

  constructor(source: string) {
    this.source = source;
    this.data = fs.readFileSync(source, 'utf-8');
    this.linesOfData = this.data.split('\n');
  }

  private convertStringToTask(stringToConvert: string): Task {
    let stringArray: string[] = stringToConvert.split('\t');
    let position: number = parseInt(stringArray[0]);
    let description: string = stringArray[1];
    let checked: boolean = stringArray[2] === 'true' ? true : false;

    return new Task(position, description, checked);
  }

  private convertTaskToString(taskToConvert: Task): string {
    return `${taskToConvert.getPosition()}\t${taskToConvert.getDescription()}\t${
      taskToConvert.checked === true ? 'true' : 'false'
    }`;
  }

  private updateData(): void {
    this.data = fs.readFileSync(this.source, 'utf-8');
    this.linesOfData = this.data.split('\n');
  }

  getTaskArray(): Task[] {
    this.updateData();
    let taskArray: Task[] = [];

    for (let taskElement of this.linesOfData) {
      taskArray.push(this.convertStringToTask(taskElement));
    }

    return taskArray;
  }

  saveTaskArray(dataToSave: Task[]): void {
    let lines: string[] = [];
    for (let taskElement of dataToSave) {
      lines.push(this.convertTaskToString(taskElement));
    }
    let outputData: string = lines.join('\n');
    fs.writeFileSync(this.source, outputData);
    this.updateData();
  }
}
