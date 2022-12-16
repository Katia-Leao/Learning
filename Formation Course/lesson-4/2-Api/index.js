import express from "express";

const server = express();

//Permite que o express habilite o json
server.use(express.json());

const port = 3000;

const users = [];

// Cria endpoits para obter dados
server.get("/", (request, response) => {
  response.send(users);
});

//
server.post("/", (request, response) => {
  const user = request.body;
  console.log(user);
  users.push(user);
  response.send(users);
});

server.get("/", (request, response) => {
  const user = users.find((x) => x.id === id);
  response.send(user);
});

server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
