import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
import { InactivatedException } from "domain/exceptions/inactivated";

const prisma = new PrismaClient();

export class DeleteUsersUseCase {
  constructor() {}

  async handle(id: string) {
    const purchase = await this.checkPurchase(id);
    if (!purchase) {
      const address = await this.checkAddress(id);
      if (!address) {
        const userExists = await this.checkIfUserExists(id);
        if (!userExists) {
          throw new NotFoundException("User not found!");
        }
        await prisma.user.delete({
          where: {
            id: id,
          },
        });
      } else {
        await prisma.address.deleteMany({
          where: {
            idUser: id,
          },
        });
        await prisma.user.delete({
          where: {
            id: id,
          },
        });
      }
    } else {
      await prisma.user.update({
        data: {
          active: false,
        },
        where: {
          id: id,
        },
      });
      throw new InactivatedException("User inactivated successfully");
    }
  }

  async checkPurchase(id: string) {
    const purchase = await prisma.purchase.findFirst({
      where: {
        idUser: id,
      },
    });
    return purchase !== null;
  }

  async checkAddress(id: string) {
    const address = await prisma.address.findFirst({
      where: {
        idUser: id,
      },
    });
    return address !== null;
  }

  async checkIfUserExists(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return user !== null;
  }
}
