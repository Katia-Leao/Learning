import { IException } from "./IExeption";

export class DontDelete implements IException {
  statusCode: number = 401;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
