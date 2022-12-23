import { PrismaClient, Adress } from "@prisma/client";
import { v4 } from "uuid";

import { AdressDto } from "../../domain/dtos/adress.dto";

const prisma = new PrismaClient();

export class CreateAdressUseCase {
  constructor() {}

  async handle(adress: Omit<AdressDto, "id">): Promise<Adress> {
    const createdAdress = await prisma.adress.create({
      data: {
        idUser: adress.idUser,
        street: adress.street,
        number: adress.number,
        complement: adress.complement,
        idNeighborhood: adress.idNeighborhood,
      },
    });
    return createdAdress;
  }
}
