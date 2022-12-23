import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

//import { Product } from "../domain/entities/product.entity";
import { ProductDto } from "../domain/dtos/product.dto";

const productRoutes = Router();
const prisma = new PrismaClient();

productRoutes.get("/", async (request: Request, response: Response) => {
  const products = await prisma.product.findMany();
  return response.json(products);
});

productRoutes.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!product) {
    return response.status(404).json({
      message: "product not found!",
    });
  }

  return response.json(product);
});

productRoutes.post(
  "/",
  async (request: Request<{}, {}, ProductDto>, response: Response) => {
    const product = request.body;

    if (!product.name) {
      return response.status(400).json({
        field: "name",
        message: "Name is invalid",
      });
    }

    if (!product.description) {
      return response.status(400).json({
        field: "description",
        message: "Description is invalid",
      });
    }

    if (!product.price) {
      return response.status(400).json({
        field: "price",
        message: "Price is invalid",
      });
    }

    if (!product.quantity) {
      return response.status(400).json({
        field: "quantity",
        message: "Quantity is invalid",
      });
    }
    const createdProduct = await prisma.product.create({
      data: {
        id: v4(),
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      },
    });
    return response.json(createdProduct);
  }
);

interface PutParams {
  id: string;
}

productRoutes.put(
  "/:id",
  async (request: Request<PutParams, {}, ProductDto>, response: Response) => {
    const { id } = request.params;
    const productData = request.body;
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!product) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    const updatedProduct = await prisma.product.update({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
      },
      where: {
        id: id,
      },
    });

    return response.json(updatedProduct);
  }
);

productRoutes.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const product = await prisma.product.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!product) {
    return response.status(404).json({
      message: "Product not found!",
    });
  }

  await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return response.json({
    message: "Deleted Successfully",
  });
});

export { productRoutes };
