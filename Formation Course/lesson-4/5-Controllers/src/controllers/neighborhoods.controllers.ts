import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { NeighborhoodDto } from "../domain/dtos/neighborhood.dto";
import {
  CreateNeighborhoodUseCase,
  ListNeighborhoodsUseCase,
  GetNeighborhoodsUseCase,
  UpdateNeighborhoodsUseCase,
  DeleteNeighborhoodsUseCase,
} from "@useCases/neighborhoods";

const prisma = new PrismaClient();

export async function list(request: Request, response: Response) {
  const useCase = new ListNeighborhoodsUseCase();
  const neighborhoods = await useCase.handle();
  return response.json(neighborhoods);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;

  const useCase = new GetNeighborhoodsUseCase();
  const neighborhood = await useCase.handle(id);

  return response.json(neighborhood);
}

export async function create(
  request: Request<{}, {}, NeighborhoodDto>,
  response: Response
) {
  const neighborhood = request.body;

  if (!neighborhood.name) {
    return response.status(400).send({
      field: "name",
      message: "Name is invalid",
    });
  }

  if (!neighborhood.city) {
    return response.status(400).send({
      field: "city",
      message: "City is invalid",
    });
  }

  if (!neighborhood.state) {
    return response.status(400).send({
      field: "state",
      message: "State is invalid",
    });
  }

  const useCase = new CreateNeighborhoodUseCase();
  const createdNeighborhood = await useCase.handle(neighborhood);
  return response.send(createdNeighborhood);
}

export async function update(
  request: Request<{ id: string }, {}, Omit<NeighborhoodDto, "id">>,
  response: Response
) {
  const { id } = request.params;
  const neighborhoodData = request.body;
  const neighborhood = await prisma.neighborhood.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!neighborhood) {
    return response.status(404).send("Not found!");
  }

  const useCase = new UpdateNeighborhoodsUseCase();
  const updatedNeighborhood = await useCase.handle({ id, ...neighborhoodData });

  return response.json(updatedNeighborhood);
}

export async function erase(request: Request, response: Response) {
  const { id } = request.params;
  const neighborhood = await prisma.neighborhood.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!neighborhood) {
    return response.status(404).json({
      message: "Neighborhood not found!",
    });
  }

  const useCase = new DeleteNeighborhoodsUseCase();
  await useCase.handle(id);

  return response.json({
    message: "Deleted Successfully",
  });
}
