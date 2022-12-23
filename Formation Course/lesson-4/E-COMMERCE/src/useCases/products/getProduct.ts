import { PrismaClient, Product } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";

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

    if (!product) throw new NotFoundException("Product not found!");

    return product;
  }
}
