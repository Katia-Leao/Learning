import express, { response } from "express";

const server = express();
server.use(express.json());

const products = [
  {
    id: 1,
    name: "O Um anel",
    description:
      "chocolate amargo 70% folhado a ouro servido num porta jóias de brigadeiro de frutas vermelhas",
    price: 50,
  },
];

server.get("/", (req, res) => {
  response.send(products);
});

const port = 3333;
server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
