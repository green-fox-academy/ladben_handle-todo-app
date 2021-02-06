export class Validator {
  isValidInteger(input: string): number {
    const parsed: number = parseInt(input);
    if (!isNaN(parsed)) {
      return parsed;
    } else {
      throw new Error('index is not a number');
    }
  }

  isUndefined(input: any): any {
    if (typeof input === 'boolean') {
      throw new Error('no index provided');
    } else {
      return input;
    }
  }
}
