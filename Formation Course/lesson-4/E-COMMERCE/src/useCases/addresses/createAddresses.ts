import { PrismaClient, Address } from "@prisma/client";

import { AddressDto } from "../../domain/dtos/address.dto";

const prisma = new PrismaClient();

export class CreateAddressUseCase {
  constructor() {}

  async handle(address: Omit<AddressDto, "id">): Promise<Address> {
    const createdAddress = await prisma.address.create({
      data: {
        idUser: address.idUser,
        street: address.street,
        number: address.number,
        complement: address.complement,
        idNeighborhood: address.idNeighborhood,
      },
    });
    return createdAddress;
  }
}
