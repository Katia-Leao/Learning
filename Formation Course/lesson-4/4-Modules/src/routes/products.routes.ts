import { Request, Response, Router } from "express";
import { Product } from "../domain/entities/product.entity";
import { ProductDto } from "../domain/dtos/product.dto";

const productRoutes = Router();

let products: Product[] = [
  {
    id: 1,
    name: "O Um anel",
    description:
      "chocolate amargo 70% folhado a ouro servido num porta jóias de brigadeiro de frutas vermelhas",
    price: 50,
    quantity: 10,
  },
];

productRoutes.get("/", (request: Request, response: Response) => {
  return response.send(products);
});

interface GetParams {
  id: number;
}

productRoutes.get("/:id", (request: Request<GetParams>, response: Response) => {
  const { id } = request.params;
  const product = products.find((x) => x.id == id);

  if (!product) {
    return response.status(404).send("product not found!");
  }

  return response.send(product);
});

productRoutes.post(
  "/",
  (request: Request<{}, {}, Product>, response: Response) => {
    const product = request.body;

    if (!product.id) {
      return response.status(400).send({
        field: "id",
        message: "ID is invalid",
      });
    }

    if (!product.name) {
      return response.status(400).send({
        field: "name",
        message: "Name is invalid",
      });
    }

    if (!product.description) {
      return response.status(400).send({
        field: "description",
        message: "Description is invalid",
      });
    }

    if (!product.price) {
      return response.status(400).send({
        field: "price",
        message: "Price is invalid",
      });
    }

    if (!product.quantity) {
      return response.status(400).send({
        field: "quantity",
        message: "Quantity is invalid",
      });
    }

    products.push(product);
    return response.send(products);
  }
);

interface PutParams {
  id: number;
}

productRoutes.put(
  "/:id",
  (
    request: Request<PutParams, {}, Omit<ProductDto, "id">>,
    response: Response
  ) => {
    const { id } = request.params;
    const productIndex = products.findIndex((x) => x.id == id);

    if (productIndex === -1) {
      return response.status(404).send("Not found!");
    }

    if (!products[productIndex].name) {
      return response.status(400).send({
        field: "name",
        message: "Name is invalid",
      });
    }

    if (!products[productIndex].description) {
      return response.status(400).send({
        field: "description",
        message: "Description is invalid",
      });
    }

    if (!products[productIndex].price) {
      return response.status(400).send({
        field: "price",
        message: "Price is invalid",
      });
    }

    if (!products[productIndex].quantity) {
      return response.status(400).send({
        field: "quantity",
        message: "Quantity is invalid",
      });
    }

    products[productIndex].name = request.body.name;
    products[productIndex].description = request.body.description;
    products[productIndex].price = request.body.price;
    products[productIndex].quantity = request.body.quantity;

    return response.send(products[productIndex]);
  }
);

interface DeleteParams {
  id: number;
}

productRoutes.delete(
  "/:id",
  (request: Request<DeleteParams>, response: Response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((x) => x.id == id);

    if (productIndex === -1) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    products = products.filter((x) => x.id !== Number(id));
    return response.send("Deleted Successfully");
  }
);

export { productRoutes };
