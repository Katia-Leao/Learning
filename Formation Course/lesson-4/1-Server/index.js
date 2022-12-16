import express from "express";

const server = express();

//Permite que o express habilite o json
server.use(express.json());

const port = 3000;

server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
