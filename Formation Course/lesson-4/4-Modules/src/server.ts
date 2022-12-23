import express from "express";
import { routes } from "./routes";
import logsMiddleware from "./middlewares/logs";
import { errorsMiddleware } from "./middlewares/errors";
import e from "express";

const server = express();

server.use(express.json());
server.use(logsMiddleware);

// não precisa colocar o "/" pois por padrão ele procura o arquivo index
server.use(routes);
server.use(errorsMiddleware);

const port = 3333;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
