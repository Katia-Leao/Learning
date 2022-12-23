import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

//import { Neighborhood } from "../domain/entities/neighborhood.entity";
import { NeighborhoodDto } from "../domain/dtos/neighborhood.dto";

const neighborhoodRoutes = Router();
const prisma = new PrismaClient();

neighborhoodRoutes.get("/", async (request: Request, response: Response) => {
  const neighborhoods = await prisma.neighborhood.findMany({
    include: {
      adress: true,
    },
  });
  return response.json(neighborhoods);
});

neighborhoodRoutes.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const neighborhood = await prisma.neighborhood.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    include: {
      adress: true,
    },
  });

  if (!neighborhood) {
    return response.status(404).json({
      message: "neighborhood not found!",
    });
  }

  return response.json(neighborhood);
});

neighborhoodRoutes.post(
  "/",
  async (request: Request<{}, {}, NeighborhoodDto>, response: Response) => {
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

    const createdNeighborhood = await prisma.neighborhood.create({
      data: {
        id: v4(),
        adress: neighborhood.adresses,
        name: neighborhood.name,
        city: neighborhood.city,
        state: neighborhood.state,
      },
    });
    return response.send(createdNeighborhood);
  }
);

interface PutParams {
  id: string;
}

neighborhoodRoutes.put(
  "/:id",
  async (
    request: Request<PutParams, {}, Omit<NeighborhoodDto, "id">>,
    response: Response
  ) => {
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

    const updatedNeighborhood = await prisma.neighborhood.update({
      data: {
        adress: neighborhoodData.adresses,
        name: neighborhoodData.name,
        city: neighborhoodData.city,
        state: neighborhoodData.state,
      },
      where: {
        id: id,
      },
    });

    return response.json(updatedNeighborhood);
  }
);

neighborhoodRoutes.delete(
  "/:id",
  async (request: Request, response: Response) => {
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

    await prisma.neighborhood.delete({
      where: {
        id: id,
      },
    });

    return response.json({
      message: "Deleted Successfully",
    });
  }
);

export { neighborhoodRoutes };
