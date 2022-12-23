import { PrismaClient, Product } from "@prisma/client";

import { ProductDto } from "../../domain/dtos/product.dto";

const prisma = new PrismaClient();

export class CreateProductUseCase {
  constructor() {}

  async handle(product: Omit<ProductDto, "id">): Promise<Product> {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      },
    });
    return createdProduct;
  }
}
