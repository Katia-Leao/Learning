import { PrismaClient, User } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
import { UserDto } from "../../domain/dtos/user.dto";

const prisma = new PrismaClient();

export class UpdateUsersUseCase {
  constructor() {}

  async handle({ id, name, email, password }: UserDto): Promise<User> {
    //1- verificar se o usuário existe:
    const userExists = await this.checkIfUserExists(id);
    if (!userExists) {
      throw new NotFoundException("User not found!");
    }

    const updatedUser = await prisma.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id,
      },
    });
    return updatedUser;
  }
  async checkIfUserExists(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return user !== null; //isso é igual a !!user (se fosse undefined) ;
  }
}
