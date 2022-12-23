import { PrismaClient, Adress } from "@prisma/client";

const prisma = new PrismaClient();

export class GetAdresssUseCase {
  constructor() {}

  async handle(id: string): Promise<Adress | null> {
    const adress = await prisma.adress.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });
    return adress;
  }
}
