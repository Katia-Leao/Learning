import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

// no post, trocamos para userDto e não precisa mais do entities. Ele foi substituído pelo banco de dados
//import { User } from "../domain/entities/user.entity";
import { UserDto } from "../domain/dtos/user.dto";

const userRoutes = Router();
const prisma = new PrismaClient();

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//comentei apenas para saber como estava, mas o array não precisa mais depois de usar o banco de dados
//  let users: User[] = [];

userRoutes.get("/", async (request: Request, response: Response) => {
  const users = await prisma.user.findMany({
    include: {
      adresses: true,
    },
  });
  return response.json(users);
});

//tipa o ID como um number. Como inserimos o id como uuid, tem que voltar a ser string, então pode tirar. Deixei esse apenas para conhecimento
interface GetParams {
  id: string;
}

userRoutes.get(
  "/:id",
  async (request: Request<GetParams>, response: Response) => {
    const { id } = request.params;

    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        adresses: true,
      },
    });

    //apesar de o ID estar tipado como number, quando é feita a conversão do js, o params volta a ser string, então tem que colocar == ou === Number(id)
    //essa constante foi alterada pelo prisma, mas deixei aqui para poder ter como exemplo de como fazia antes
    //const user = users.find((x) => x.id == id);

    if (!user) {
      return response.status(404).json("user not found!");
    }

    return response.json(user);
  }
);

userRoutes.post(
  "/",
  async (request: Request<{}, {}, UserDto>, response: Response) => {
    const user = request.body;

    //Essa validação foi inutilizada pois vamos usar o uuid
    /*if (!user.id) {
    return response.status(400).json({
      field: "id",
      message: "ID is invalid",
    });
  }*/

    if (!user.name) {
      return response.status(400).json({
        field: "name",
        message: "Name is invalid",
      });
    }

    if (!user.email || !emailRegex.test(user.email)) {
      return response.status(400).json({
        field: "email",
        message: "Email is invalid",
      });
    }

    // a linha abaixo foi inutilizada para usar o comando do prisma
    //users.push(user);
    const createdUser = await prisma.user.create({
      data: {
        id: v4(),
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return response.json(createdUser);
  }
);

interface PutParams {
  id: string;
}

//vamos usar o user dto pois é ele que usamos para transferir dados
//o omit é pq não queremos que o usuário insira o id
//deixei a expressão para mostrar como estava antes. Ela foi alterada pelo prisma, com o banco de dados
/*userRoutes.put(
  "/:id",
  async (
    request: Request<PutParams, {}, Omit<UserDto, "id">>,
    response: Response
  ) => {*/

userRoutes.put(
  "/:id",
  async (request: Request<PutParams, {}, UserDto>, response: Response) => {
    const { id } = request.params;
    const userData = request.body;
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!user) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    const updatedUser = await prisma.user.update({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
      where: {
        id: id,
      },
    });

    return response.json(updatedUser);
  }
);

userRoutes.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  //também mantive esse código para saber como estava antes do prisma
  /*const userIndex = users.findIndex((x) => x.id == id);

  if (userIndex === -1) {
    return response.status(404).json({
      message: "Not found!",
    });
  }
  
  users = users.filter((x) => x.id !== id);*/

  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!user) {
    return response.status(404).json({
      message: "User not found!",
    });
  }

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return response.json({
    message: "Deleted Successfully",
  });
});

export { userRoutes };
