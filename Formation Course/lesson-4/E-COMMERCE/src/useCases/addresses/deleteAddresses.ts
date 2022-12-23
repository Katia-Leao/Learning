import { PrismaClient } from "@prisma/client";
import { DontDelete } from "domain/exceptions/dontDelete";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class DeleteAddressUseCase {
  constructor() {}

  async handle(id: number) {
    const purchase = await this.checkPurchase(id);
    if (!purchase) {
      const addressExists = await this.checkIfAddressExists(id);
      if (!addressExists) {
        throw new NotFoundException("Address not found!");
      }

      await prisma.address.delete({
        where: {
          id: id,
        },
      });
    } else {
      console.log("com compra");
      throw new DontDelete(
        "Address can't be deleted. There is a purchase associated with it."
      );
    }
  }

  async checkPurchase(id: number) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        idAdress: id,
      },
    });
    return purchase !== null;
  }

  async checkIfAddressExists(id: number) {
    const address = await prisma.address.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return address !== null;
  }
}
