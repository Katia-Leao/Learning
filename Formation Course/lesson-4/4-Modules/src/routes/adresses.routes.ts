import { Request, Response, Router } from "express";
import { Adress } from "../domain/entities/adress.entity";
import { AdressDto } from "../domain/dtos/adress.dto";

const adressRoutes = Router();

let adresses: Adress[] = [
  {
    id: 1,
    idUser: 1,
    street: "Rua A",
    number: "349A",
    complement: "apto 302",
    neighborhood: 1,
  },
];

adressRoutes.get("/", (request: Request, response: Response) => {
  return response.send(adresses);
});

interface GetParams {
  id: number;
}

adressRoutes.get("/:id", (request: Request<GetParams>, response: Response) => {
  const { id } = request.params;
  const adress = adresses.find((x) => x.id == id);

  if (!adress) {
    // podemos colocar return response.status(404).send("adress not found!") ou retornar um arquivo json direto. O send analisa se é texto ou json
    return response.status(404).json({
      message: "adress not found!",
    });
  }

  return response.send(adress);
});

adressRoutes.post(
  "/",
  (request: Request<{}, {}, Adress>, response: Response) => {
    const adress = request.body;

    if (!adress.id) {
      return response.status(400).json({
        field: "id",
        message: "ID is invalid",
      });
    }

    if (!adress.idUser) {
      return response.status(400).json({
        field: "user id",
        message: "User ID is invalid",
      });
    }

    if (!adress.street) {
      return response.status(400).json({
        field: "street",
        message: "Street is invalid",
      });
    }

    if (!adress.number) {
      return response.status(400).json({
        field: "number",
        message: "Number is invalid",
      });
    }

    if (!adress.complement) {
      return response.status(400).json({
        field: "complement",
        message: "Complement is invalid",
      });
    }

    if (!adress.neighborhood) {
      return response.status(400).json({
        field: "neighborhood id",
        message: "Neighborhood ID is invalid",
      });
    }

    adresses.push(adress);
    return response.send(adresses);
  }
);

interface PutParams {
  id: number;
}

adressRoutes.put(
  "/:id",
  (
    request: Request<PutParams, {}, Omit<AdressDto, "id">>,
    response: Response
  ) => {
    const { id } = request.params;
    const adressIndex = adresses.findIndex((x) => x.id == id);

    if (adressIndex === -1) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    adresses[adressIndex].street = request.body.street;
    adresses[adressIndex].number = request.body.number;
    adresses[adressIndex].complement = request.body.complement;
    adresses[adressIndex].neighborhood = request.body.neighborhood;

    return response.send(adresses[adressIndex]);
  }
);

interface DeleteParams {
  id: number;
}

adressRoutes.delete(
  "/:id",
  (request: Request<DeleteParams>, response: Response) => {
    const { id } = request.params;
    const adressIndex = adresses.findIndex((x) => x.id == id);

    if (adressIndex === -1) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    adresses = adresses.filter((x) => x.id !== Number(id));
    return response.json({
      message: "Deleted Successfully",
    });
  }
);

export { adressRoutes, adresses };
