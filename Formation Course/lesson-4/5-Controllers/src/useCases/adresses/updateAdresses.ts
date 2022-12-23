import { PrismaClient, Adress } from "@prisma/client";
import { AdressDto } from "../../domain/dtos/adress.dto";

const prisma = new PrismaClient();

export class UpdateAdressUseCase {
  constructor() {}

  async handle({
    id,
    street,
    number,
    complement,
    idNeighborhood,
  }: AdressDto): Promise<Adress> {
    const updatedAdress = await prisma.adress.update({
      data: {
        street,
        number,
        complement,
        idNeighborhood,
      },
      where: {
        id,
      },
      include: {
        neighborhood: true,
      },
    });
    return updatedAdress;
  }
}
