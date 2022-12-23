import { Request, Response } from "express";

import { NeighborhoodDto } from "../domain/dtos/neighborhood.dto";
import {
  CreateNeighborhoodUseCase,
  ListNeighborhoodsUseCase,
  GetNeighborhoodsUseCase,
  UpdateNeighborhoodsUseCase,
  DeleteNeighborhoodsUseCase,
} from "@useCases/neighborhoods";
import { Test } from "@useCases/neighborhoods/test";

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

  const useCase = new UpdateNeighborhoodsUseCase();
  const updatedNeighborhood = await useCase.handle({ id, ...neighborhoodData });

  return response.json(updatedNeighborhood);
}

export async function erase(request: Request, response: Response) {
  const { id } = request.params;

  const useCase = new DeleteNeighborhoodsUseCase();
  await useCase.handle(id);

  return response.json({
    message: "Deleted Successfully",
  });
}
