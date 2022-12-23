import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

//import { Adress } from "../domain/entities/adress.entity";
import { AdressDto } from "../domain/dtos/adress.dto";

const adressRoutes = Router();
const prisma = new PrismaClient();

adressRoutes.get("/", async (request: Request, response: Response) => {
  const adresses = await prisma.adress.findMany({});
  return response.json(adresses);
});

adressRoutes.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const adress = await prisma.adress.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!adress) {
    // podemos colocar return response.status(404).send("adress not found!") ou retornar um arquivo json direto. O send analisa se é texto ou json
    return response.status(404).json({
      message: "adress not found!",
    });
  }

  return response.json(adress);
});

adressRoutes.post(
  "/",
  async (request: Request<{}, {}, AdressDto>, response: Response) => {
    const adress = request.body;

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

    if (!adress.idNeighborhood) {
      return response.status(400).json({
        field: "idNeighborhood id",
        message: "idNeighborhood is invalid",
      });
    }

    const createdAdresses = await prisma.adress.create({
      data: {
        id: v4(),
        idUser: adress.idUser,
        street: adress.street,
        number: adress.number,
        complement: adress.complement,
        idNeighborhood: adress.idNeighborhood,
      },
    });
    return response.json(createdAdresses);
  }
);

interface PutParams {
  id: string;
}

adressRoutes.put(
  "/:id",
  async (request: Request<PutParams, {}, AdressDto>, response: Response) => {
    const { id } = request.params;
    const adressData = request.body;
    const adress = await prisma.adress.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!adress) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    const updatedAdress = await prisma.adress.update({
      data: {
        idUser: adressData.idUser,
        street: adressData.street,
        number: adressData.number,
        complement: adressData.complement,
        idNeighborhood: adressData.idNeighborhood,
      },
      where: {
        id: id,
      },
    });

    return response.json(updatedAdress);
  }
);

adressRoutes.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const adress = await prisma.adress.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!adress) {
    return response.status(404).json({
      message: "Adress not found!",
    });
  }

  await prisma.adress.delete({
    where: {
      id: id,
    },
  });

  return response.json({
    message: "Deleted Successfully",
  });
});

export { adressRoutes };
