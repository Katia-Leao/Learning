import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "application.json" });
  const data = {
    name: "Katia",
    country: "Brazil",
  };
  res.end(JSON.stringify(data));
});

server.listen(8080, () => {
  console.log("server started at port 8080");
});

/* http.get("http://localhost:3000/", (res) => {
    let data = '';

    // Um bloco de dados foi recebido.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Toda a resposta foi recebida. Exibir o resultado.
    res.on('end', () => {
        console.log(JSON.parse(data));
        fs.writeFileSync(filePath,data,{encoding: "utf-8"})
      });
  }) */
