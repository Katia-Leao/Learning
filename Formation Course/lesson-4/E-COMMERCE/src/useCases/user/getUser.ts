import { PrismaClient, User } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";

const prisma = new PrismaClient();

export class GetUsersUseCase {
  constructor() {}

  async handle(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        adresses: true,
      },
    });

    if (!user) throw new NotFoundException("User not found!");

    return user;
  }
}
