import { Router } from "express";
import { users } from "./users.routes";
import { neighborhoods } from "./neighborhood.routes";

const adressRoutes = Router();

let adresses: any = [
  {
    id: 1,
    user: users[1],
    street: "Rua A",
    number: "349A",
    complement: "apto 302",
    neighborhood: neighborhoods[1],
  },
];

adressRoutes.get("/", (request, response) => {
  return response.send(adresses);
});

adressRoutes.get("/:id", (request, response) => {
  const { id } = request.params;
  const adress = adresses.find((x) => x.id === Number(id));

  if (!adress) {
    return response.status(404).send("adress not found!");
  }

  return response.send(adress);
});

adressRoutes.post("/", (request, response) => {
  const adress = request.body;

  if (!adresses.id) {
    return response.status(400).send({
      field: "id",
      message: "ID is invalid",
    });
  }

  if (!adresses.user) {
    return response.status(400).send({
      field: "user id",
      message: "User ID is invalid",
    });
  }

  if (!adresses.street) {
    return response.status(400).send({
      field: "street",
      message: "Street is invalid",
    });
  }

  if (!adresses.number) {
    return response.status(400).send({
      field: "number",
      message: "Number is invalid",
    });
  }

  if (!adresses.complement) {
    return response.status(400).send({
      field: "complement",
      message: "Complement is invalid",
    });
  }

  if (!adresses.neighborhood) {
    return response.status(400).send({
      field: "neighborhood id",
      message: "Neighborhood ID is invalid",
    });
  }

  adresses.push(adress);
  return response.send(adresses);
});

adressRoutes.put("/:id", (request, response) => {
  const { id } = request.params;
  const adressIndex = adresses.findIndex((x) => x.id === Number(id));

  if (adressIndex === -1) {
    return response.status(404).send("Not found!");
  }

  adresses[adressIndex].street = request.body.street;
  adresses[adressIndex].number = request.body.number;
  adresses[adressIndex].compliment = request.body.compliment;
  adresses[adressIndex].neighborhood = request.body.neighborhood;

  return response.send(adresses[adressIndex]);
});

adressRoutes.delete("/:id", (request, response) => {
  const { id } = request.params;

  adresses = adresses.filter((x) => x.id !== Number(id));
  return response.send("Deleted");
});

export { adressRoutes, adresses };
