import express from "express";

const server = express();

//Permite que o express habilite o json
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

// Cria endpoits para obter dados
server.get("/", (request, response) => {
  return response.send(products);
});

// cria uma informação
server.post("/", (request, response) => {
  const product = request.body;
  products.push(product);
  return response.send(products);
});

// edita uma informação
server.put("/:id", (request, response) => {
  const { id } = request.params;
  //o request params traz como string, então tem que colocar como number
  const productIndex = products.findIndex((x) => x.id === Number(id));

  //quando o find não encontra, retorna -1
  if (productIndex === -1) {
    return response.send("Not found!");
    //não precisa colocar o return antes do response.send, mas o prof acha uma boa prática e não dá erro no console se procurar um id inexistente
  }

  products[productIndex].name = request.body.name;
  products[productIndex].description = request.body.description;
  products[productIndex].price = request.body.price;

  return response.send(products[productIndex]);
});

const port = 3333;
server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
