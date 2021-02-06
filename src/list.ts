import { Printable } from './interfaces/printable';
import { Task } from './task';
import { FileHandler } from './file-handler';

export class List implements Printable {
  private content: Task[];

  constructor() {
    this.content = [];
  }

  setContent(taskList: Task[]): void {
    this.content = taskList;
  }

  getContent(): Task[] {
    return this.content;
  }

  addTask(taskDescriptionToAdd: string): void {
    if (taskDescriptionToAdd === '') {
      throw new Error('no task provided');
    }

    let newPosition: number;
    if (this.content.length === 0) {
      newPosition = 1;
    } else {
      newPosition =
        1 +
        Math.max(
          ...this.content.map((e) => {
            return e.getPosition();
          })
        );
    }

    let taskToAdd: Task = new Task(newPosition, taskDescriptionToAdd, false);
    this.content.push(taskToAdd);
  }

  checkTask(positionToCheck: number, check: boolean = true): void {
    let positions: number[] = this.content.map((e) => {
      return e.getPosition();
    });
    const indexToCheck: number = positions.indexOf(positionToCheck);
    if (indexToCheck === -1) {
      throw new Error('index is out of bound');
    }

    check ? this.content[indexToCheck].check() : this.content[indexToCheck].uncheck();
  }

  removeTask(positionToRemove: number): void {
    let positions: number[] = this.content.map((e) => {
      return e.getPosition();
    });
    const indexToRemove: number = positions.indexOf(positionToRemove);
    if (indexToRemove === -1) {
      throw new Error('index is out of bound');
    }

    this.content.splice(indexToRemove, 1);
    this.rearrangePositions();
  }

  private rearrangePositions(): void {
    for (let i = 0; i < this.content.length; i++) {
      this.content[i].setPosition(i + 1);
    }
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
