import express from "express";

const server = express();

server.use(express.json());

const products: any = [
  {
    id: 1,
    name: "O Um anel",
    description:
      "chocolate amargo 70% folhado a ouro servido num porta jóias de brigadeiro de frutas vermelhas",
    price: 50,
    quantity: 10,
  },
];

server.get("/", (request, response) => {
  return response.send(products);
});

server.get("/:id", (request, response) => {
  // a linha de baixo é igual a const id = request.params.id. Isso se chama desestruturação.
  const { id } = request.params;
  const productIndex = products.findIndex((x) => x.id === Number(id));
}

server.post("/", (request, response) => {
  const product = request.body;
  products.push(product);
  return response.send(products);
});

server.put("/:id", (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex((x) => x.id === Number(id));

  if (productIndex === -1) {
    return response.send("Not found!");
  }

  products[productIndex].name = request.body.name;
  products[productIndex].description = request.body.description;
  products[productIndex].price = request.body.price;
  products[productIndex].quantity = request.body.quantity;

  return response.send(products[productIndex]);
});

const port = 3333;
server.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
