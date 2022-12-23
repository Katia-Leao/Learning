import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { AdressDto } from "../domain/dtos/adress.dto";
import {
  ListAdressesUseCase,
  GetAdresssUseCase,
  CreateAdressUseCase,
  UpdateAdressUseCase,
  DeleteAdressUseCase,
} from "@useCases/adresses";

const prisma = new PrismaClient();

export async function list(request: Request, response: Response) {
  const useCase = new ListAdressesUseCase();
  const adresses = await useCase.handle();
  return response.json(adresses);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;

  const useCase = new GetAdresssUseCase();
  const adress = await useCase.handle(id);

  if (!adress) {
    return response.status(404).json({
      message: "adress not found!",
    });
  }

  return response.json(adress);
}

export async function create(
  request: Request<{}, {}, AdressDto>,
  response: Response
) {
  const adress = request.body;

  const useCase = new CreateAdressUseCase();
  const createdAdresses = await useCase.handle(adress);
  return response.json(createdAdresses);
}

export async function update(
  request: Request<{ id: number }, {}, Omit<AdressDto, "id">>,
  response: Response
) {
  const { id } = request.params;
  const adressData = request.body;
  const adress = await prisma.adress.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });
  const useCase = new UpdateAdressUseCase();
  const updatedAdress = await useCase.handle({ id: Number(id), ...adressData });

  return response.json(updatedAdress);
}

export async function erase(
  request: Request<{ id: number }>,
  response: Response
) {
  const { id } = request.params;
  const adress = await prisma.adress.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });

  const useCase = new DeleteAdressUseCase();
  await useCase.handle(Number(id));

  return response.json({
    message: "Deleted Successfully",
  });
}
