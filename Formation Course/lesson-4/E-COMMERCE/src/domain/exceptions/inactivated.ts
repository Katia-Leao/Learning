import { IException } from "./IExeption";

export class InactivatedException implements IException {
  statusCode: number = 200;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
