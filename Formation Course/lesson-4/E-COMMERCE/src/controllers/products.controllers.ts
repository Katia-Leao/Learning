import { Request, Response } from "express";

import { ProductDto } from "../domain/dtos/product.dto";
import {
  CreateProductUseCase,
  ListProductsUseCase,
  GetProductsUseCase,
  UpdateProductsUseCase,
  DeleteProductsUseCase,
} from "@useCases/products";

export async function list(request: Request, response: Response) {
  const useCase = new ListProductsUseCase();
  const products = await useCase.handle();
  return response.json(products);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;
  const useCase = new GetProductsUseCase();
  const product = await useCase.handle(id);

  return response.json(product);
}

export async function create(
  request: Request<{}, {}, ProductDto>,
  response: Response
) {
  const product = request.body;

  const useCase = new CreateProductUseCase();
  const createdProduct = await useCase.handle(product);
  return response.json(createdProduct);
}

export async function update(
  request: Request<{ id: string }, {}, Omit<ProductDto, "id">>,
  response: Response
) {
  const { id } = request.params;
  const productData = request.body;

  const useCase = new UpdateProductsUseCase();
  const updatedProduct = await useCase.handle({
    id: Number(id),
    ...productData,
  });

  return response.json(updatedProduct);
}

export async function erase(
  request: Request<{ id: string }>,
  response: Response
) {
  const { id } = request.params;

  const useCase = new DeleteProductsUseCase();
  await useCase.handle(Number(id));

  return response.json({
    message: "Deleted Successfully",
  });
}
