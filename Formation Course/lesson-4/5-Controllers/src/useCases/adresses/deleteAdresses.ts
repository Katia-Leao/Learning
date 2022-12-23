import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteAdressUseCase {
  constructor() {}

  async handle(id: number) {
    await prisma.adress.delete({
      where: {
        id: id,
      },
    });
  }
}
