import http from "http";
import path from "path";
import fs from "fs";

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  const caminho = path.resolve("./src/api/products.json");
  fs.readFile(caminho, { encoding: "utf-8" }, (err, data) => {
    if (err) throw new Error();
    /*{
      response.end("Erro! Não foi possível ler o arquivo.");
    }*/
    response.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server staterd at port 3000");
});
