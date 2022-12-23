import { PrismaClient, Neighborhood } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
import { NeighborhoodDto } from "../../domain/dtos/neighborhood.dto";

const prisma = new PrismaClient();

export class UpdateNeighborhoodsUseCase {
  constructor() {}

  async handle({
    id,
    name,
    city,
    state,
  }: NeighborhoodDto): Promise<Neighborhood> {
    const neighborhoodExists = await this.checkIfNeighborhoodExists(id);

    if (!neighborhoodExists) {
      throw new NotFoundException("Neighborhood not found!");
    }

    const updatedNeighborhood = await prisma.neighborhood.update({
      data: {
        name,
        city,
        state,
      },
      where: {
        id,
      },
    });
    return updatedNeighborhood;
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
