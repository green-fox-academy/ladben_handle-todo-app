export class Validator {
  isValidInteger(input: string): number {
    const parsed: number = parseInt(input);
    if (!isNaN(parsed)) {
      return parsed;
    } else {
      throw new Error('index is not a number.');
    }
  }
}
