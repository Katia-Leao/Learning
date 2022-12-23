import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class GetProductsUseCase {
  constructor() {}

  async handle(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });
    return product;
  }
}
