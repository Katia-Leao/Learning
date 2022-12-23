import { Request, Response } from "express";

import { UserDto } from "../domain/dtos/user.dto";
import {
  CreateUserUseCase,
  ListUsersUseCase,
  GetUsersUseCase,
  UpdateUsersUseCase,
  DeleteUsersUseCase,
} from "@useCases/user";

export async function list(request: Request, response: Response) {
  const useCase = new ListUsersUseCase();
  const users = await useCase.handle();
  return response.json(users);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;
  const useCase = new GetUsersUseCase();
  const user = await useCase.handle(id);

  return response.json(user);
}

export async function create(
  request: Request<{}, {}, UserDto>,
  response: Response
) {
  const user = request.body;

  const useCase = new CreateUserUseCase();
  const createdUser = await useCase.handle(user);
  return response.json(createdUser);
}

export async function update(
  request: Request<{ id: string }, {}, Omit<UserDto, "id">>,
  response: Response
) {
  const { id } = request.params;
  const userData = request.body;

  const useCase = new UpdateUsersUseCase();
  const updatedUser = await useCase.handle({ id, ...userData });

  return response.json(updatedUser);
}

export async function erase(request: Request, response: Response) {
  const { id } = request.params;

  const useCase = new DeleteUsersUseCase();
  await useCase.handle(id);

  return response.json({
    message: "Deleted Successfully",
  });
}
