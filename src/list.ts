import { Printable } from './interfaces/printable';
import { Task } from './task';
import { FileHandler } from './file-handler';

let myFileHandler: FileHandler = new FileHandler('src/my-list.txt');

export class List implements Printable {
  private content: Task[];

  constructor() {
    this.content = myFileHandler.getTaskArray();
  }

  refresh(): void {
    this.content = myFileHandler.getTaskArray();
  }

  print(mode?: string): void {
    if (this.content.length === 0) {
      console.log('No todos for today! :)');
      return;
    } else {
      for (let task of this.content) {
        try {
          task.print(mode);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }
}
