import { PrismaClient, Neighborhood } from "@prisma/client";
import { v4 } from "uuid";

import { NeighborhoodDto } from "../../domain/dtos/neighborhood.dto";

const prisma = new PrismaClient();

export class CreateNeighborhoodUseCase {
  constructor() {}

  async handle(
    neighborhood: Omit<NeighborhoodDto, "id">
  ): Promise<Neighborhood> {
    const createdNeighborhood = await prisma.neighborhood.create({
      data: {
        id: v4(),
        name: neighborhood.name,
        city: neighborhood.city,
        state: neighborhood.state,
      },
    });
    return createdNeighborhood;
  }
}
