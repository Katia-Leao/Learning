import { PrismaClient, Product } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
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
    onMenu,
  }: ProductDto): Promise<Product> {
    const productExists = await this.checkIfProductExists(id);

    if (!productExists) {
      throw new NotFoundException("Product not found!");
    }

    const updatedProduct = await prisma.product.update({
      data: {
        name,
        description,
        price,
        quantity,
        onMenu,
      },
      where: {
        id,
      },
    });
    return updatedProduct;
  }

  async checkIfProductExists(id: number) {
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return product !== null;
  }
}
