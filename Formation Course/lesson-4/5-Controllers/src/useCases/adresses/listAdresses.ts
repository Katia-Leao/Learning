import { PrismaClient, Adress } from "@prisma/client";

const prisma = new PrismaClient();

export class ListAdressesUseCase {
  constructor() {}

  async handle(): Promise<Adress[]> {
    const adresses = await prisma.adress.findMany({
      include: {
        neighborhood: true,
      },
    });
    return adresses;
  }
}
