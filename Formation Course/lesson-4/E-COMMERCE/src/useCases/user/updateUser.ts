import { PrismaClient, User } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
import { UserDto } from "../../domain/dtos/user.dto";
import { crypt } from "services/crypto";

const prisma = new PrismaClient();

export class UpdateUsersUseCase {
  constructor() {}

  async handle(user: UserDto): Promise<User> {
    //1- verificar se o usuário existe:
    const userExists = await this.checkIfUserExists(user.id);

    if (!userExists) {
      throw new NotFoundException("User not found!");
    }
    const hashedPassword = crypt(user.password);
    const updatedUser = await prisma.user.update({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword.hash,
        salt: hashedPassword.salt,
      },
      where: {
        id: user.id,
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
