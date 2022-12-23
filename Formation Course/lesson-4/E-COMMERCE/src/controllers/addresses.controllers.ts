import { Request, Response } from "express";

import { AddressDto } from "../domain/dtos/address.dto";
import {
  ListAddressesUseCase,
  GetAddresssUseCase,
  CreateAddressUseCase,
  UpdateAddressUseCase,
  DeleteAddressUseCase,
  DeleteWithUserUseCase,
} from "@useCases/addresses";

export async function list(request: Request, response: Response) {
  const useCase = new ListAddressesUseCase();
  const addresses = await useCase.handle();
  return response.json(addresses);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;

  const useCase = new GetAddresssUseCase();
  const address = await useCase.handle(id);

  if (!address) {
    return response.status(404).json({
      message: "Address not found!",
    });
  }

  return response.json(address);
}

export async function create(
  request: Request<{}, {}, AddressDto>,
  response: Response
) {
  const address = request.body;

  const useCase = new CreateAddressUseCase();
  const createdAddresses = await useCase.handle(address);
  return response.json(createdAddresses);
}

export async function update(
  request: Request<{ id: string }, {}, Omit<AddressDto, "id">>,
  response: Response
) {
  const { id } = request.params;
  const addressData = request.body;

  const useCase = new UpdateAddressUseCase();
  const updatedAddress = await useCase.handle({
    id: Number(id),
    ...addressData,
  });

  return response.json(updatedAddress);
}

export async function erase(
  request: Request<{ id: string }>,
  response: Response
) {
  const { id } = request.params;

  const useCase = new DeleteAddressUseCase();
  await useCase.handle(Number(id));

  return response.json({
    message: "Deleted Successfully",
  });
}

export async function eraseWithUser(
  request: Request<{ idUser: string }>,
  response: Response
) {
  const { idUser } = request.params;

  const useCase = new DeleteWithUserUseCase();
  await useCase.handle(idUser);

  return response.json({
    message: "Deleted Successfully",
  });
}
