import http from "http";
import fs from "fs";
import path from "path";

http.get("http://localhost:3000/", (res) => {
  let data = "";

  // Um bloco de dados foi recebido.
  res.on("data", (chunk) => {
    data += chunk;
  });

  // Toda a resposta foi recebida. Exibir o resultado.
  res.on("end", () => {
    console.log(JSON.parse(data));
    const filePath = path.resolve("src/client/retorno.json");
    fs.writeFileSync(filePath, data, { encoding: "utf-8" });
  });
});
