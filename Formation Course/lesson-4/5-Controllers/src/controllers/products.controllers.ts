import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ProductDto } from "../domain/dtos/product.dto";
import {
  CreateProductUseCase,
  ListProductsUseCase,
  GetProductsUseCase,
  UpdateProductsUseCase,
  DeleteProductsUseCase,
} from "@useCases/products";

const prisma = new PrismaClient();

export async function list(request: Request, response: Response) {
  const useCase = new ListProductsUseCase();
  const products = await useCase.handle();
  return response.json(products);
}

export async function get(request: Request, response: Response) {
  const { id } = request.params;
  const useCase = new GetProductsUseCase();
  const product = await useCase.handle(id);

  if (!product) {
    return response.status(404).json({
      message: "product not found!",
    });
  }

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
  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });

  if (!product) {
    return response.status(404).json({
      message: "Not found!",
    });
  }

  const useCase = new UpdateProductsUseCase();
  const updatedProduct = await useCase.handle({
    id: Number(id),
    ...productData,
  });

  return response.json(updatedProduct);
}

export async function erase(
  request: Request<{ id: number }>,
  response: Response
) {
  const { id } = request.params;
  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });

  if (!product) {
    return response.status(404).json({
      message: "Product not found!",
    });
  }

  const useCase = new DeleteProductsUseCase();
  await useCase.handle(Number(id));

  return response.json({
    message: "Deleted Successfully",
  });
}
