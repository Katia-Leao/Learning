import { PrismaClient, Address } from "@prisma/client";
import { NotFoundException } from "domain/exceptions/notFound";
import { AddressDto } from "../../domain/dtos/address.dto";

const prisma = new PrismaClient();

export class UpdateAddressUseCase {
  constructor() {}

  async handle({
    id,
    street,
    number,
    complement,
    idNeighborhood,
  }: AddressDto): Promise<Address> {
    const addressExists = await this.checkIfAddressExists(id);

    if (!addressExists) {
      throw new NotFoundException("Address not found!");
    }

    const updatedAddress = await prisma.address.update({
      data: {
        street,
        number,
        complement,
        idNeighborhood,
      },
      where: {
        id,
      },
      include: {
        neighborhood: true,
      },
    });
    return updatedAddress;
  }

  async checkIfAddressExists(id: number) {
    const address = await prisma.address.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return address !== null;
  }
}
