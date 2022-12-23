import { PrismaClient } from "@prisma/client";
import { DontDelete } from "domain/exceptions/dontDelete";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class DeleteNeighborhoodsUseCase {
  constructor() {}

  async handle(id: string) {
    const addressExists = await this.checkIfAddressExists(id);

    if (!addressExists) {
      const neighborhoodExists = await this.checkIfNeighborhoodExists(id);

      if (!neighborhoodExists) {
        throw new NotFoundException("Neighborhood not found!");
      }

      await prisma.neighborhood.delete({
        where: {
          id: id,
        },
      });
    } else {
      throw new DontDelete("Neighborhood can't be deleted");
    }
  }

  async checkIfAddressExists(id: string) {
    const address = await prisma.address.findFirst({
      where: {
        idNeighborhood: {
          equals: id,
        },
      },
    });
    return address !== null;
  }

  async checkIfNeighborhoodExists(id: string) {
    const neighborhood = await prisma.neighborhood.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return neighborhood !== null;
  }
}
