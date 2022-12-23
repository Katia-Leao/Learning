import { PrismaClient } from "@prisma/client";
import { InactivatedException } from "domain/exceptions/inactivated";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class DeleteProductsUseCase {
  constructor() {}

  async handle(id: number) {
    const productExists = await this.checkIfProductExists(id);

    if (!productExists) {
      throw new NotFoundException("Product not found!");
    }

    const purchaseExists = await this.checkPurchase(id);

    if (!purchaseExists) {
      await prisma.product.delete({
        where: {
          id: id,
        },
      });
    } else {
      await prisma.product.update({
        data: {
          onMenu: false,
        },
        where: {
          id: id,
        },
      });
      throw new InactivatedException("Product inactivated successfully");
    }
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

  async checkPurchase(id: number) {
    const purchase = await prisma.items.findFirst({
      where: {
        idProduct: id,
      },
    });
    return purchase !== null;
  }
}
