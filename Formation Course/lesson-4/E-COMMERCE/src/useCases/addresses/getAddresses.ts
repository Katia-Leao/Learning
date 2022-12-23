import { PrismaClient, Address } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class GetAddresssUseCase {
  constructor() {}

  async handle(id: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
      include: {
        neighborhood: true,
      },
    });

    if (!address) throw new NotFoundException("Address not found!");

    return address;
  }
}
