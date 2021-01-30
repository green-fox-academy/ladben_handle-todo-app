export interface Checkable {
  checked: boolean;

  check(): void;
  uncheck(): void;
}
