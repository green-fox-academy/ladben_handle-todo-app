import { Checkable } from './interfaces/checkable';
import { Printable } from './interfaces/printable';

export class Task implements Checkable, Printable {
  private position: number;
  private description: string;
  checked: boolean;

  constructor(position: number, description: string, checked: boolean = false) {
    this.position = position;
    this.description = description;
    this.checked = checked;
  }

  getPosition(): number {
    return this.position;
  }

  getDescription(): string {
    return this.description;
  }

  setPosition(value: number): void {
    this.position = value;
  }

  print(mode?: string): void {
    if (!mode) {
      console.log(`${this.position} - ${this.description}`);
    } else if (mode === 'include checks') {
      let checkIndicator: string;

      if (this.checked) {
        checkIndicator = 'X';
      } else {
        checkIndicator = ' ';
      }

      console.log(`${this.position} - [${checkIndicator}] ${this.description}`);
    } else {
      throw new Error('Mode can only be "include checks" if given.');
    }
  }

  check(): void {
    this.checked = true;
  }

  uncheck(): void {
    this.checked = false;
  }
}
