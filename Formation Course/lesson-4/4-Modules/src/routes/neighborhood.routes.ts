import { Request, Response, Router } from "express";
import { Neighborhood } from "../domain/entities/neighborhood.entity";
import { NeighborhoodDto } from "../domain/dtos/neighborhood.dto";

const neighborhoodRoutes = Router();

let neighborhoods: Neighborhood[] = [
  {
    id: 1,
    neighborhood: "Lourdes",
    city: "Belo Horizonte",
    state: "Minas Gerais",
  },
];

neighborhoodRoutes.get("/", (request: Request, response: Response) => {
  return response.send(neighborhoods);
});

interface GetParams {
  id: number;
}

neighborhoodRoutes.get(
  "/:id",
  (request: Request<GetParams>, response: Response) => {
    const { id } = request.params;
    const neighborhood = neighborhoods.find((x) => x.id == id);

    if (!neighborhood) {
      return response.status(404).send("neighborhood not found!");
    }

    return response.send(neighborhood);
  }
);

neighborhoodRoutes.post(
  "/",
  (request: Request<{}, {}, Neighborhood>, response: Response) => {
    const neighborhood = request.body;

    if (!neighborhood.id) {
      return response.status(400).send({
        field: "id",
        message: "ID is invalid",
      });
    }

    if (!neighborhood.neighborhood) {
      return response.status(400).send({
        field: "neighborhood",
        message: "Neighborhood is invalid",
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

    neighborhoods.push(neighborhood);
    return response.send(neighborhoods);
  }
);

interface PutParams {
  id: number;
}

neighborhoodRoutes.put(
  "/:id",
  (
    request: Request<PutParams, {}, Omit<NeighborhoodDto, "id">>,
    response: Response
  ) => {
    const { id } = request.params;
    const neighborhoodIndex = neighborhoods.findIndex((x) => x.id == id);

    if (neighborhoodIndex === -1) {
      return response.status(404).send("Not found!");
    }

    if (!neighborhoods[neighborhoodIndex].neighborhood) {
      return response.status(400).send({
        field: "neighborhood",
        message: "Neighborhood is invalid",
      });
    }

    if (!neighborhoods[neighborhoodIndex].city) {
      return response.status(400).send({
        field: "city",
        message: "City is invalid",
      });
    }

    if (!neighborhoods[neighborhoodIndex].state) {
      return response.status(400).send({
        field: "state",
        message: "State is invalid",
      });
    }

    neighborhoods[neighborhoodIndex].neighborhood = request.body.neighborhood;
    neighborhoods[neighborhoodIndex].city = request.body.city;
    neighborhoods[neighborhoodIndex].state = request.body.state;

    return response.send(neighborhoods[neighborhoodIndex]);
  }
);

interface DeleteParams {
  id: number;
}

neighborhoodRoutes.delete(
  "/:id",
  (request: Request<DeleteParams>, response: Response) => {
    const { id } = request.params;
    const neighborhoodIndex = neighborhoods.findIndex((x) => x.id == id);

    if (neighborhoodIndex === -1) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    neighborhoods = neighborhoods.filter((x) => x.id !== Number(id));
    return response.send("Deleted Successfully");
  }
);

export { neighborhoodRoutes, neighborhoods };
