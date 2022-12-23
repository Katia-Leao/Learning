import { PrismaClient, User } from "@prisma/client";
import { v4 } from "uuid";
import { crypt } from "services/crypto";

import { UserDto } from "../../domain/dtos/user.dto";

const prisma = new PrismaClient();

export class CreateUserUseCase {
  constructor() {}

  async handle(user: Omit<UserDto, "id">): Promise<User> {
    const hashedPassword = crypt(user.password);
    const createdUser = await prisma.user.create({
      data: {
        id: v4(),
        name: user.name,
        email: user.email,
        active: true,
        password: hashedPassword.hash,
        salt: hashedPassword.salt,
      },
    });
    return createdUser;
  }
}
