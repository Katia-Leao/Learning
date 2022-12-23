import { PrismaClient, Address } from "@prisma/client";

const prisma = new PrismaClient();

export class ListAddressesUseCase {
  constructor() {}

  async handle(): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      include: {
        neighborhood: true,
      },
    });
    return addresses;
  }
}
