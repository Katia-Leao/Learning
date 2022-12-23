import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteNeighborhoodsUseCase {
  constructor() {}

  async handle(id: string) {
    await prisma.neighborhood.delete({
      where: {
        id: id,
      },
    });
  }
}
