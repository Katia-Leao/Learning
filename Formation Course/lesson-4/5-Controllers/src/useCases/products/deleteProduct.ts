import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteProductsUseCase {
  constructor() {}

  async handle(id: number) {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
