import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class DeleteUsersUseCase {
  constructor() {}

  async handle(id: string) {
    const userExists = await this.checkIfUserExists(id);
    if (!userExists) {
      throw new NotFoundException("User not found!");
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async checkIfUserExists(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return user !== null;
  }
}
