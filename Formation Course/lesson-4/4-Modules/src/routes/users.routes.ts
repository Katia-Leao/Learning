import { Request, Response, Router } from "express";
import { User } from "../domain/entities/user.entity";
import { UserDto } from "../domain/dtos/user.dto";

const userRoutes = Router();
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let users: User[] = [
  {
    id: 1,
    name: "Katia",
    email: "katia@teste.com.br",
    password: "123456",
  },
];

userRoutes.get("/", (request: Request, response: Response) => {
  return response.send(users);
});

//tipa o ID como um number.
interface GetParams {
  id: number;
}

userRoutes.get("/:id", (request: Request<GetParams>, response: Response) => {
  const { id } = request.params;

  //apesar de o ID estar tipado como number, quando é feita a conversão do js, o params volta a ser string, então tem que colocar == ou === Number(id)
  const user = users.find((x) => x.id == id);

  if (!user) {
    return response.status(404).send("user not found!");
  }

  return response.send(user);
});

userRoutes.post("/", (request: Request<{}, {}, User>, response: Response) => {
  const user = request.body;

  if (!user.id) {
    return response.status(400).send({
      field: "id",
      message: "ID is invalid",
    });
  }

  if (!user.name) {
    return response.status(400).send({
      field: "name",
      message: "Name is invalid",
    });
  }

  if (!user.email || !emailRegex.test(user.email)) {
    return response.status(400).send({
      field: "email",
      message: "Email is invalid",
    });
  }

  users.push(user);
  return response.send(users);
});

interface PutParams {
  id: number;
}

//vamos usar o user dto pois é ele que usamos para transferir dados
//o omit é pq não queremos que o usuário insira o
userRoutes.put(
  "/:id",
  (
    request: Request<PutParams, {}, Omit<UserDto, "id">>,
    response: Response
  ) => {
    const { id } = request.params;
    const userIndex = users.findIndex((x) => x.id == id);

    if (userIndex === -1) {
      return response.status(404).send("Not found!");
    }

    if (!users[userIndex].name) {
      return response.status(400).send({
        field: "name",
        message: "Name is invalid",
      });
    }

    if (!users[userIndex].email || !emailRegex.test(users[userIndex].email)) {
      return response.status(400).send({
        field: "email",
        message: "Email is invalid",
      });
    }

    users[userIndex].name = request.body.name;
    users[userIndex].email = request.body.email;
    users[userIndex].adresses = request.body.adresses;

    return response.send(users[userIndex]);
  }
);

interface DeleteParams {
  id: number;
}

userRoutes.delete(
  "/:id",
  (request: Request<DeleteParams>, response: Response) => {
    const { id } = request.params;
    const userIndex = users.findIndex((x) => x.id == id);

    if (userIndex === -1) {
      return response.status(404).json({
        message: "Not found!",
      });
    }

    users = users.filter((x) => x.id !== Number(id));
    return response.send("Deleted Successfully");
  }
);

export { userRoutes, users };
