import { PrismaClient, Neighborhood } from "@prisma/client";
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
}
