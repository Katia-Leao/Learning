import { IException } from "./IExeption";

export class BadRequestException implements IException {
  statusCode: number = 400;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
