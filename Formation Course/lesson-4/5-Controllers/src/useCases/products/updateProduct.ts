import { PrismaClient, Product } from "@prisma/client";
import { ProductDto } from "../../domain/dtos/product.dto";

const prisma = new PrismaClient();

export class UpdateProductsUseCase {
  constructor() {}

  async handle({
    id,
    name,
    description,
    price,
    quantity,
  }: ProductDto): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      data: {
        name,
        description,
        price,
        quantity,
      },
      where: {
        id,
      },
    });
    return updatedProduct;
  }
}
