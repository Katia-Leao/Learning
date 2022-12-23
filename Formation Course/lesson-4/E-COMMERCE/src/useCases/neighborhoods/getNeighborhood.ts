import { PrismaClient, Neighborhood } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class GetNeighborhoodsUseCase {
  constructor() {}

  async handle(id: string): Promise<Neighborhood | null> {
    const neighborhood = await prisma.neighborhood.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        adress: true,
      },
    });

    if (!neighborhood) throw new NotFoundException("Neighborhood not found!");

    return neighborhood;
  }
}
