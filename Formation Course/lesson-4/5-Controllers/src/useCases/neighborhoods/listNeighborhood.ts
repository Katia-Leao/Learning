import { PrismaClient, Neighborhood } from "@prisma/client";

const prisma = new PrismaClient();

export class ListNeighborhoodsUseCase {
  constructor() {}

  async handle(): Promise<Neighborhood[]> {
    const neighborhoods = await prisma.neighborhood.findMany({
      include: {
        adress: true,
      },
    });
    return neighborhoods;
  }
}
