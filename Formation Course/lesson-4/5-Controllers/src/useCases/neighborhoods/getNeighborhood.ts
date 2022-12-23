import { PrismaClient, Neighborhood } from "@prisma/client";

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
    return neighborhood;
  }
}
